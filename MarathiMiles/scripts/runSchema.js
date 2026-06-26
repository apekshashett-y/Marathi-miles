// scripts/runSchema.js
// Runs the schema SQL against Supabase using the Management API
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The anon key - note: schema creation requires service_role key via Management API
// For now, we'll try using the REST API with exec_sql RPC
const SUPABASE_URL = 'https://ccmxfwzphowbzsexebua.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TRfyet6n2hEFtOYh96bexg_VP_Dzam3';

const SQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

const body = JSON.stringify({ query: SQL });

const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Length': Buffer.byteLength(body)
  }
};

console.log(`Attempting schema creation via REST API...`);
const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data.substring(0, 500));
  });
});

req.on('error', (err) => {
  console.error('Request error:', err.message);
});

req.write(body);
req.end();
