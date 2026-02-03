import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostLists from "./components/PostLists";
import PostDetails from "./components/PostDetails";
import PostFrom from "./components/PostFrom";
import EditPost from "./components/EditPost";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MyPosts from "./components/MyPosts";
import Welcome from "./components/Welcome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stats from "./components/Stats";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <ToastContainer
        position="top-center"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/feed" element={<PostLists />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/add" element={<PostFrom />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stats" element={<Stats/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
