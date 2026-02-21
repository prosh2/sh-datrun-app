import { Post } from "@/components/model/Post";

export const samplePosts: Post[] = [
  {
    id: "1",
    name: "Fat Nic",
    distance: "5.2 km",
    duration: "28:43",
    datetime: "2024-06-01T07:30:00Z",
    likes: 10,
    comments: 2,
    location: "Central Park, NY",
    photo: require("../assets/images/run1.jpg"),
    caption: "Felt amazing today!",
    pace: "5:30/km",
    toJSON: function (): object {
      throw new Error("Function not implemented.");
    },
  },
  {
    id: "2",
    name: "Fat Kelv",
    distance: "10.1 km",
    duration: "54:12",
    datetime: "2024-06-02T18:45:00Z",
    likes: 5,
    comments: 1,
    location: "Lake Trail, Austin",
    photo: require("../assets/images/run2.jpg"),
    caption: "First double-digit run!",
    pace: "5:30/km",
    toJSON: function (): object {
      throw new Error("Function not implemented.");
    },
  },
  {
    id: "3",
    name: "meitu yx",
    distance: "2.3 km",
    duration: "10:12",
    datetime: "2024-06-03T12:00:00Z",
    likes: 8,
    comments: 0,
    location: "Singapore, Singapore",
    photo: require("../assets/images/run3.jpg"),
    caption: "Ippt training",
    pace: "6:12/km",
    toJSON: function (): object {
      throw new Error("Function not implemented.");
    },
  },
];
