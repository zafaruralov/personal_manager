CREATE TABLE users (
    id uuid not null PRIMARY KEY,
    email varchar unique not null,
    username varchar not null,
    password varchar not null
);
-- SELECT MAX(price) FROM product;

-- select DISTINCT TOP 2

/*
-- create table product_category
-- (
--    product_id integer not null references product,
--    category_id integer not null references category, 
--    attributes jsonb not null,
--    primary key (product_id, category_id)
-- );





















create function validate_attributes(p_allowed jsonb, p_to_check jsonb)
  returns boolean
as
$$
   select p_allowed ?& (select array_agg(k) from jsonb_object_keys(p_to_check) as t(k));
$$
language sql;




create function validate_category_trg()
  returns trigger
as
$$
declare
   l_allowed jsonb;
   l_valid   boolean;
begin

   select allowed_attributes 
      into l_allowed
   from category
   where id = new.category_id;

   l_valid := validate_attributes(l_allowed, new.attributes);
   if l_valid = false then 
     raise 'some attributes are not allowed for that category';
   end if;
   return new;
end;
$$
language plpgsql;







insert into category (id, name, qushimcha_jihatlar )
values
(6, 'phone', '"Smart"'::jsonb), 
(7, 'car', '10')
(8, 'food', '10');



select p*
                from product p
                where exists (select *
                              from product p where category.id = p.catageroy_id)






insert into category (id, name)
values
(4a4d3a0f-fb55-4b36-ae97-3ad3c00c07b1, 'phone');






INSERT INTO product (id, title, price) VALUES (1, 'iPhone X', '1000$'),
(2, 'BMWX7', '45000$'),
(3, 'piyoz', '1$') RETURNING *;











insert into product_category (product_id, category_id, attributes)
values
(1, 6, '{"Phone_size": 60}'), 
(2, 7, '{"Car_size": 32}');
-- (3, 6, '{"Food_ports": 5}')

*/