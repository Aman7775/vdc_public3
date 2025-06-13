// Mock Supabase client for demonstration
export const supabase = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null } }),
    signUp: () => Promise.resolve({ data: null, error: null }),
    signInWithPassword: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => Promise.resolve({ data: [], error: null }),
        limit: () => Promise.resolve({ data: [], error: null }),
      }),
      order: () => Promise.resolve({ data: [], error: null }),
      limit: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    }),
  }),
};

// Database types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  wallet_balance: number;
  health_credits: number;
  health_score: number;
  profile_image_url?: string;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface Specialization {
  id: string;
  name: string;
  description?: string;
  icon_name?: string;
  color_code?: string;
  is_popular: boolean;
  created_at: string;
}

export interface Doctor {
  id: string;
  user_id?: string;
  specialization_id: string;
  registration_number: string;
  experience_years: number;
  qualifications: string[];
  bio?: string;
  consultation_fee: number;
  video_consultation_fee?: number;
  audio_consultation_fee?: number;
  home_visit_fee?: number;
  hospital_name?: string;
  hospital_address?: string;
  languages: string[];
  awards: string[];
  conditions_treated: string[];
  is_verified: boolean;
  is_available: boolean;
  rating: number;
  total_reviews: number;
  total_consultations: number;
  created_at: string;
  updated_at: string;
  specializations?: Specialization;
}

export interface DiagnosticCenter {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone?: string;
  email?: string;
  opening_hours?: string;
  features: string[];
  is_verified: boolean;
  is_nabl_certified: boolean;
  rating: number;
  total_reviews: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Test {
  id: string;
  diagnostic_center_id: string;
  name: string;
  description?: string;
  parameters: string[];
  price: number;
  original_price?: number;
  report_time?: string;
  preparation_required?: string;
  sample_type?: string;
  is_popular: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  diagnostic_centers?: DiagnosticCenter;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  consultation_type: 'video' | 'audio' | 'in_clinic' | 'home_visit';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  consultation_fee: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  notes?: string;
  prescription?: string;
  created_at: string;
  updated_at: string;
  doctors?: Doctor;
}

export interface TestBooking {
  id: string;
  user_id: string;
  diagnostic_center_id: string;
  test_id: string;
  booking_date: string;
  booking_time?: string;
  collection_type: 'center' | 'home';
  status: 'booked' | 'sample_collected' | 'processing' | 'completed' | 'cancelled';
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  report_url?: string;
  created_at: string;
  updated_at: string;
  tests?: Test;
  diagnostic_centers?: DiagnosticCenter;
}

export interface Transaction {
  id: string;
  user_id: string;
  transaction_type: 'credit' | 'debit';
  amount: number;
  description: string;
  category: 'wallet_topup' | 'consultation_payment' | 'test_payment' | 'cashback' | 'refund' | 'donation';
  payment_method: 'upi' | 'card' | 'wallet' | 'net_banking';
  status: 'pending' | 'completed' | 'failed';
  reference_id?: string;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  doctor_id?: string;
  diagnostic_center_id?: string;
  rating: number;
  comment?: string;
  is_verified: boolean;
  created_at: string;
  users?: User;
}

export interface CharitableDonation {
  id: string;
  donor_id: string;
  beneficiary_id?: string;
  donation_type: 'test_payment' | 'consultation_payment' | 'general_support';
  amount: number;
  message?: string;
  is_anonymous: boolean;
  status: 'pending' | 'completed' | 'refunded';
  created_at: string;
}

export interface AssistanceRequest {
  id: string;
  user_id: string;
  request_type: 'test_payment' | 'consultation_payment';
  amount_needed: number;
  amount_raised: number;
  description: string;
  medical_documents: string[];
  status: 'active' | 'fulfilled' | 'cancelled';
  created_at: string;
  updated_at: string;
  users?: User;
}