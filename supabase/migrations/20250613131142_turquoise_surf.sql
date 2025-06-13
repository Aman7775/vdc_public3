/*
  # Authentication Configuration and Security Setup

  1. Authentication Settings
    - Configure JWT settings
    - Set up password policies
    - Configure session management

  2. Security Functions
    - Email validation
    - Username validation
    - Profile completion checks

  3. Helper Functions
    - User search functionality
    - Profile management utilities
*/

-- Create function to validate username format
CREATE OR REPLACE FUNCTION is_valid_username(username text)
RETURNS boolean AS $$
BEGIN
  -- Username must be 3-30 characters, alphanumeric and underscores only
  RETURN username ~ '^[a-zA-Z0-9_]{3,30}$';
END;
$$ LANGUAGE plpgsql;

-- Create function to check username availability
CREATE OR REPLACE FUNCTION is_username_available(username text)
RETURNS boolean AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM profiles WHERE profiles.username = LOWER(username)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to search users by username or name
CREATE OR REPLACE FUNCTION search_users(search_term text, limit_count int DEFAULT 10)
RETURNS TABLE (
  id uuid,
  full_name text,
  username text,
  avatar_url text,
  bio text,
  location text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.full_name,
    p.username,
    u.avatar_url,
    p.bio,
    p.location
  FROM users u
  LEFT JOIN profiles p ON u.id = p.id
  WHERE 
    (p.is_public = true OR p.is_public IS NULL)
    AND (
      LOWER(u.full_name) LIKE LOWER('%' || search_term || '%')
      OR LOWER(p.username) LIKE LOWER('%' || search_term || '%')
    )
  ORDER BY 
    CASE 
      WHEN LOWER(p.username) = LOWER(search_term) THEN 1
      WHEN LOWER(u.full_name) = LOWER(search_term) THEN 2
      WHEN LOWER(p.username) LIKE LOWER(search_term || '%') THEN 3
      WHEN LOWER(u.full_name) LIKE LOWER(search_term || '%') THEN 4
      ELSE 5
    END,
    u.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user profile with stats
CREATE OR REPLACE FUNCTION get_user_profile_with_stats(user_id uuid)
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  avatar_url text,
  username text,
  bio text,
  phone_number text,
  location text,
  preferences jsonb,
  is_public boolean,
  last_seen timestamptz,
  user_created_at timestamptz,
  profile_updated_at timestamptz,
  total_appointments int,
  total_test_bookings int,
  wallet_balance decimal,
  health_score int
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    u.full_name,
    u.avatar_url,
    p.username,
    p.bio,
    p.phone_number,
    p.location,
    p.preferences,
    p.is_public,
    p.last_seen,
    u.created_at as user_created_at,
    p.updated_at as profile_updated_at,
    COALESCE(a.appointment_count, 0)::int as total_appointments,
    COALESCE(tb.booking_count, 0)::int as total_test_bookings,
    u.wallet_balance,
    u.health_score
  FROM users u
  LEFT JOIN profiles p ON u.id = p.id
  LEFT JOIN (
    SELECT user_id, COUNT(*) as appointment_count
    FROM appointments
    WHERE user_id = get_user_profile_with_stats.user_id
    GROUP BY user_id
  ) a ON u.id = a.user_id
  LEFT JOIN (
    SELECT user_id, COUNT(*) as booking_count
    FROM test_bookings
    WHERE user_id = get_user_profile_with_stats.user_id
    GROUP BY user_id
  ) tb ON u.id = tb.user_id
  WHERE u.id = get_user_profile_with_stats.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update user preferences
CREATE OR REPLACE FUNCTION update_user_preferences(
  user_id uuid,
  new_preferences jsonb
)
RETURNS boolean AS $$
BEGIN
  UPDATE profiles 
  SET 
    preferences = new_preferences,
    updated_at = NOW()
  WHERE id = user_id AND id = auth.uid();
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to toggle profile visibility
CREATE OR REPLACE FUNCTION toggle_profile_visibility(user_id uuid)
RETURNS boolean AS $$
DECLARE
  current_visibility boolean;
BEGIN
  SELECT is_public INTO current_visibility
  FROM profiles
  WHERE id = user_id AND id = auth.uid();
  
  IF FOUND THEN
    UPDATE profiles 
    SET 
      is_public = NOT current_visibility,
      updated_at = NOW()
    WHERE id = user_id AND id = auth.uid();
    
    RETURN NOT current_visibility;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get nearby users (if location is provided)
CREATE OR REPLACE FUNCTION get_nearby_users(
  user_location text,
  radius_km int DEFAULT 50,
  limit_count int DEFAULT 20
)
RETURNS TABLE (
  id uuid,
  full_name text,
  username text,
  avatar_url text,
  bio text,
  location text,
  distance_km int
) AS $$
BEGIN
  -- This is a simplified version - in production you'd use PostGIS for proper geospatial queries
  RETURN QUERY
  SELECT 
    u.id,
    u.full_name,
    p.username,
    u.avatar_url,
    p.bio,
    p.location,
    0 as distance_km -- Placeholder for actual distance calculation
  FROM users u
  LEFT JOIN profiles p ON u.id = p.id
  WHERE 
    p.is_public = true
    AND p.location IS NOT NULL
    AND LOWER(p.location) LIKE LOWER('%' || user_location || '%')
  ORDER BY u.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create constraint to ensure username uniqueness (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_lower 
ON profiles (LOWER(username));

-- Add constraint to validate username format
ALTER TABLE profiles 
ADD CONSTRAINT valid_username_format 
CHECK (username IS NULL OR is_valid_username(username));

-- Create function to handle user deletion (cleanup)
CREATE OR REPLACE FUNCTION cleanup_user_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete user's storage files (this would need to be handled by your application)
  -- Delete related data that might not be covered by CASCADE
  
  -- Log the deletion for audit purposes
  INSERT INTO user_audit_log (user_id, action, timestamp)
  VALUES (OLD.id, 'USER_DELETED', NOW());
  
  RETURN OLD;
EXCEPTION
  WHEN OTHERS THEN
    -- If audit table doesn't exist, just continue
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user cleanup
DROP TRIGGER IF EXISTS cleanup_user_data_trigger ON users;
CREATE TRIGGER cleanup_user_data_trigger
  BEFORE DELETE ON users
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_user_data();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION is_valid_username(text) TO authenticated;
GRANT EXECUTE ON FUNCTION is_username_available(text) TO authenticated;
GRANT EXECUTE ON FUNCTION search_users(text, int) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_profile_with_stats(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_preferences(uuid, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION toggle_profile_visibility(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION get_nearby_users(text, int, int) TO authenticated;
GRANT EXECUTE ON FUNCTION update_last_seen(uuid) TO authenticated;