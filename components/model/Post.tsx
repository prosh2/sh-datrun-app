export interface Post {
  id: string;
  name: string;
  caption: string;
  comments: number; // Optional property for comments
  distance: string;
  datetime: string; // Optional property for the date of the post
  duration: string; // Optional property for the duration of the run in seconds
  likes: number;
  location: string;
  photo: any; // You can use ImageSourcePropType from 'react-native' for stricter typing
  pace: string; // Optional property for pace
  toJSON(): object;
}
