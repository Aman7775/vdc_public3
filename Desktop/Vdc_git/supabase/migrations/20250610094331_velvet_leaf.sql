/*
  # Health Services Platform Database Schema

  1. New Tables
    - `users` - User profiles and authentication data
    - `doctors` - Doctor profiles and professional information
    - `diagnostic_centers` - Diagnostic center information
    - `specializations` - Medical specializations
    - `tests` - Available medical tests
    - `appointments` - Doctor consultation bookings
    - `test_bookings` - Diagnostic test bookings
    - `transactions` - Wallet and payment transactions
    - `reviews` - User reviews for doctors and centers
    - `charitable_donations` - Donations for medical assistance
    - `assistance_requests` - Requests for medical fee assistance

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access where appropriate

  3. Features
    - User authentication and profiles
    - Doctor and diagnostic center management
    - Appointment and test booking system
    - Wallet and transaction management
    - Review and rating system
    - Charitable donation platform
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  address text,
  city text,
  state text,
  pincode text,
  wallet_balance decimal(10,2) DEFAULT 0.00,
  health_credits decimal(10,2) DEFAULT 0.00,
  health_score integer DEFAULT 75 CHECK (health_score >= 0 AND health_score <= 100),
  profile_image_url text,
  is_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create specializations table
CREATE TABLE IF NOT EXISTS specializations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon_name text,
  color_code text,
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  specialization_id uuid REFERENCES specializations(id),
  registration_number text UNIQUE NOT NULL,
  experience_years integer NOT NULL DEFAULT 0,
  qualifications text[] DEFAULT '{}',
  bio text,
  consultation_fee decimal(8,2) NOT NULL,
  video_consultation_fee decimal(8,2),
  audio_consultation_fee decimal(8,2),
  home_visit_fee decimal(8,2),
  hospital_name text,
  hospital_address text,
  languages text[] DEFAULT '{}',
  awards text[] DEFAULT '{}',
  conditions_treated text[] DEFAULT '{}',
  is_verified boolean DEFAULT false,
  is_available boolean DEFAULT true,
  rating decimal(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  total_consultations integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create diagnostic_centers table
CREATE TABLE IF NOT EXISTS diagnostic_centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  phone text,
  email text,
  opening_hours text,
  features text[] DEFAULT '{}',
  is_verified boolean DEFAULT false,
  is_nabl_certified boolean DEFAULT false,
  rating decimal(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_center_id uuid REFERENCES diagnostic_centers(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  parameters text[] DEFAULT '{}',
  price decimal(8,2) NOT NULL,
  original_price decimal(8,2),
  report_time text,
  preparation_required text,
  sample_type text,
  is_popular boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  consultation_type text CHECK (consultation_type IN ('video', 'audio', 'in_clinic', 'home_visit')),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
  consultation_fee decimal(8,2) NOT NULL,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  notes text,
  prescription text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create test_bookings table
CREATE TABLE IF NOT EXISTS test_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  diagnostic_center_id uuid REFERENCES diagnostic_centers(id) ON DELETE CASCADE,
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  booking_date date NOT NULL,
  booking_time time,
  collection_type text DEFAULT 'center' CHECK (collection_type IN ('center', 'home')),
  status text DEFAULT 'booked' CHECK (status IN ('booked', 'sample_collected', 'processing', 'completed', 'cancelled')),
  total_amount decimal(8,2) NOT NULL,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  report_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  transaction_type text CHECK (transaction_type IN ('credit', 'debit')),
  amount decimal(10,2) NOT NULL,
  description text NOT NULL,
  category text CHECK (category IN ('wallet_topup', 'consultation_payment', 'test_payment', 'cashback', 'refund', 'donation')),
  payment_method text CHECK (payment_method IN ('upi', 'card', 'wallet', 'net_banking')),
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  reference_id text,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  diagnostic_center_id uuid REFERENCES diagnostic_centers(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT review_target_check CHECK (
    (doctor_id IS NOT NULL AND diagnostic_center_id IS NULL) OR
    (doctor_id IS NULL AND diagnostic_center_id IS NOT NULL)
  )
);

-- Create charitable_donations table
CREATE TABLE IF NOT EXISTS charitable_donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  beneficiary_id uuid REFERENCES users(id) ON DELETE CASCADE,
  donation_type text CHECK (donation_type IN ('test_payment', 'consultation_payment', 'general_support')),
  amount decimal(10,2) NOT NULL,
  message text,
  is_anonymous boolean DEFAULT false,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'refunded')),
  created_at timestamptz DEFAULT now()
);

-- Create assistance_requests table
CREATE TABLE IF NOT EXISTS assistance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  request_type text CHECK (request_type IN ('test_payment', 'consultation_payment')),
  amount_needed decimal(10,2) NOT NULL,
  amount_raised decimal(10,2) DEFAULT 0.00,
  description text NOT NULL,
  medical_documents text[] DEFAULT '{}',
  status text DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE charitable_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistance_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for doctors table
CREATE POLICY "Anyone can read doctor profiles"
  ON doctors
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Doctors can update own profile"
  ON doctors
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for diagnostic_centers table
CREATE POLICY "Anyone can read diagnostic centers"
  ON diagnostic_centers
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for specializations table
CREATE POLICY "Anyone can read specializations"
  ON specializations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for tests table
CREATE POLICY "Anyone can read tests"
  ON tests
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for appointments table
CREATE POLICY "Users can read own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for test_bookings table
CREATE POLICY "Users can read own test bookings"
  ON test_bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own test bookings"
  ON test_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own test bookings"
  ON test_bookings
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for transactions table
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create policies for reviews table
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for charitable_donations table
CREATE POLICY "Users can read own donations"
  ON charitable_donations
  FOR SELECT
  TO authenticated
  USING (donor_id = auth.uid() OR beneficiary_id = auth.uid());

CREATE POLICY "Users can create donations"
  ON charitable_donations
  FOR INSERT
  TO authenticated
  WITH CHECK (donor_id = auth.uid());

-- Create policies for assistance_requests table
CREATE POLICY "Anyone can read assistance requests"
  ON assistance_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own assistance requests"
  ON assistance_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own assistance requests"
  ON assistance_requests
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_doctors_specialization ON doctors(specialization_id);
CREATE INDEX IF NOT EXISTS idx_doctors_rating ON doctors(rating DESC);
CREATE INDEX IF NOT EXISTS idx_tests_center ON tests(diagnostic_center_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_test_bookings_user ON test_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_doctor ON reviews(doctor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_center ON reviews(diagnostic_center_id);