import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { usersApi } from '../api/users';
import type { UserWithProfile, UserProfileWithStats } from '../types/user';

export function useUser() {
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial user
    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await getCurrentUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await usersApi.getCurrentUserWithProfile();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: any) => {
    if (!user) return;

    try {
      const updatedUser = await usersApi.updateUser(user.id, updates);
      setUser({ ...user, ...updatedUser });
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) return;

    try {
      const updatedProfile = await usersApi.updateProfile(user.id, updates);
      setUser({
        ...user,
        profile: { ...user.profile, ...updatedProfile }
      });
      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return;

    try {
      const avatarUrl = await usersApi.uploadAvatar(user.id, file);
      setUser({ ...user, avatar_url: avatarUrl });
      return avatarUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
      throw err;
    }
  };

  const updateLastSeen = async () => {
    if (!user) return;

    try {
      await usersApi.updateLastSeen(user.id);
    } catch (err) {
      // Silently fail for last seen updates
      console.warn('Failed to update last seen:', err);
    }
  };

  return {
    user,
    loading,
    error,
    updateUser,
    updateProfile,
    uploadAvatar,
    updateLastSeen,
    refresh: getCurrentUser
  };
}

export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfileWithStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await usersApi.getUserProfileWithStats(userId);
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    refresh: loadProfile
  };
}

export function useUserSearch() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = async (searchTerm: string, limit?: number) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await usersApi.searchUsers({
        search_term: searchTerm,
        limit
      });
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    searchUsers,
    clearResults
  };
}