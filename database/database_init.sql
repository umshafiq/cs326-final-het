drop table if exists group_users;
drop table if exists notifications;
drop table if exists users;
drop table if exists groups;
drop table if exists items;

create table users (
  id                 serial primary key,
  name               varchar(255) not null,
  email              varchar(255) not null unique,
  address            varchar(255),
  icon_b64           text
);

create table groups (
  id                 serial primary key,
  group_name         varchar(255) not null,
  price_limit        money not null,
  deadline_at        date not null,
  is_locked          boolean not null default(false),
  icon_b64           text
);

create table items (
  id                 serial primary key,
  name               varchar(255) not null,
  description        text,
  price              money not null,
  url                varchar(255),
  icon_b64           text
);

create table notifications (
  id                 serial primary key,
  user_id            integer not null,
  is_read            boolean not null default(false),
  subject            varchar(255),
  message            text,
  constraint fk_user
    foreign key(user_id)
      references users(id)
);

create table group_users (
  id                 serial primary key,
  group_id           integer not null,
  user_id            integer not null,
  giftee_id          integer null,
  is_admin           boolean not null default(false),
  item_id            integer null,
  rating             integer null,
  constraint fk_group
    foreign key(group_id)
      references groups(id),
  constraint fk_user
    foreign key(user_id)
      references users(id),
  constraint fk_giftee
    foreign key(giftee_id)
      references users(id),
  constraint fk_item
    foreign key(item_id)
      references items(id)
);

