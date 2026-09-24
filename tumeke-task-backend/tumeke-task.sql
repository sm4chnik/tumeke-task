--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now(),
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.clients OWNER TO admin;

--
-- Name: clientsHasNotes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."clientsHasNotes" (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "noteId" integer NOT NULL
);


ALTER TABLE public."clientsHasNotes" OWNER TO admin;

--
-- Name: clientsHasNotes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."clientsHasNotes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."clientsHasNotes_id_seq" OWNER TO admin;

--
-- Name: clientsHasNotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."clientsHasNotes_id_seq" OWNED BY public."clientsHasNotes".id;


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO admin;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: notes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.notes (
    id integer NOT NULL,
    name character varying NOT NULL,
    note jsonb NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now(),
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.notes OWNER TO admin;

--
-- Name: notes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notes_id_seq OWNER TO admin;

--
-- Name: notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    "clientId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now(),
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: usersHasNotes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."usersHasNotes" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "noteId" integer NOT NULL
);


ALTER TABLE public."usersHasNotes" OWNER TO admin;

--
-- Name: usersHasNotes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."usersHasNotes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."usersHasNotes_id_seq" OWNER TO admin;

--
-- Name: usersHasNotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."usersHasNotes_id_seq" OWNED BY public."usersHasNotes".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: clientsHasNotes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."clientsHasNotes" ALTER COLUMN id SET DEFAULT nextval('public."clientsHasNotes_id_seq"'::regclass);


--
-- Name: notes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usersHasNotes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."usersHasNotes" ALTER COLUMN id SET DEFAULT nextval('public."usersHasNotes_id_seq"'::regclass);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.clients (id, name, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Doodle Dreams	2024-11-14 14:37:37.754+04	2024-11-14 14:37:37.754+04	\N
2	Creative Corner	2024-11-14 14:37:37.755+04	2024-11-14 14:37:37.755+04	\N
3	Vibrant Palette	2024-11-14 14:37:37.755+04	2024-11-14 14:37:37.755+04	\N
\.


--
-- Data for Name: clientsHasNotes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."clientsHasNotes" (id, "clientId", "noteId") FROM stdin;
1	1	1
2	1	2
3	2	4
4	2	5
5	3	7
6	3	8
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.notes (id, name, note, "createdAt", "updatedAt", "deletedAt") FROM stdin;
8	Vibrant Palette Finances	{"type": "finance", "bills": [{"date": "2024-09-01 10:08:13", "amount": 1000, "number": "INV-3-202409", "status": "paid"}, {"date": "2024-10-01 10:07:43", "memo": "", "amount": 1000, "number": "INV-2-202410", "status": "paid"}, {"date": "2024-11-01 10:07:09", "memo": "It was in \\"unpaid\\" status until recently.", "amount": 3000, "number": "INV-3-2024011", "status": "paid"}]}	2024-11-14 16:14:07.027799+04	2024-11-14 16:14:07.027799+04	\N
1	Doodle Dreams Info	{"text": "A large company in a growing industry", "type": "info"}	2024-11-14 14:42:13.742+04	2024-11-14 14:42:13.742+04	\N
4	Creative Corner Info	{"text": "A company engaged in the creation of AI products", "type": "info"}	2024-11-14 14:42:13.742+04	2024-11-14 14:42:13.742+04	\N
7	Vibrant Palette Info	{"text": "Paint manufacturing company", "type": "info"}	2024-11-14 16:12:43.09842+04	2024-11-14 16:12:43.09842+04	\N
3	Felix Koch Info	{"text": "Company CEO", "type": "info"}	2024-11-14 14:42:13.742+04	2024-11-14 14:42:13.742+04	\N
6	Hallie Brock Info	{"text": "Company CEO", "type": "info"}	2024-11-14 16:10:49.040485+04	2024-11-14 16:10:49.040485+04	\N
9	Maria Ferguson Info	{"text": "Company CEO", "type": "info"}	2024-11-14 16:16:58.205453+04	2024-11-14 16:16:58.205453+04	\N
10	Issac Hendrix Info	{"text": "Company manager", "type": "info"}	2024-11-14 16:19:01.440259+04	2024-11-14 16:19:01.440259+04	\N
11	Josephine Levy Info	{"text": "Company accountant", "type": "info"}	2024-11-14 16:21:41.073569+04	2024-11-14 16:21:41.073569+04	\N
12	Cecily Conner Info	{"text": "Company manager", "type": "info"}	2024-11-14 16:22:48.939568+04	2024-11-14 16:22:48.939568+04	\N
13	Heather Galvan Info	{"text": "Company manager", "type": "info"}	2024-11-14 16:23:24.342185+04	2024-11-14 16:23:24.342185+04	\N
14	Finnian Raymond Info	{"text": "Company manager", "type": "info"}	2024-11-14 16:23:42.728586+04	2024-11-14 16:23:42.728586+04	2024-11-14 17:32:45+04
5	Creative Corner Finances	{"type": "finance", "bills": [{"date": "2024-09-01 10:01:02", "memo": "", "amount": 5000, "number": "INV-2-202409", "status": "paid"}, {"date": "2024-10-01 10:05:12", "memo": "", "amount": 5000, "number": "INV-2-202410", "status": "paid"}, {"date": "2024-11-01 10:03:05", "memo": "", "amount": 5000, "number": "INV-2-2024011", "status": "unpaid"}]}	2024-11-14 14:42:13.742+04	2024-11-14 14:42:13.742+04	\N
2	Doodle Dreams Finances	{"type": "finance", "bills": [{"date": "2024-09-01 10:02:17", "memo": "", "amount": 3000, "number": "INV-1-202409", "status": "paid"}, {"date": "2024-10-01 10:01:21", "memo": "", "amount": 3000, "number": "INV-1-202410", "status": "unpaid"}, {"date": "2024-11-01 10:00:54", "memo": "", "amount": 3000, "number": "INV-1-2024011", "status": "unpaid"}]}	2024-11-14 14:42:13.742+04	2024-11-14 14:42:13.742+04	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, name, "clientId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Felix Koch	1	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
2	Issac Hendrix	1	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
3	Hallie Brock	2	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
4	Maria Ferguson	3	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
5	Josephine Levy	1	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
6	Cecily Conner	3	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
8	Izabella Brock	2	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
9	Finnian Raymond	3	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
7	Heather Galvan	2	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	2024-11-14 16:21:43+04
10	Millicent Salinas	1	2024-11-14 15:51:43.884709+04	2024-11-14 15:51:43.884709+04	\N
\.


--
-- Data for Name: usersHasNotes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."usersHasNotes" (id, "userId", "noteId") FROM stdin;
1	1	3
2	3	6
3	4	9
4	2	10
5	4	11
6	6	12
7	7	13
8	9	14
\.


--
-- Name: clientsHasNotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."clientsHasNotes_id_seq"', 6, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.clients_id_seq', 3, true);


--
-- Name: notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.notes_id_seq', 14, true);


--
-- Name: usersHasNotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."usersHasNotes_id_seq"', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: clientsHasNotes clientsHasNotes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."clientsHasNotes"
    ADD CONSTRAINT "clientsHasNotes_pkey" PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- Name: usersHasNotes usersHasNotes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."usersHasNotes"
    ADD CONSTRAINT "usersHasNotes_pkey" PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: fki_clientsHasNotes_noteId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_clientsHasNotes_noteId_fkey" ON public."clientsHasNotes" USING btree ("noteId");


--
-- Name: fki_clientsHasNotes_userId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_clientsHasNotes_userId_fkey" ON public."clientsHasNotes" USING btree ("clientId");


--
-- Name: fki_clients_clientId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_clients_clientId_fkey" ON public."clientsHasNotes" USING btree ("clientId");


--
-- Name: fki_clients_noteId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_clients_noteId_fkey" ON public."clientsHasNotes" USING btree ("noteId");


--
-- Name: fki_usersHasNotes_noteId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_usersHasNotes_noteId_fkey" ON public."usersHasNotes" USING btree ("noteId");


--
-- Name: fki_usersHasNotes_userId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_usersHasNotes_userId_fkey" ON public."usersHasNotes" USING btree ("userId");


--
-- Name: fki_users_clientId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_users_clientId_fkey" ON public.users USING btree ("clientId");


--
-- Name: fki_users_noteId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_users_noteId_fkey" ON public."usersHasNotes" USING btree ("noteId");


--
-- Name: fki_users_userId_fkey; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_users_userId_fkey" ON public."usersHasNotes" USING btree ("userId");


--
-- Name: clientsHasNotes clientsHasNotes_noteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."clientsHasNotes"
    ADD CONSTRAINT "clientsHasNotes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES public.notes(id);


--
-- Name: clientsHasNotes clientsHasNotes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."clientsHasNotes"
    ADD CONSTRAINT "clientsHasNotes_userId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- Name: usersHasNotes usersHasNotes_noteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."usersHasNotes"
    ADD CONSTRAINT "usersHasNotes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES public.notes(id);


--
-- Name: usersHasNotes usersHasNotes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."usersHasNotes"
    ADD CONSTRAINT "usersHasNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: users users_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO admin;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

