// scripts/createSchema.mjs
// Uses node-postgres style approach via Supabase's pg endpoint
import https from 'https';

const PROJECT_REF = 'ccmxfwzphowbzsexebua';
const ANON_KEY = 'sb_publishable_TRfyet6n2hEFtOYh96bexg_VP_Dzam3';

// Individual table creation SQLs as upsert-safe statements
const TABLES = [
  {
    name: 'forts',
    sql: `
      CREATE TABLE IF NOT EXISTS forts (
        id integer PRIMARY KEY,
        name text NOT NULL,
        location text,
        era text,
        subtitle text,
        significance text,
        image_url text,
        timeline jsonb DEFAULT '[]',
        itineraries jsonb DEFAULT '{}',
        images360 jsonb DEFAULT '[]',
        highlights jsonb DEFAULT '[]',
        guides jsonb DEFAULT '[]',
        food jsonb DEFAULT '[]',
        bazaar jsonb DEFAULT '[]',
        culture jsonb DEFAULT '[]',
        created_at timestamptz DEFAULT now() NOT NULL
      );
      ALTER TABLE forts ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public read-only access to forts" ON forts;
      CREATE POLICY "Allow public read-only access to forts" ON forts FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Allow authenticated inserts to forts" ON forts;
      CREATE POLICY "Allow authenticated inserts to forts" ON forts FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Allow authenticated updates to forts" ON forts;
      CREATE POLICY "Allow authenticated updates to forts" ON forts FOR UPDATE USING (true);
    `
  },
  {
    name: 'smart_exploration_nodes',
    sql: `
      CREATE TABLE IF NOT EXISTS smart_exploration_nodes (
        id serial PRIMARY KEY,
        fort_id integer REFERENCES forts(id) ON DELETE CASCADE,
        node_id text NOT NULL,
        name text NOT NULL,
        lat double precision NOT NULL,
        lng double precision NOT NULL,
        historical_score integer,
        spiritual_score integer,
        architectural_score integer,
        walking_effort integer,
        avg_visit_time integer,
        description text,
        connections jsonb DEFAULT '[]',
        created_at timestamptz DEFAULT now() NOT NULL,
        CONSTRAINT unique_fort_node UNIQUE (fort_id, node_id)
      );
      ALTER TABLE smart_exploration_nodes ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public read-only access to nodes" ON smart_exploration_nodes;
      CREATE POLICY "Allow public read-only access to nodes" ON smart_exploration_nodes FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Allow authenticated inserts to nodes" ON smart_exploration_nodes;
      CREATE POLICY "Allow authenticated inserts to nodes" ON smart_exploration_nodes FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Allow authenticated updates to nodes" ON smart_exploration_nodes;
      CREATE POLICY "Allow authenticated updates to nodes" ON smart_exploration_nodes FOR UPDATE USING (true);
    `
  },
  {
    name: 'smart_exploration_edges',
    sql: `
      CREATE TABLE IF NOT EXISTS smart_exploration_edges (
        id serial PRIMARY KEY,
        fort_id integer REFERENCES forts(id) ON DELETE CASCADE,
        from_node text NOT NULL,
        to_node text NOT NULL,
        walking_time integer NOT NULL,
        difficulty integer NOT NULL,
        created_at timestamptz DEFAULT now() NOT NULL
      );
      ALTER TABLE smart_exploration_edges ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public read-only access to edges" ON smart_exploration_edges;
      CREATE POLICY "Allow public read-only access to edges" ON smart_exploration_edges FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Allow authenticated inserts to edges" ON smart_exploration_edges;
      CREATE POLICY "Allow authenticated inserts to edges" ON smart_exploration_edges FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Allow authenticated updates to edges" ON smart_exploration_edges;
      CREATE POLICY "Allow authenticated updates to edges" ON smart_exploration_edges FOR UPDATE USING (true);
    `
  },
  {
    name: 'destinations',
    sql: `
      CREATE TABLE IF NOT EXISTS destinations (
        id integer PRIMARY KEY,
        name text NOT NULL,
        location text,
        description text,
        category jsonb DEFAULT '[]',
        interests jsonb DEFAULT '[]',
        budget text,
        duration text,
        recommended_for jsonb DEFAULT '[]',
        suitable_age_groups jsonb DEFAULT '[]',
        suitable_travel_groups jsonb DEFAULT '[]',
        trip_type_tags jsonb DEFAULT '[]',
        interest_tags jsonb DEFAULT '[]',
        budget_compatibility text,
        duration_compatibility jsonb DEFAULT '[]',
        mood_compatibility jsonb DEFAULT '[]',
        accessibility jsonb DEFAULT '[]',
        best_season text,
        mood_tags jsonb DEFAULT '[]',
        highlights jsonb DEFAULT '[]',
        image text,
        coordinates jsonb DEFAULT '{}',
        base_budget integer DEFAULT 0,
        transport_options jsonb DEFAULT '[]',
        detailed_highlights jsonb DEFAULT '[]',
        itinerary_template jsonb DEFAULT '[]',
        created_at timestamptz DEFAULT now() NOT NULL
      );
      ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public read-only access to destinations" ON destinations;
      CREATE POLICY "Allow public read-only access to destinations" ON destinations FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Allow authenticated inserts to destinations" ON destinations;
      CREATE POLICY "Allow authenticated inserts to destinations" ON destinations FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Allow authenticated updates to destinations" ON destinations;
      CREATE POLICY "Allow authenticated updates to destinations" ON destinations FOR UPDATE USING (true);
    `
  },
  {
    name: 'historical_events',
    sql: `
      CREATE TABLE IF NOT EXISTS historical_events (
        id serial PRIMARY KEY,
        year integer NOT NULL,
        era text NOT NULL,
        events jsonb NOT NULL DEFAULT '[]',
        created_at timestamptz DEFAULT now() NOT NULL
      );
      ALTER TABLE historical_events ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public read-only access to historical_events" ON historical_events;
      CREATE POLICY "Allow public read-only access to historical_events" ON historical_events FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Allow authenticated inserts to historical_events" ON historical_events;
      CREATE POLICY "Allow authenticated inserts to historical_events" ON historical_events FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Allow authenticated updates to historical_events" ON historical_events;
      CREATE POLICY "Allow authenticated updates to historical_events" ON historical_events FOR UPDATE USING (true);
    `
  }
];

function makeRequest(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const options = {
      hostname: `${PROJECT_REF}.supabase.co`,
      port: 443,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Prefer': 'return=representation',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

console.log('📋 Schema creation requires Supabase Dashboard SQL Editor (anon key cannot run DDL)');
console.log('');
console.log('Please follow these steps:');
console.log('1. Open: https://supabase.com/dashboard/project/ccmxfwzphowbzsexebua/sql/new');
console.log('2. Copy and paste the SQL from: scripts/schema.sql');
console.log('3. Click "Run" button');
console.log('4. Once successful, run: node scripts/seedSupabase.js');
