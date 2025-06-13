/*
  # User Profiles and Authentication Setup

  1. New Tables
    - `profiles` - Extended user profile information
    - Update existing `users` table structure if needed

  2. Security
    - Enable RLS on profiles table
    - Add policies for user profile management
    - Set up proper access controls

  3. Indexes
    - Add performance indexes for common queries
    - Username and email lookups
    - Timestamp sorting

  4. Storage
    - Configure avatars bucket policies
*/

-- First, let's check if we need to add any missing columns to the existing users table
DO $$
BEGIN
  -- Add avatar_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE users ADD COLUMN avatar_url text;
  END IF;
END $$;

-- Create profiles table for extended user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  username text UNIQUE,
  bio text,
  phone_number text,
  location text,
  preferences jsonb DEFAULT '{}',
  is_public boolean DEFAULT true,
  last_seen timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view public profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (is_public = true OR id = auth.uid());

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can delete own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (id = auth.uid());

-- Update existing users table policies to be more specific
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;

-- Recreate users policies with better naming and structure
CREATE POLICY "Users can view own user data"
  ON users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own user data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can insert own user data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Create policy for public user information (basic info only)
CREATE POLICY "Public can view basic user info"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON profiles(location);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON profiles(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen ON profiles(last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_public ON profiles(is_public);

-- Add indexes to users table for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_updated_at ON users(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_full_name ON users(full_name);

-- Create a function to automatically create a profile when a user is created
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, created_at, updated_at)
  VALUES (
    NEW.id,
    LOWER(REPLACE(NEW.full_name, ' ', '_')) || '_' || SUBSTRING(NEW.id::text, 1, 8),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile
DROP TRIGGER IF EXISTS create_profile_trigger ON users;
CREATE TRIGGER create_profile_trigger
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create function to update last_seen timestamp
CREATE OR REPLACE FUNCTION update_last_seen(user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET last_seen = NOW() 
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a view for public user information
CREATE OR REPLACE VIEW public_user_profiles AS
SELECT 
  u.id,
  u.full_name,
  u.avatar_url,
  u.created_at as user_created_at,
  p.username,
  p.bio,
  p.location,
  p.last_seen,
  p.created_at as profile_created_at
FROM users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.is_public = true OR p.is_public IS NULL;

-- Grant access to the view
GRANT SELECT ON public_user_profiles TO authenticated;

-- Create storage bucket for avatars (this needs to be done via Supabase dashboard or API)
-- The SQL commands below are for reference - they need to be executed via Supabase's storage API

/*
-- Storage bucket creation (execute via Supabase dashboard or API):
-- 1. Create 'avatars' bucket
-- 2. Set public access to false
-- 3. Set file size limit to 5MB
-- 4. Allow image file types: jpg, jpeg, png, webp, gif
-- 5. Set up RLS policies for storage

-- Storage policies (execute after bucket creation):
CREATE POLICY "Users can upload own avatar"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own avatar"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own avatar"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view avatars"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'avatars');
*/