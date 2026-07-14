from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.providers.openai_provider import client, MODEL
from app.database.database import get_db
from app.models.chat import Chat
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageOut
from app.schemas.chat import ChatCreate, ChatOut, ChatWithMessages

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/", response_model=ChatOut)
def create_chat(chat: ChatCreate, db: Session = Depends(get_db)):
    db_chat = Chat(project_id=chat.project_id)
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat


@router.get("/{chat_id}", response_model=ChatWithMessages)
def get_chat(chat_id: int, db: Session = Depends(get_db)):
    db_chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not db_chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return db_chat


@router.post("/send", response_model=MessageOut)
def send_message(message: MessageCreate, db: Session = Depends(get_db)):

    db_chat = db.query(Chat).filter(Chat.id == message.chat_id).first()
    if not db_chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    # salva mensagem do usuário
    user_message = Message(
        role="user",
        content=message.content,
        chat_id=message.chat_id
    )

    db.add(user_message)
    db.commit()

    # monta o histórico da conversa para dar contexto à IA
    history = (
        db.query(Message)
        .filter(Message.chat_id == message.chat_id)
        .order_by(Message.id)
        .all()
    )

    # chama a IA
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "Você é o Aether, um assistente inteligente."
            },
            *[{"role": m.role, "content": m.content} for m in history]
        ],
        temperature=0.7

    )

    ai_response = response.choices[0].message.content

    # salva resposta da IA
    assistant_message = Message(
        role="assistant",
        content=ai_response,
        chat_id=message.chat_id
    )

    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)

    return assistant_message
