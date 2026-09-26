# TuMeKe test task

Two independent projects in one repository. Each keeps its own `package.json`, lockfile, lint config
and Docker setup, so it can be installed, linted and run from its own folder exactly as in the original
task. The task descriptions are in the projects' own READMEs.

| Folder | What | Task |
|---|---|---|
| [`tumeke-task-backend/`](tumeke-task-backend) | NestJS + Prisma + PostgreSQL CRUD API | [README](tumeke-task-backend/README.md) |
| [`tumeke-task/`](tumeke-task) | Video player with a 2D skeleton overlay: Web (`src`) and React Native (`src_app`) | [README](tumeke-task/README.md) |

## Quick start (Docker)

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Backend API | http://localhost:3000 (e.g. `GET /clients?hasUnpaid=1`) |
| Swagger UI | http://localhost:3000/docs |
| Web app | http://localhost:8080 |
| PostgreSQL 14 | `postgres://admin:password@localhost:5432/tumeke-task` |

The database is created from `tumeke-task-backend/tumeke-task.sql` on first start. To start from a clean
dump again: `docker compose down -v`.

Each project can also be started on its own:

```bash
cd tumeke-task-backend && docker compose up --build   # db + backend
cd tumeke-task && docker compose up --build           # web
```

The React Native app is not dockerized (it needs Xcode / Android Studio), see below.

## Backend

### Local development

```bash
cd tumeke-task-backend
docker compose up -d db          # or any PostgreSQL 14 with the dump imported
cp .env.example .env
yarn install
yarn prisma:generate             # schema.prisma is already introspected and committed
yarn start
yarn lint
```

### Implementation notes

- Services: `src/user/user.service.ts`, `src/note/note.service.ts`, `src/client/client.service.ts`.
- **Soft delete.** `DELETE` sets `deletedAt`. Deleted records are excluded everywhere, including nested
  relations (a deleted note is not listed on its user, a deleted user is not listed on its note).
  `GET`/`PUT`/`DELETE` of a missing or deleted record returns `404`. Updates and deletes use
  `update({ where: { id, deletedAt: null } })`, so the check and the write are one atomic query.
- **Creating a note** runs in a Prisma interactive transaction: it validates the referenced user/client,
  creates the note and the `usersHasNotes` / `clientsHasNotes` rows. At least one of `userId` /
  `clientId` is required; both may be given.
- **`clients.findAll`** is a single raw SQL query (`Prisma.sql`, fully parameterized). Relations are built
  with `json_agg` in the same shape Prisma returns, so the response is identical to `GET /clients/:id`.
  Bill filters use `jsonb_path_exists` on `$.bills[*]` (no `LIKE` on the JSON text) and only consider
  non-deleted `finance` notes:
  - `hasUnpaid` (any non-zero value) — the client has a bill with `status == "unpaid"`;
  - `billAmountLargerThan=N` — the client has a bill with `amount > N`;
  - both together are independent conditions combined with `AND`.
- **Note DTO fix.** The template declared `note: any` with `@IsNumber()`, which rejected every valid note.
  It is now a typed union `InfoNoteDto | FinanceNoteDto` validated with a class-transformer discriminator
  (`src/note/dto/`), so unknown types and malformed bills get a `400` with field-level messages.
- References in the request body that don't exist return `400`; unknown path ids return `404`.
- `updatedAt` is set explicitly on update and delete (the introspected schema has no `@updatedAt`).
- **Pagination.** Every `findAll` accepts `limit` (1–100, default 20) and `offset` (default 0), including
  the raw SQL `clients.findAll`. The response is still a plain array.
- Response types are derived from the Prisma `include` objects (`*.constants.ts` → `*.types.ts`), so they
  can't drift from the queries. Path ids use the shared `src/common/dto/idParam.dto.ts`.
- SQL is logged through Nest's `Logger` only when `NODE_ENV` is not `production` (query params may contain
  personal data).
- The dump creates two identical indexes on every junction table column;
  `docker/initdb/02-drop-duplicate-indexes.sql` drops the copies (for a manually imported database run it
  with `psql` once).
- `yarn lint` passes with 0 errors and 0 warnings.
- **Swagger UI** is at `/docs`. `@nestjs/swagger` was already in the template (`@ApiTags` on
  the controllers); this only wires `DocumentBuilder` and documents the note JSON union.

Docker note: the runtime image installs production dependencies only and copies the Prisma client generated
in the build stage.

## Web app

```bash
cd tumeke-task
yarn install
PORT=3001 yarn web   # port 3000 is taken by the backend; `yarn start` is the React Native Metro bundler
yarn lint
```

- `src/skeleton.ts` loads the joints file into a `Float32Array` and validates its size.
- `src/useVideoFrameCallback.ts` drives rendering with `requestVideoFrameCallback`, so the skeleton is
  updated exactly once per presented video frame (falls back to `requestAnimationFrame` + `currentTime`).
  The frame index is `mediaTime × frameCount / duration`, so other videos with a matching joints file work
  without a hard-coded FPS.
- `src/SkeletonOverlay.tsx` writes line/circle attributes directly to the DOM via refs, without a React
  render per frame. The SVG `viewBox` is in video pixels, so the overlay scales with the video and joints
  stay round at any size.
- `src/VideoSkeletonPlayer.tsx` starts playback only when both the video (`canplay`) and the skeleton are
  loaded. The video is muted for autoplay; if the browser still blocks it, native controls are shown.
- Missing joints are encoded as `-1` in the data (the four foot joints in every frame, and 8 frames without
  a person); such joints and their bones are not drawn.

Verified in headless Chrome: 100 consecutive frames with no mismatch against the data and no skipped
frames, correct skeleton after seeking (including an empty frame and the last frame), overlay size equal
to the video size at 640 px and on a 390 px wide viewport.

## React Native app

```bash
cd tumeke-task
yarn install                 # postinstall links video1.mp4 / video1.bin into the native projects
yarn pod:install             # bundle exec pod install
yarn ios                     # or: yarn android
```

- Dependencies added: `react-native-video` (v6) and `react-native-svg` (`~15.12`; 15.13+ requires RN 0.78).
- `src_app/App.tsx` reads the joints file with `react-native-fs` as base64 (`readFile` on iOS,
  `readFileAssets` on Android); `src_app/base64.ts` decodes it without extra dependencies.
- `react-native-video` reports progress only periodically, so `src_app/usePlaybackTime.ts` extrapolates the
  media time on every animation frame between reports; the SVG re-renders only when the frame index changes.
- The video fills the screen width; in landscape its width is limited by the available height so that the
  whole video stays visible. Sizes come from the container layout, so rotation re-scales the overlay.
- Playback is paused until both the video and the skeleton are loaded.

Verified on the iOS 27 simulator (iPhone 18 Pro): the skeleton follows the person and changes 25–26 times
per second, matching the 25 fps video.

### Xcode 27 / iOS 27 compatibility

Two changes were needed to build and launch with Xcode 27; both are backward compatible:

- `ios/Podfile` sets every pod's deployment target to React Native's minimum, because Xcode 27 rejects the
  `12.4` target declared by the `RNSVG-RNSVGFilters` resource bundle.
- iOS 27 terminates apps that don't adopt the UIScene lifecycle (this happens to the untouched RN 0.76
  template as well). `Info.plist` declares a scene manifest and `AppDelegate.mm` contains a small
  `SceneDelegate` that attaches the window created by `RCTAppDelegate` to the scene (iOS 13+).
