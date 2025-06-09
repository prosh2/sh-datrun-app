export type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string; // Optional property for user's profile picture
  bio?: string; // Optional property for user's bio
  followersCount?: number; // Optional property for followers count
  followingCount?: number; // Optional property for following count
  postsCount?: number; // Optional property for posts count
};
