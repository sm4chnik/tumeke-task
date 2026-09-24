-- tumeke-task.sql revokes privileges from the default "postgres" role,
-- which does not exist when POSTGRES_USER is "admin".
CREATE ROLE postgres;
