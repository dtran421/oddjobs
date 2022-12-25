-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.companies
(
    company_name character varying COLLATE pg_catalog."default" DEFAULT ''::character varying,
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT companies_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.companies
    OWNER to postgres;

ALTER TABLE IF EXISTS public.companies
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.companies TO anon;

GRANT ALL ON TABLE public.companies TO authenticated;

GRANT ALL ON TABLE public.companies TO postgres;

GRANT ALL ON TABLE public.companies TO service_role;

COMMENT ON TABLE public.companies
    IS 'employers of shift posts';

ALTER TABLE IF EXISTS public.posts
    ADD COLUMN active boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.posts.active
    IS 'post active based on availability, start date + time';

ALTER TABLE IF EXISTS public.posts
    ADD COLUMN employee_id uuid;

COMMENT ON COLUMN public.posts.employee_id
    IS 'linked employee who is working the shift';
ALTER TABLE IF EXISTS public.posts
    ADD CONSTRAINT posts_employee_id_fkey FOREIGN KEY (employee_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
