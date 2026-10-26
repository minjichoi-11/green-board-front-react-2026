    import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PostDetail({token}) {
    const { postId } = useParams();
    // const post = posts.find((item) => String(item.id) === postId);
    const [post, setPost] = useState(null);

    useEffect( () => {
        if (Number(postId) < 1) { 
        console.log("잘못된 게시글 번호입니다.");
        return;
    }
        setPost(null);

        async function loadDetail() {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8080/api/board/${postId}`,
                    { headers: {Authorization: `Bearer ${token}`}}
                );

                const result = await response.json();
                if (!response.ok || !result.success) {
                    throw new Error(result.message || "게시글을 불러올 수 없습니다.")
                }
                
                setPost(result.data);
            } catch (error) {
                console.log(error)
                return;
            }
        }
        loadDetail();
    },
    [postId])

    return <main>
        <article>
            <h1 id="post-title">{post?.title || "게시글을 불러 올 수 없습니다"}</h1>
            <p id="post-meta" className="meta">{post && `${post.authorNickname} | ${post.createdDatetime || ""}`}</p>
            <p id="post-content">{post?.content}</p>
            <p id="post-message" role="status"></p>
        </article>
        <Link to="/posts">목록으로</Link>
        {post && <section id="comments-section" aria-labelledby="comments-title">
            <h2 id="comments-title">댓글</h2>
            <p id="comments-message" role="status"></p>
            <ul id="comment-list"></ul>
            <form id="comment-form">
                <label htmlFor="comment-content">댓글 내용</label>
                <textarea id="comment-content" name="content" required maxLength="255"></textarea>
                <button type="submit">댓글 등록</button>
            </form>
        </section>}
    </main>
}