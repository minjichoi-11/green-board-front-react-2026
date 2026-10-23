import { useState } from "react";
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

// 리액트의 상태 관리
  const [posts, setPosts] = useState([
    {id : 1, title : "첫 번째 게시글", authorNickname: "학생", createdDatetime: "2026-10-04", content: "우끼끼"},
    {id : 2, title : "두 번째 게시글", authorNickname: "강사", createdDatetime: "2026-10-04", content: "바나나"},
  ]);

  function addPracticePost(){
    const id = Date.now();
    setPosts((currentPosts) => [
      {id, title: `임시 게시글 ${currentPosts.length}`, authorNickname: "학생", createdDatetime: "2026-10-04"},
      ...currentPosts,
    ]);
  }

  function savePost(post) {
    setPosts((currentPosts) => [
      {id:Date.now(), ...post, authorNickname: "학생", createdDatetime: "2026-10-04"},
      ...currentPosts,
    ]);
  }

  return (
    <>
      <BoardHeader isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}/>
      <Routes>
        <Route path="/" element={<PostList posts={posts} onAddPracticePost={addPracticePost} />} />
        <Route path="/posts" element={<PostList posts={posts} onAddPracticePost={addPracticePost} />} />
        <Route path="/posts/new" element={<PostForm onSave={savePost} />} />
        <Route path="/posts/:postId" element={<PostDetail posts={posts}/>} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

      </Routes>
      <BoardFooter />
    </>
  )
}