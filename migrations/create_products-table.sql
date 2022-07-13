
create table product
(
   id uuid primary key, 
   title varchar(100) not null, 
   price varchar(100) not null,
   created_at TIMESTAMPTZ DEFAULT Now(),
   category_id uuid REFERENCES category (id),
   status isImportant DEFAULT 'No'
);