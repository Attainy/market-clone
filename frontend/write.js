const form = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
        const res = await fetch('/items', {
            method: 'POST',
            body: new FormData(form)
        });

        const data = await res.json();
        if (data === '200') window.location.pathname = "/";
    } catch (e) {
        console.error('이미지 업로드 실패');
    }

    // 성공하면 메인페이지로
    // const data = await res.json();
    // if (data === '200') window.location.pathname = "/";
    // else console.error('이미지 업로드 실패');
}

form.addEventListener('submit', handleSubmitForm)

