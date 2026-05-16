/**
 * Centralized avatar URL generation
 * Strategy: DB avatar → Email seed → Name seed → Fallback
 */
export const getAvatarUrl = (user) => {
  if (!user) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=user`;
  }

  // 1. If user has avatar in DB, use it
  if (user.avatar && user.avatar.trim()) {
    return user.avatar;
  }

  // 2. Generate from email (most stable)
  if (user.email) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(user.email)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  }

  // 3. Generate from name (fallback)
  if (user.name) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  }

  // 4. Generic fallback
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=user&backgroundColor=b6e3f4,c0aede,d1d4f9`;
};