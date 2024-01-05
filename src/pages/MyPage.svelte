<script>
    import Nav from "../components/Nav.svelte";
    import { user$ } from "../store";

    const logout = () => {
        // 유저 정보와 로컬 스토리지 정보를 지워주기
        user$.set(null);
        localStorage.removeItem("token");
    }
</script>

<div>나의 당근</div>
<button on:click={logout}>로그아웃</button>

<Nav location="my" />

<style>
    button {
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
</style>