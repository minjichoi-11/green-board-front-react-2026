import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BoardFooter from "./components/BoardFooter";
import BoardHeader from "./components/BoardHeader";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";
import "./style.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  function addPracticePost(){
    const id = Date.now();
    setPosts((currentPosts) => [
      {id, title: `임시 게시글 ${currentPosts.length}`, authorNickname: "학생", createdDatetime: "2026-10-04"},
      ...currentPosts,
    ]);
  }

  function savePost(post) {
    // setPosts((currentPosts) => [
    //   {id:Date.now(), ...post, authorNickname: "학생", createdDatetime: "2026-10-04"},
    //   ...currentPosts,
    // ]);
  }

  return (
    <>
      <BoardHeader isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}/>
      <Routes>
        <Route path="/" element={token ? <PostList token={token}/> : <Login onLogin={setToken}/>} />
        <Route path="/posts" element={token ? <PostList token={token}/> : <Login onLogin={setToken}/>} />
        <Route path="/posts/new" element={<PostForm onSave={savePost} />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/login" element={<Login onLogin={setToken} />} />

      </Routes>
      <BoardFooter />
    </>
  )
}