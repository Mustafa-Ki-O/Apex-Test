const { createClient } = require('@supabase/supabase-js');

console.log("Checking Supabase URL:", process.env.SUPABASE_URL);
console.log("Checking Supabase Service Key:", process.env.SUPABASE_SERVICE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY 
);
module.exports = supabase;