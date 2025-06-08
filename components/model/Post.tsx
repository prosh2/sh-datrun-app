export type Post = {
  id: string;
  name: string;
  distance: string;
  likes: number;
  comments: number; // Optional property for comments
  time: string;
  location: string;
  photo: any; // You can use ImageSourcePropType from 'react-native' for stricter typing
  caption: string;
};
