<script>
  // 모듈 방식
  import Main from "./pages/Main.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Write from "./pages/Write.svelte";
  import Router from "svelte-spa-router";
  import NotFound from "./pages/NotFound.svelte";
  import "./css/style.css";

  const routes = {
    '/': Main,
    '/signup': Signup,
    '/login': Login,
    '/Write': Write,
    '*': NotFound // 그 외 모든 페이지 (잘못된 경로)
  }
  
</script>

<Router routes={routes} />
