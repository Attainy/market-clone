from fastapi import FastAPI, UploadFile, Form, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

# sqlite3 세팅
con = sqlite3.connect('carrot.db', check_same_thread=False)
cur = con.cursor()

cur.execute(f"""
            CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            image BLOB,
            price INTEGER NOT NULL,
            description TEXT,
            place TEXT NOT NULL,
            insertAt INTEGER NOT NULL
            );
            """)

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
async def create_item(image: UploadFile,
                title: Annotated[str, Form()],
                price: Annotated[int, Form()],
                description: Annotated[str, Form()],
                place: Annotated[str, Form()],
                insertAt: Annotated[int, Form()]
                ):
    print(image, title, price, description, place)
    
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items(title, image, price, description, place, insertAt)
                VALUES 
                ('{title}', '{image_bytes.hex()}', {price}, '{description}', '{place}', {insertAt})
                """)
    con.commit()
    return '200'

@app.get('/items')
async def get_items():
    con.row_factory = sqlite3.Row # 컬럼명도 같이 가져오도록
    cur = con.cursor() # connection의 현재 위치
    rows = cur.execute(f"""
                       SELECT * from items;
                       """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

@app.get('/images/{item_id}') # 이미지 id를 요청해서 받아오기
async def get_image(item_id):
    cur = con.cursor()
    
    # 아직 16진법으로 구성되어있음
    image_bytes = cur.execute(f"""
                                SELECT image FROM items WHERE id = {item_id}
                              """).fetchone()[0] # 하나만 가져올 때 사용하는 문법
    
    return Response(content=bytes.fromhex(image_bytes), media_type = 'image/*') # 16진법 해석해서 content로 response

# ================= signup ====================== #
@app.post('/signup')
def signup(id:Annotated[str, Form()], password: Annotated[str, Form()]):
    print(id, password)
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