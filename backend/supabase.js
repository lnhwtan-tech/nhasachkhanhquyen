import { createClient } from '@supabase/supabase-js'

// Thay 2 dòng này bằng Project URL và Anon Public Key lấy từ trang Supabase của bạn
const supabaseUrl = 'https://dngnkhzliwsdmytrvoae.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZ25raHpsaXdzZG15dHJ2b2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MDkyMjcsImV4cCI6MjEwMzk4NTIyN30.fqZuesECwMbvbcnc4XSyGZZrPxTG5YbrPk1MlNHZB58'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;