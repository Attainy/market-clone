<script>
    import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { user$ } from "../store";

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // console.log(token, user) 내 정보임

            user$.set(user); // user 정보 업데이트
            localStorage.setItem("token", token); // 로컬 스토리지에 유저 정보 저장

        } catch(error) {
            console.error(error);
        }
    };
    </script>
    
<div>
    <!-- <div>JSON.stringify({$user$})</div> -->
    {#if $user$}
        <div>{$user$?.displayName} 로그인됨</div>
    {/if}
    <div>로그인하기</div>
    <button class="login-btn" on:click={loginWithGoogle}>
        <img class="google-img" src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png" alt="구글로고">
        <div>Google로 로그인하기</div>
    </button>
</div>

<style>
    .login-btn {
        width: 200px;
        height: 50px;
        border: 1px solid gray;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 3px;
        cursor: pointer;
    }

    .google-img {
        width: 20px;
    }
</style>



<!-- <form id="login-form" action="/signup" method="POST">
    <div>로그인</div>
    <div>
        <label for="id">아이디</label>
        <input type="text" id="id" name="id" required/>
    </div>
    <div>
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" required/>
    </div>
    <div>
        <button type="submit">로그인 가입하기</button>
    </div>
    <div id="info"></div>
</form> -->