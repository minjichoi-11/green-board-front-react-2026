export default function PostItem({post, onSelect}) {
    return (
        <li>
            <a href="/" onClick={(event) => {event.preventDefault(); onSelect(post);}}>{post.title}</a>
            <div href="/">{post.authorNickname} | {post.createdDatetime}</div>
        </li>
    );
}