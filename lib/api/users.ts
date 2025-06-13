import { supabase } from '../supabase';
import type {
  User,
  Profile,
  UserWithProfile,
  UserProfileWithStats,
  UserSearchResult,
  NearbyUser,
  UpdateProfileRequest,
  UpdateUserRequest,
  SearchUsersParams,
  GetNearbyUsersParams,
  UserPreferences
} from '../types/user';

export const usersApi = {
  // Get current user with profile
  async getCurrentUserWithProfile(): Promise<UserWithProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        profile:profiles(*)
      `)
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get user profile with statistics
  async getUserProfileWithStats(userId: string): Promise<UserProfileWithStats | null> {
    const { data, error } = await supabase
      .rpc('get_user_profile_with_stats', { user_id: userId });

    if (error) throw error;
    return data?.[0] || null;
  },

  // Update user information
  async updateUser(userId: string, updates: UpdateUserRequest): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update user profile
  async updateProfile(userId: string, updates: UpdateProfileRequest): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update user preferences
  async updatePreferences(userId: string, preferences: UserPreferences): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('update_user_preferences', {
        user_id: userId,
        new_preferences: preferences
      });

    if (error) throw error;
    return data;
  },

  // Toggle profile visibility
  async toggleProfileVisibility(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('toggle_profile_visibility', { user_id: userId });

    if (error) throw error;
    return data;
  },

  // Check username availability
  async isUsernameAvailable(username: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('is_username_available', { username });

    if (error) throw error;
    return data;
  },

  // Search users
  async searchUsers(params: SearchUsersParams): Promise<UserSearchResult[]> {
    const { data, error } = await supabase
      .rpc('search_users', {
        search_term: params.search_term,
        limit_count: params.limit || 10
      });

    if (error) throw error;
    return data || [];
  },

  // Get nearby users
  async getNearbyUsers(params: GetNearbyUsersParams): Promise<NearbyUser[]> {
    const { data, error } = await supabase
      .rpc('get_nearby_users', {
        user_location: params.location,
        radius_km: params.radius_km || 50,
        limit_count: params.limit || 20
      });

    if (error) throw error;
    return data || [];
  },

  // Update last seen timestamp
  async updateLastSeen(userId: string): Promise<void> {
    const { error } = await supabase
      .rpc('update_last_seen', { user_id: userId });

    if (error) throw error;
  },

  // Get public user profiles
  async getPublicProfiles(limit: number = 20): Promise<any[]> {
    const { data, error } = await supabase
      .from('public_user_profiles')
      .select('*')
      .order('profile_created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Upload avatar
  async uploadAvatar(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // Update user's avatar_url
    await this.updateUser(userId, { avatar_url: data.publicUrl });

    return data.publicUrl;
  },

  // Delete avatar
  async deleteAvatar(userId: string): Promise<void> {
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([`${userId}/avatar`]);

    if (deleteError) throw deleteError;

    // Remove avatar_url from user
    await this.updateUser(userId, { avatar_url: null });
  },

  // Get user by username
  async getUserByUsername(username: string): Promise<UserWithProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        user:users(*)
      `)
      .eq('username', username.toLowerCase())
      .eq('is_public', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return {
      ...data.user,
      profile: data
    };
  },

  // Delete user account
  async deleteAccount(userId: string): Promise<void> {
    // This will cascade delete the profile and other related data
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) throw error;

    // Sign out the user
    await supabase.auth.signOut();
  }
};

// Export individual functions for convenience
export const {
  getCurrentUserWithProfile,
  getUserProfileWithStats,
  updateUser,
  updateProfile,
  updatePreferences,
  toggleProfileVisibility,
  isUsernameAvailable,
  searchUsers,
  getNearbyUsers,
  updateLastSeen,
  getPublicProfiles,
  uploadAvatar,
  deleteAvatar,
  getUserByUsername,
  deleteAccount
} = usersApi;