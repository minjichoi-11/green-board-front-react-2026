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

  // App(토큰 보유) > Todolist (토큰 불필요) > Todoitem (토큰 불필요) > Item (토큰 필요)
  // 위와 같이 자식에게 값 전달을 위해, 해당 값을 필요로 하지 않는 컴포넌트를 거치는 문제를
  // props drilling이라 함.
  // Context
  // Auth(토큰 등) 정보를 Context에 저장하고, 
  // App에서 Token을 자식에게 전파해주던 방식에서
  // token이 필요한 컨포넌트가 Context에서 가져다 쓰는 방식으로 변경


  return (
    <>
      <BoardHeader isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}/>
      <Routes>
        <Route path="/" element={token ? <PostList token={token}/> : <Login onLogin={setToken}/>} />
        <Route path="/posts" element={token ? <PostList token={token}/> : <Login onLogin={setToken}/>} />
        <Route path="/posts/new" element={<PostForm onSave={savePost} />} />
        <Route path="/posts/:postId" element={token ? <PostDetail token={token} /> : <Login onLogin={setToken} />} />
        <Route path="/login" element={<Login onLogin={setToken} />} />

      </Routes>
      <BoardFooter />
    </>
  )
}