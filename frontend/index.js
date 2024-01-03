{/* 
<div class="item-list">
    <div class="item-list__img">
        <img src="./assets/img.svg" alt="image">
    </div>
    <div class="item-list__info">
        <div class="item-list__info-title">블루투스 키보드 팝니다</div>
        <div class="item-list__info-meta">서초동 4시간 전</div>
        <div class="item-list__info-price">5000원</div>
    </div>
</div> 
*/}

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
    else '방금 전';
}

const renderData = (data) => {
    const main = document.querySelector("main.item-tap");

    // 최신글이 위로 올라오도록 reverse 사용
    data.reverse().forEach((obj) => {
        const div = document.createElement("div");
        div.className = "item-list";

        const imgDiv = document.createElement("div");
        imgDiv.className = "item-list__img";
        
        const img = document.createElement("img");
        img.src = "./assets/img.svg";

        const InfoDiv = document.createElement("div");
        InfoDiv.className = "item-list__info";

        const InfoTitleDiv = document.createElement("div");
        InfoTitleDiv.className = "item-list__info-title";
        InfoTitleDiv.innerText = obj.title;

        const InfoMetaDiv = document.createElement("div");
        InfoMetaDiv.className = "item-list__info-meta";
        InfoMetaDiv.innerText = obj.place + ' ' + calcTime(obj.insertAt); // 장소 + 시간 출력

        const InfoPriceDiv = document.createElement("div");
        InfoPriceDiv.className = "item-list__info-price";
        InfoPriceDiv.innerText = obj.price;

        
        div.appendChild(imgDiv);  
        imgDiv.appendChild(img);
        InfoDiv.appendChild(InfoTitleDiv);
        InfoDiv.appendChild(InfoMetaDiv);
        InfoDiv.appendChild(InfoPriceDiv);
        div.appendChild(InfoDiv);
        main.appendChild(div);
    });

};


const fetchList = async () => {
    const res = await fetch("/items");
    const data = await res.json();
    renderData(data);
};

fetchList();

