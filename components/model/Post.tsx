export type Post = {
  id: string;
  name: string;
  distance: string;
  likes: number;
  comments: number; // Optional property for comments
  location: string;
  photo: any; // You can use ImageSourcePropType from 'react-native' for stricter typing
  caption: string;
  pace: string; // Optional property for pace
  datetime: string; // Optional property for the date of the post
};
