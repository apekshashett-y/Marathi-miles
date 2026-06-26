// scripts/createTablesViaApi.js
// Creates tables via Supabase Management API
// The anon key has limited access - we need to use the pg REST endpoint
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ccmxfwzphowbzsexebua.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TRfyet6n2hEFtOYh96bexg_VP_Dzam3';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkTablesExist() {
  // Try to query each table to see if it exists
  const tables = ['forts', 'smart_exploration_nodes', 'smart_exploration_edges', 'destinations', 'historical_events'];
  const results = {};
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    results[table] = error ? `❌ Missing: ${error.code}` : `✅ Exists (${data?.length || 0} rows)`;
  }
  
  return results;
}

async function main() {
  console.log('🔍 Checking which tables exist in Supabase...\n');
  const status = await checkTablesExist();
  
  for (const [table, result] of Object.entries(status)) {
    console.log(`  ${table}: ${result}`);
  }
  
  console.log('\n📋 INSTRUCTIONS:');
  console.log('The anon/publishable key cannot run DDL SQL (CREATE TABLE, etc.).');
  console.log('You need to run the schema manually via Supabase Dashboard.\n');
  console.log('1. Go to: https://supabase.com/dashboard/project/ccmxfwzphowbzsexebua/sql/new');
  console.log('2. Copy the contents of scripts/schema.sql');
  console.log('3. Paste and click Run');
  console.log('4. Then run: node scripts/seedSupabase.js\n');
}

main();
