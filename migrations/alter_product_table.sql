alter table product alter make_date set default now();

CREATE TYPE isImportant AS ENUM ('Yes', 'No');