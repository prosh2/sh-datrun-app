import { Post } from "@/components/model/Post";

export const samplePosts: Post[] = [
  {
    id: '1',
    name: 'Fat Nic',
    distance: '5.2 km',
    likes: 10,
    comments: 2,
    time: '28:43',
    location: 'Central Park, NY',
    photo: require('../assets/images/run1.jpg'),
    caption: 'Felt amazing today!',
  },
  {
    id: '2',
    name: 'Fat Kelv',
    distance: '10.1 km',
    likes: 5,
    comments: 1,
    time: '54:12',
    location: 'Lake Trail, Austin',
    photo: require('../assets/images/run2.jpg'),
    caption: 'First double-digit run!',
  },
  {
    id: '3',
    name: 'meitu yx',
    distance: '2.3 km',
    likes: 8,
    comments: 0,
    time: '10:12',
    location: 'Singapore, Singapore',
    photo: require('../assets/images/run3.jpg'),
    caption: 'Ippt training',
  },
];