<script>
    // 현재 시간 간단히 표시할 수 있음
    let hour = new Date().getHours();
    let min = new Date().getMinutes();
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


<footer>
    <div class="footer-block">
        <a class="footer-icons" href="./">
            <div class="footer-icons__img">
                <img src="./assets/home.svg" alt="home">
            </div>
            <div class="footer-icons__desc">홈</div>
        </a>
        <div class="footer-icons">
            <div class="footer-icons__img">
                <img src="./assets/document.svg" alt="document">
            </div>
            <div class="footer-icons__desc">동네생활</div>
        </div>
        <div class="footer-icons">
            <div class="footer-icons__img">
                <img src="./assets/location.svg" alt="location">
            </div>
            <div class="footer-icons__desc">내 근처</div>
        </div>
        <div class="footer-icons chat">
            <div class="footer-icons__img">
                <img src="./assets/chat.svg" alt="chat">
            </div>
            <div class="footer-icons__desc">채팅</div>
        </div>
        <div class="footer-icons">
            <div class="footer-icons__img">
                <img src="./assets/user.svg" alt="user">
            </div>
            <div class="footer-icons__desc">나의 당근</div>
        </div>
    </div>
</footer>
<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
    .info-bar__time {
        color: blue;
    }
</style>