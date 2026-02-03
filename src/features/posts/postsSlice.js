import { createSlice } from "@reduxjs/toolkit";

// Get posts from localStorage
let storedPosts = localStorage.getItem("posts");

//  Convert JSON string to JS array (or empty array if null)
let parsedPosts;
if (storedPosts !== null) {
  parsedPosts = JSON.parse(storedPosts);
} else {
  parsedPosts = [];
}
//  Normalize each post
const savedPosts = parsedPosts.map(function (post) {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category,
    author: post.author,

    // ensure required fields always exist
    likes: post.likes !== undefined ? post.likes : 0,
    likedBy: post.likedBy !== undefined ? post.likedBy : [],
  };
});
const initialState = {
  posts: savedPosts,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },

    likePost:(state,action)=>{
      const {postId,userEmail}=action.payload;
      const post=state.posts.find(p=>p.id===postId);
      if (!post) return;
//inlcudes check karta hai ki array ke andar ye value hai ya nahi
// and ans true or false me deta hai
      const alreadyLiked = post.likedBy.includes(userEmail);

      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter(e => e !== userEmail);
        post.likes -= 1;
      } else {
        post.likedBy.push(userEmail);
        post.likes += 1;
      }

      localStorage.setItem("posts", JSON.stringify(state.posts));
    },

    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        p => p.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
        localStorage.setItem("posts", JSON.stringify(state.posts));
      }
    },
  },
});

export const { addPost, deletePost, likePost, updatePost } =
  postsSlice.actions;

export default postsSlice.reducer;
