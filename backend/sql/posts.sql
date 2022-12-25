CREATE TABLE IF NOT EXISTS posts (
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    shift_length INTERVAL NOT NULL
);
