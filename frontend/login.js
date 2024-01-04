const form = document.querySelector("#login-form");

// let accessToken = null;

const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const sha256Password = sha256(formData.get('password'));
    formData.set("password", sha256Password);

    const res = await fetch("/login", {
        method: 'post',
        body: formData
    });
    const data = await res.json();
    // accessToken = data.access_token;
    // console.log(accessToken);
    //console.log(data)

    // 로컬 스토리지에 저장
    const accessToken = data.access_token;
    window.localStorage.setItem('token', accessToken); // key, value (key는 내가 정하면 됨)
    alert("로그인되었습니다!");
    
    // 세션 스토리지에 저장
    // window.sessionStorage.setItem('token', accessToken); // key, value (key는 내가 정하면 됨)

    // const infoDiv = document.querySelector("#info");
    // infoDiv.innerText = "로그인되었습니다!!";

    window.location.pathname = "/";

    // if (res.status === 200) {
    //     alert("로그인에 성공했습니다.");
    //     window.location.pathname = "/";
    // } else if (res.status === 401) {
    //     alert("ID 혹은 Password가 틀렸습니다.");
    // }

    // const btn = document.createElement("button");
    // btn.innerText = "상품 가져오기!";

    // Access Token을 넣어서 요청 보내기!!
    // btn.addEventListener("click", async () => {
    //     const res = await fetch("/items", {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`,
    //         },
    //     });
    //     const data = await res.json();
    //     console.log(data);
    // });
    // infoDiv.appendChild(btn);


};

form.addEventListener("submit", handleSubmit);