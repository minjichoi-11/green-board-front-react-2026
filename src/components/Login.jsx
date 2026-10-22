export default function Login() {
    return <main>
        <h1>로그인</h1>
        <form id="login-form">
            <label htmlFor="usename">아이디</label>
            <input id="username" name="username"/>
            <label htmlFor="password">비밀번호</label>
            <input id="password" name="password" type="password"/>
            <p id="login-message" role="alert" hidden></p>
            <button type="submit">로그인</button>
        </form>
    </main>
}