-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
 BEGIN
INSERT INTO public.users (id, email)
VALUES (new.id, new.email);

RETURN new;

END;

$BODY$;

ALTER FUNCTION public.handle_new_user()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

CREATE POLICY "Public posts are viewable by everyone."
    ON public.posts
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);