-- tumeke-task.sql creates two identical btree indexes on each junction table column.
-- The duplicates only slow down writes, so the misnamed copies are dropped.
DROP INDEX IF EXISTS public."fki_clients_clientId_fkey";
DROP INDEX IF EXISTS public."fki_clients_noteId_fkey";
DROP INDEX IF EXISTS public."fki_users_noteId_fkey";
DROP INDEX IF EXISTS public."fki_users_userId_fkey";
