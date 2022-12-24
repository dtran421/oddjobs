-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE IF EXISTS public.posts
    ADD COLUMN company_id uuid;

COMMENT ON COLUMN public.posts.company_id
    IS 'company that made the post';

ALTER TABLE IF EXISTS public.posts
    ADD CONSTRAINT posts_company_id_fkey FOREIGN KEY (company_id)
    REFERENCES public.companies (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;