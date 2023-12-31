from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

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
app.mount("/", StaticFiles(directory="static", html=True), name="static")