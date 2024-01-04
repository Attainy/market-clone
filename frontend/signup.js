const form = document.querySelector("#signup-form");

// 비밀번호 확인
const checkPassword = () => {
    const formData = new FormData(form);
    const password1 = formData.get("password");
    const password2 = formData.get("password2");

    if (password1 === password2) {
        return true;
    } else return false;
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const sha256Password = sha256(formData.get('password'));
    formData.set("password", sha256Password);
    console.log(formData.get('password'));
    // console.log(sha256("hi"));

    const div = document.querySelector('#info');

    // 비밀번호 확인까지 체크 끝나면 코드 실행
    if (checkPassword()) {
        const res = await fetch("/signup", {
            method: 'post',
            body: formData
        });

        const data = await res.json();
        if (data === "200") {
            div.innerText = "회원가입에 성공했습니다!";
            div.style.color = "blue";
        }

    } else {
        div.innerText = "비밀번호가 같지 않습니다.";
        div.style.color = "red";
    }
    


    
}

form.addEventListener("submit", handleSubmit);