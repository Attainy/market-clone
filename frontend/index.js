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

const renderData = (data) => {
    const main = document.querySelector("main.item-tap");

    data.forEach((obj) => {
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
        InfoMetaDiv.innerText = obj.place

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

