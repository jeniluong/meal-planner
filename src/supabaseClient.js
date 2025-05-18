import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajzgrxzucpturxxvawzd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqemdyeHp1Y3B0dXJ4eHZhd3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NDIyMDEsImV4cCI6MjA2MzExODIwMX0.Yn6A5m8QnINFPzoTeHYMQs-DOHnMyf4Ay5eK5S8ScRo'

export const supabase = createClient(supabaseUrl, supabaseKey)