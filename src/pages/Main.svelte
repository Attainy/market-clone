<script>
    import { onMount } from "svelte";
    import Footer from "../components/Footer.svelte";
    import { getDatabase, ref, onValue } from "firebase/database";

    // 현재 시간 간단히 표시할 수 있음
    let hour = new Date().getHours();
    let min = new Date().getMinutes();

    // 반응형 변수 선언. 자동으로 업데이트 됨
    $: items = [];

    const calcTime = (timestamp) => {
        // const curTime = new Date().getTime(); // 한국시간 (UTC + 9)
        const curTime = new Date().getTime() - 9 * 60 * 60 * 1000; // 세계시간으로 맞춰주기
        const time = new Date(curTime - timestamp);
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const second = time.getSeconds();

        if (hour > 0) return `${hour}시간 전`;
        else if (minutes > 0) return `${minutes}분 전`;
        else if (second >= 0) return `${second}초 전`;
        else return '방금 전';
    };

    const db = getDatabase();
    const itemsRef = ref(db, "items/");

    // 화면이 렌더링될 때마다 onValue 호출될 수 있도록 하는 게 onMount
    onMount(() => {
        onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        // 최신 업로드글이 위로
        items = Object.values(data).reverse(); // items 변수 업데이트
        // console.log(JSON.stringify(data, null, 2));
        // console.log(Object.values(data));
        });
    });
</script>

<header>
    <div class="info-bar">
        
        <!-- 현재 시간 표시 -->
        <div class="info-bar__time">{hour}:{min}</div>

        <div class="info-bar__icons">
            <img src="assets/chart-bar.svg" alt="chart-bar">
            <img src="assets/wifi.svg" alt="wifi">
            <img src="assets/battery.svg" alt="battery">
        </div>
    </div>
    <div class="menu-bar">
        <div class="menu-bar__location">
            <div>역삼 1동</div>
            <div class="menu-bar__location-icons">
                <img src="assets/arrow.svg" alt="arrow">
            </div>
        </div>
        <div class="menu-bar__icons">
            <img src="assets/search.svg" alt="search">
            <img src="assets/menu.svg" alt="menu">
            <img src="assets/alert.svg" alt="alert">
        </div>
    </div>
</header>

<main class="item-tap">
    {#each items as item}
        <div class="item-list">
            <div class="item-list__img">
                <img src={item.imgUrl} alt={item.title}/>
            </div>
            <div class="item-list__info">
                <div class="item-list__info-title">{item.title}</div>
                <div class="item-list__info-meta">{item.place} {calcTime(item.insertAt)}</div>
                <div class="item-list__info-price">{item.price}</div>
                <div class="item-list__info-description">{item.description}</div>
            </div>
        </div>
    {/each}

    <a class="write-btn" href="#/write">+글쓰기</a>
</main>

<main class="chatting-tap">
    <div class="chat-head">
        <div class="left-icons">
            <div class="icon" >
                <svg width="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div>푸르미</div>
        </div>
        <div class="right-icons">
            <div class="icon">
                <svg width="20px"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
            </div>
            <div class="icon">
                <svg width="20px"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </div>
        </div>
    </div>
    <ul class="chat-history">
    </ul>
    <form id="submit-form">
        <input type="text" id="send-text" placeholder="메세지 보내기" />
        <button type="submit" id="submit-btn">보내기</button>
    </form>
</main>

<Footer location="home" />

<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
    .info-bar__time {
        color: blue;
    }
</style>