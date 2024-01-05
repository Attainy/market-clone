<script>
  // 모듈 방식
  import Main from "./pages/Main.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Write from "./pages/Write.svelte";
  import Router from "svelte-spa-router";
  import NotFound from "./pages/NotFound.svelte";
  import "./css/style.css";
  import { user$ } from "./store";
  import { GoogleAuthProvider, getAuth, signInWithCredential } from "firebase/auth";
  import { onMount } from "svelte";

  // const provider = new GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  // let login = false;

  let isLoading = true;
  
  const auth = getAuth();

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return (isLoading = false);  // 토큰이 없으면 함수를 리턴 및 종료

    const credential = GoogleAuthProvider.credential(null, token);
    const result = await signInWithCredential(auth, credential);
    const user = result.user;
    user$.set(user);
    isLoading = false;
  }

  const routes = {
    '/': Main,
    '/signup': Signup,
    '/login': Login,
    '/Write': Write,
    '*': NotFound // 그 외 모든 페이지 (잘못된 경로)
  }

  onMount(() => checkLogin());
  
</script>

<!-- {#if !login}
  <Login />
{:else}
  <Router routes={routes} />
{/if} -->

{#if isLoading}
  <div>로딩중입니다.</div>
{:else if !$user$}
  <Login />
{:else}
  <Router routes={routes} />
{/if}
