import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Pour le développement local, on permet l'absence des variables d'environnement
// Elles seront nécessaires uniquement quand on connectera Supabase
let supabase = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase non configuré - utilisation des données mock uniquement')
}

export { supabase }

