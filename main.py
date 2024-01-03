from fastapi import FastAPI, UploadFile, Form
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

# sqlite3 세팅
con = sqlite3.connect('carrot.db', check_same_thread=False)
cur = con.cursor()

class ChatStructure(BaseModel):
    id: str
    content: str
    person: str # 본인 : Me, 상대 : You
    
chat_history = [{
    'id': 1,
    'content': "안녕하세요",
    'person': "You"
}]

app = FastAPI()

# ================ items ======================= #

@app.post('/items')
async def create_item(image: UploadFile
                , title: Annotated[str, Form()],
                price: Annotated[int, Form()],
                description: Annotated[str, Form()],
                place: Annotated[str, Form()]):
    print(image, title, price, description, place)
    
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items(title, image, price, description, place)
                VALUES ('{title}', '{image_bytes.hex()}', {price}, '{description}', '{place}')
                """)
    con.commit()
    return '200'


# ================= chat ====================== #

@app.post('/chat')
def create_chat(chatting:ChatStructure):
    chat_history.append(chatting)
    return "채팅 추가에 성공했습니다."

@app.get("/chat")
def read_memo():
    return chat_history

@app.put("/chat/{chat_id}")
def put_chat(communication:ChatStructure):
    for com in communication:
        if com.id == communication.id:
            com.content = communication.content
            #com.person = communication.person
            return "성공"
    return "실패"

# static 폴더 안에 있는 파일들
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

