// User and Profile Types for TypeScript
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
  avatar_url?: string;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username?: string;
  bio?: string;
  phone_number?: string;
  location?: string;
  preferences: Record<string, any>;
  is_public: boolean;
  last_seen: string;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile extends User {
  profile?: Profile;
}

export interface PublicUserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  username?: string;
  bio?: string;
  location?: string;
  last_seen: string;
  user_created_at: string;
  profile_created_at: string;
}

export interface UserProfileWithStats {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  username?: string;
  bio?: string;
  phone_number?: string;
  location?: string;
  preferences: Record<string, any>;
  is_public: boolean;
  last_seen: string;
  user_created_at: string;
  profile_updated_at: string;
  total_appointments: number;
  total_test_bookings: number;
  wallet_balance: number;
  health_score: number;
}

export interface UserSearchResult {
  id: string;
  full_name: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
}

export interface NearbyUser extends UserSearchResult {
  distance_km: number;
}

// Preferences interface for type safety
export interface UserPreferences {
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    appointment_reminders?: boolean;
    test_reminders?: boolean;
    health_tips?: boolean;
  };
  privacy?: {
    show_phone?: boolean;
    show_email?: boolean;
    show_location?: boolean;
    allow_search?: boolean;
  };
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  timezone?: string;
  units?: {
    weight?: 'kg' | 'lbs';
    height?: 'cm' | 'ft';
    temperature?: 'celsius' | 'fahrenheit';
  };
}

// Form interfaces for user input
export interface UpdateProfileRequest {
  username?: string;
  bio?: string;
  phone_number?: string;
  location?: string;
  is_public?: boolean;
}

export interface UpdateUserRequest {
  full_name?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  avatar_url?: string;
}

export interface SearchUsersParams {
  search_term: string;
  limit?: number;
}

export interface GetNearbyUsersParams {
  location: string;
  radius_km?: number;
  limit?: number;
}