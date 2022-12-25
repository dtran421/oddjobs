INSERT INTO public.companies (company_name)
VALUES ('Walmart'),
    ('Acme Inc.'),
    ('XYZ Corp.'),
    ('ACE Hardware');

INSERT INTO public.shifts (
        company,
        position,
        date,
        start_time,
        shift_length,
        description,
        pay_rate
    )
VALUES (
        'Walmart',
        'Cashier',
        '12/22/2022',
        '10:30 AM EST',
        '8 hours',
        'Working the cash register at Walmart during the holiday season',
        '$12/hour'
    ),
    (
        'Acme Inc.',
        'Software Engineer',
        '12/23/2022',
        '9:00 AM EST',
        '8 hours',
        'Developing and maintaining software applications at Acme Inc.',
        '$40/hour'
    ),
    (
        'XYZ Corp.',
        'Sales Representative',
        '12/24/2022',
        '10:00 AM EST',
        '6 hours',
        'Meeting with potential clients and demonstrating products at XYZ Corp.',
        '$20/hour'
    );

UPDATE public.shifts
SET company_id = (
        SELECT id
        FROM public.companies
        WHERE company_name = shifts.company
    );

-- inserts a row into public.accounts
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO public.accounts (id, email)
VALUES (new.id, new.email);

RETURN new;

END;

$$ language plpgsql SECURITY DEFINER;

-- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR each ROW EXECUTE PROCEDURE public.handle_new_user();