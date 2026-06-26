-- scripts/schema.sql
-- Database schema for Marathi Miles Supabase Migration

-- Drop tables if they exist
drop table if exists smart_exploration_edges cascade;
drop table if exists smart_exploration_nodes cascade;
drop table if exists historical_events cascade;
drop table if exists destinations cascade;
drop table if exists forts cascade;

-- Forts Table
create table forts (
    id integer primary key,
    name text not null,
    location text,
    era text,
    subtitle text,
    significance text,
    image_url text,
    timeline jsonb,
    itineraries jsonb,
    images360 jsonb,
    highlights jsonb,
    guides jsonb,
    food jsonb,
    bazaar jsonb,
    culture jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) and set policy to read only for public
alter table forts enable row level security;
create policy "Allow public read-only access to forts" on forts for select using (true);
create policy "Allow authenticated inserts to forts" on forts for insert with check (true);
create policy "Allow authenticated updates to forts" on forts for update using (true);

-- Smart Exploration Nodes Table
create table smart_exploration_nodes (
    id serial primary key,
    fort_id integer references forts(id) on delete cascade,
    node_id text not null,
    name text not null,
    lat double precision not null,
    lng double precision not null,
    historical_score integer,
    spiritual_score integer,
    architectural_score integer,
    walking_effort integer,
    avg_visit_time integer,
    description text,
    connections jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint unique_fort_node unique (fort_id, node_id)
);

alter table smart_exploration_nodes enable row level security;
create policy "Allow public read-only access to nodes" on smart_exploration_nodes for select using (true);
create policy "Allow authenticated inserts to nodes" on smart_exploration_nodes for insert with check (true);
create policy "Allow authenticated updates to nodes" on smart_exploration_nodes for update using (true);

-- Smart Exploration Edges Table
create table smart_exploration_edges (
    id serial primary key,
    fort_id integer references forts(id) on delete cascade,
    from_node text not null,
    to_node text not null,
    walking_time integer not null,
    difficulty integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table smart_exploration_edges enable row level security;
create policy "Allow public read-only access to edges" on smart_exploration_edges for select using (true);
create policy "Allow authenticated inserts to edges" on smart_exploration_edges for insert with check (true);
create policy "Allow authenticated updates to edges" on smart_exploration_edges for update using (true);

-- Destinations Table (for allPlaces / moodBasedPlaces)
create table destinations (
    id integer primary key,
    name text not null,
    location text,
    description text,
    category jsonb,
    interests jsonb,
    budget text,
    duration text,
    recommended_for jsonb,
    suitable_age_groups jsonb,
    suitable_travel_groups jsonb,
    trip_type_tags jsonb,
    interest_tags jsonb,
    budget_compatibility text,
    duration_compatibility jsonb,
    mood_compatibility jsonb,
    accessibility jsonb,
    best_season text,
    mood_tags jsonb,
    highlights jsonb,
    image text,
    coordinates jsonb,
    base_budget integer,
    transport_options jsonb,
    detailed_highlights jsonb,
    itinerary_template jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table destinations enable row level security;
create policy "Allow public read-only access to destinations" on destinations for select using (true);
create policy "Allow authenticated inserts to destinations" on destinations for insert with check (true);
create policy "Allow authenticated updates to destinations" on destinations for update using (true);

-- Historical Events Table (for maharashtraHistoricalEvents)
create table historical_events (
    id serial primary key,
    year integer not null,
    era text not null,
    events jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table historical_events enable row level security;
create policy "Allow public read-only access to historical_events" on historical_events for select using (true);
create policy "Allow authenticated inserts to historical_events" on historical_events for insert with check (true);
create policy "Allow authenticated updates to historical_events" on historical_events for update using (true);
