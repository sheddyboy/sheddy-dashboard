create function public.handle_new_user () returns trigger as $$
begin
  insert into public.profiles (id,name,profile_picture)
  values (new.id, new.raw_user_meta_data ->> 'name',new.raw_user_meta_data ->> 'picture');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();

CREATE OR REPLACE FUNCTION generate_slug () RETURNS TRIGGER AS $$
DECLARE
    base_slug text;
    slug_suffix integer := 1;
    existing_slug text;
BEGIN
    base_slug := lower(regexp_replace(new.name, '[^a-zA-Z0-9]+', '-', 'g'));

    LOOP
        EXECUTE format('SELECT slug FROM %I WHERE slug = $1', TG_TABLE_NAME) INTO existing_slug USING base_slug;
        
        IF existing_slug IS NULL THEN
            EXIT;
        END IF;

        base_slug := lower(regexp_replace(new.name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || slug_suffix;
        slug_suffix := slug_suffix + 1;
    END LOOP;

    new.slug := base_slug;
    RETURN new;
END;
$$ LANGUAGE plpgsql security definer;