import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dfdlvxbhhgiprrgrndfx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZGx2eGJoaGdpcHJyZ3JuZGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExMTkyNTYsImV4cCI6MjAxNjY5NTI1Nn0.whxmO4z4RKHWbiSzAgaO3JJ8lcBHAK_Vgg1vIuyKnXQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
