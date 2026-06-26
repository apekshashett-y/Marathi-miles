// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ccmxfwzphowbzsexebua.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TRfyet6n2hEFtOYh96bexg_VP_Dzam3';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase URL or Anon Key is missing in environment variables!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
