import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vwctarveeyohkchcprqa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Y3RhcnZlZXlvaGtjaGNwcnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2ODgxNDgsImV4cCI6MjA2NzI2NDE0OH0.OhZT0CLKyqXie5fIz7dQt-e2pF0t-E1-2l7D6wyMcK8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);