<script>
    import { getDatabase, ref, push } from "firebase/database";
    import Nav from "../components/Nav.svelte";
    import { 
        getStorage, 
        ref as refImage, 
        uploadBytes,
        getDownloadURL,
    } from "firebase/storage";

    let title;
    let price;
    let description;
    let place;
    let files;

    const storage = getStorage();
    const db = getDatabase();

    async function writeUserData(imgUrl) {
        // event.preventDefatul();         
        push(ref(db, "items/"), {
            title, // title:title을 생략
            price,
            description,
            place,
            insertAt: new Date().getTime(),
            imgUrl,
        });
        alert("글쓰기가 완료되었습니다."); // 현업에서는 안씀!!
        window.location.hash = "/";
    }

    // // 'file' comes from the Blob or File API
    // uploadBytes(storageRef, file).then((snapshot) => {
    // console.log('Uploaded a blob or file!');
    // });
    // $: if (files) console.log(files[0]); //files가 바뀔 때마다

    const uploadFile = async () => {
        const file = files[0];
        const name = file.name;
        const imgRef = refImage(storage, name)
        await uploadBytes(imgRef, file);
        const url = await getDownloadURL(imgRef);
        // const res = await uploadBytes(refImage(storage, name), file);
        // console.log("응답", url);
        return url
    };

    const handleSubmit = async () => {
        const url = await uploadFile();
        writeUserData(url);
    }

</script>

<!-- <button on:click={() => writeUserData('abc', 'me', 'abc@abc.com')}>테스트</button> -->
<!-- <button on:click={() => console.log(title, price, description, place)}>테스트</button> -->
<!-- <div>
    <button on:click={uploadFile}>테스트</button>
</div> -->

<form id="write-form" on:submit|preventDefault={handleSubmit}>
    <div>
        <label for="image">이미지</label>
        <input type="file" id="image" name="image" bind:files>
    </div>
    <div>
        <label for="title">제목</label>
        <input type="text" id="title" name="title" bind:value={title} />
    </div>
    <div>
        <label for="price">가격</label>
        <input type="number" id="price" name="price" bind:value={price} />
    </div> 
    <div>
        <label for="description">설명</label>
        <input type="text" id="description" name="description" bind:value={description} />
    </div>
    <div>
        <label for="place">장소</label>
        <input type="text" id="place" name="place" bind:value={place} />
    </div>

    <div>
        <button class="write-button" type="submit">글쓰기 완료!</button>
    </div>
</form>

<Nav location="write"/>

<style>
    .write-button {
        background-color: tomato;
        margin: 10px;
        border-radius: 10px;
        padding: 5px 12px;
        color: white;
        cursor: pointer;
    }
</style>