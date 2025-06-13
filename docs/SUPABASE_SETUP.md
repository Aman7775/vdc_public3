# Supabase Setup Guide

This guide covers the complete setup of user profiles and authentication in Supabase for the mobile health app.

## Database Schema

### Tables Created

1. **users** (existing, enhanced)
   - Added `avatar_url` column for profile pictures
   - Enhanced with better indexing and policies

2. **profiles** (new)
   - Extended user information
   - Username, bio, location, preferences
   - Privacy controls and visibility settings

### Key Features

- **Row Level Security (RLS)** enabled on all tables
- **Automatic profile creation** when users sign up
- **Username uniqueness** with case-insensitive validation
- **Comprehensive indexing** for performance
- **Audit logging** for user actions

## Authentication Configuration

### Required Supabase Settings

1. **Authentication Settings** (via Supabase Dashboard):
   ```
   - Enable email authentication
   - Set JWT expiry to 3600 seconds (1 hour)
   - Enable email confirmations (optional)
   - Configure password requirements:
     * Minimum 8 characters
     * Require uppercase, lowercase, number
   ```

2. **Email Templates** (customize in Auth > Templates):
   - Welcome email
   - Password recovery
   - Email confirmation

3. **Social Auth Providers** (optional):
   - Google OAuth
   - Apple Sign In
   - Facebook Login

## Storage Configuration

### Avatars Bucket Setup

1. **Create Storage Bucket** (via Supabase Dashboard):
   ```
   Bucket Name: avatars
   Public: false
   File Size Limit: 5MB
   Allowed MIME Types: image/jpeg, image/png, image/webp, image/gif
   ```

2. **Storage Policies** (execute in SQL Editor):
   ```sql
   -- Allow users to upload their own avatars
   CREATE POLICY "Users can upload own avatar"
     ON storage.objects
     FOR INSERT
     TO authenticated
     WITH CHECK (
       bucket_id = 'avatars' 
       AND auth.uid()::text = (storage.foldername(name))[1]
     );

   -- Allow users to update their own avatars
   CREATE POLICY "Users can update own avatar"
     ON storage.objects
     FOR UPDATE
     TO authenticated
     USING (
       bucket_id = 'avatars' 
       AND auth.uid()::text = (storage.foldername(name))[1]
     );

   -- Allow users to delete their own avatars
   CREATE POLICY "Users can delete own avatar"
     ON storage.objects
     FOR DELETE
     TO authenticated
     USING (
       bucket_id = 'avatars' 
       AND auth.uid()::text = (storage.foldername(name))[1]
     );

   -- Allow authenticated users to view avatars
   CREATE POLICY "Anyone can view avatars"
     ON storage.objects
     FOR SELECT
     TO authenticated
     USING (bucket_id = 'avatars');
   ```

## Security Policies

### Users Table Policies

- **View own data**: Users can read their complete profile
- **View public data**: Basic user info visible to other authenticated users
- **Update own data**: Users can modify their own information
- **Insert own data**: Users can create their profile during signup

### Profiles Table Policies

- **Public profiles**: Anyone can view profiles marked as public
- **Private profiles**: Only the owner can view private profiles
- **CRUD operations**: Users have full control over their own profile

## API Functions

### Available RPC Functions

1. **User Management**:
   - `get_user_profile_with_stats(user_id)` - Get complete user profile with statistics
   - `update_user_preferences(user_id, preferences)` - Update user preferences
   - `toggle_profile_visibility(user_id)` - Toggle public/private profile

2. **Search & Discovery**:
   - `search_users(search_term, limit)` - Search users by name/username
   - `get_nearby_users(location, radius, limit)` - Find users by location
   - `is_username_available(username)` - Check username availability

3. **Utility Functions**:
   - `update_last_seen(user_id)` - Update user's last activity
   - `is_valid_username(username)` - Validate username format

## Usage Examples

### TypeScript Integration

```typescript
import { usersApi } from '@/lib/api/users';
import { useUser } from '@/lib/hooks/useUser';

// Get current user with profile
const { user, loading, updateProfile } = useUser();

// Search for users
const results = await usersApi.searchUsers({
  search_term: 'john',
  limit: 10
});

// Update user preferences
await usersApi.updatePreferences(userId, {
  notifications: {
    email: true,
    push: false
  },
  theme: 'dark'
});
```

### React Native Components

```tsx
import { useUser, useUserSearch } from '@/lib/hooks/useUser';

function ProfileScreen() {
  const { user, updateProfile, uploadAvatar } = useUser();
  
  const handleUpdateProfile = async (data) => {
    await updateProfile(data);
  };
  
  return (
    // Your profile UI
  );
}
```

## Migration Steps

1. **Run Migrations**:
   ```bash
   # Apply the database migrations
   supabase db push
   ```

2. **Configure Storage**:
   - Create avatars bucket via dashboard
   - Apply storage policies via SQL editor

3. **Update Environment Variables**:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Test Authentication Flow**:
   - Sign up new user
   - Verify profile creation
   - Test avatar upload
   - Verify search functionality

## Security Considerations

1. **Data Privacy**:
   - Users control profile visibility
   - Sensitive data protected by RLS
   - Audit logging for compliance

2. **Input Validation**:
   - Username format validation
   - File type restrictions for avatars
   - SQL injection prevention

3. **Rate Limiting**:
   - Implement client-side rate limiting
   - Monitor API usage patterns
   - Set up alerts for unusual activity

## Monitoring & Maintenance

1. **Database Performance**:
   - Monitor query performance
   - Review index usage
   - Optimize slow queries

2. **Storage Management**:
   - Monitor storage usage
   - Implement cleanup for deleted users
   - Optimize image sizes

3. **User Analytics**:
   - Track user engagement
   - Monitor profile completion rates
   - Analyze search patterns

## Troubleshooting

### Common Issues

1. **Profile not created automatically**:
   - Check trigger function execution
   - Verify user ID in auth.users

2. **Avatar upload fails**:
   - Verify storage policies
   - Check file size limits
   - Confirm MIME type restrictions

3. **Search not working**:
   - Check RLS policies
   - Verify function permissions
   - Test with different search terms

### Debug Queries

```sql
-- Check user profile creation
SELECT u.id, u.email, p.username 
FROM users u 
LEFT JOIN profiles p ON u.id = p.id 
WHERE u.email = 'user@example.com';

-- Verify storage policies
SELECT * FROM storage.objects WHERE bucket_id = 'avatars';

-- Test search function
SELECT * FROM search_users('john', 5);
```