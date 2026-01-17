import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qmnnbotyzwftlhwakbnz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbm5ib3R5endmdGxod2FrYm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTE3MzYsImV4cCI6MjA2NzY2NzczNn0.QaHkN4M4_Deh4HN4CZ-spv8QKbGKzhrfGwMvr6Pbyv4';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Product {
  id: string;
  name: string | null;
  price: number | null;
  img: string | null;
  category: string | null;
  subcategory: string | null;
  type: string | null;
  archived: boolean;
  order: number;
  description: string | null;
  slug: string | null;
}

export interface HeaderSettings {
  id: number;
  logo_url: string | null;
  logo_height: number;
  shop_name: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  features: any;
  updated_at: string;
}
