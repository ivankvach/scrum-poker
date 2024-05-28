import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://agbhynrobwifgngntmyw.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYmh5bnJvYndpZmduZ250bXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NTA4MjksImV4cCI6MjAzMjIyNjgyOX0.9leEPoOZNB5rMxgDCe98O3oiuAhJ4MV1QmANoU5dVGg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
