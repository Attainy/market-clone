// 클릭시 뜨는 화면
function displayChatPopup(event) {
    event.preventDefault();
    const chatView = document.querySelector("main.chatting-tap");
    const itemView = document.querySelector("main.item-tap");
    chatView.style.display = "initial";
    itemView.style.display = "none";

    readChat();
}


function displayChatHistory (chat) {
    const ul = document.querySelector("ul.chat-history");
    const li = document.createElement("li");
    // li.innerText = `[id:${memo.id}] ${memo.content}`;
    li.innerText = `${chat.content}`;
    if (chat.person == "You") {
        li.className = "chat-left";
    } else {
        li.className = "chat-right";
    }
    ul.appendChild(li);
}

async function readChat() {
    // get 요청
    const res = await fetch('/chat'); 
    // jsonRes = [{id:123, content:'블라블라', person:'Me'}]
    const jsonRes = await res.json();
    const ul = document.querySelector("ul.chat-history");
    ul.innerHTML = "";
    jsonRes.forEach(displayChatHistory);
};

/* 메세지 생성 */
async function createChat(value) {
    // post 요청
    const res = await fetch("/chat", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            content: value,
            person: 'Me',
        }),
    });
    readChat();
};

/* 메세지 보내기 버튼 */
function handleSubmit(event) {
    event.preventDefault();

    const input = document.querySelector("#submit-form input");
    createChat(input.value);
    input.value = "";

    console.log('버튼 클릭')
}

/* 채팅 아이콘 클릭 이벤트 */
const chatIcon = document.querySelector(".chat");
chatIcon.addEventListener("click", displayChatPopup);

/* 메세지 보내기 이벤트 */
const form = document.querySelector("#submit-form")
form.addEventListener("submit", handleSubmit)
