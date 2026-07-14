import { useEffect, useRef, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import { ApiError, type MessageOut, createChat, sendMessage } from '../../services/api';
import './Chat.css';

export default function Chat() {
  const [chatId, setChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<MessageOut[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createChat()
      .then((chat) => {
        setChatId(chat.id);
        setStarting(false);
      })
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : 'Não foi possível iniciar a conversa.');
        setStarting(false);
      });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatId === null || sending) return;

    const content = input.trim();
    setInput('');
    setError(null);

    const userMessage: MessageOut = { id: Date.now(), role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setSending(true);

    try {
      const assistantMessage = await sendMessage(chatId, content);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'A IA não respondeu. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="chat">
        <div className="chat__header">
          <div>
            <h1 className="chat__title">Aether IA</h1>
            <p className="chat__subtitle">Converse com o assistente inteligente do Aether.</p>
          </div>
        </div>

        <div className="chat__panel">
          <div className="chat__messages">
            {starting && <p className="chat__hint">Iniciando conversa…</p>}
            {!starting && messages.length === 0 && (
              <p className="chat__hint">Envie uma mensagem para começar a conversar com a IA.</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`chat__bubble chat__bubble--${m.role}`}>
                {m.content}
              </div>
            ))}
            {sending && <div className="chat__bubble chat__bubble--assistant chat__bubble--typing">Digitando…</div>}
            <div ref={bottomRef} />
          </div>

          {error && <p className="chat__error">{error}</p>}

          <form className="chat__form" onSubmit={handleSend}>
            <input
              className="chat__input"
              placeholder="Escreva sua mensagem…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={starting || chatId === null}
            />
            <Button type="submit" disabled={starting || sending || chatId === null}>
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
