import { useState, useRef, useEffect } from 'react';
import { Paperclip, Send } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
}

interface HackerChatWindowProps {
  useMock?: boolean;
}

export function HackerChatWindow({ useMock = true }: HackerChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    sender: 'Neo',
    content: 'Welcome to the Hacker Chat! 💻',
    timestamp: new Date().toLocaleTimeString(),
  }]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // For prod: placeholder for fetching messages from API
  useEffect(() => {
    if (!useMock) {
      // TODO: fetch messages from API and setMessages
      // Example: apiService.getMessages(chatId).then(setMessages)
    }
  }, [useMock]);

  const handleSend = () => {
    if (!input && !image) return;
    if (useMock) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'You',
          content: input,
          imageUrl: image,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } else {
      // TODO: send message to API
      // Example: apiService.sendMessage({ content: input, imageUrl: image })
    }
    setInput('');
    setImage(undefined);
  };

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#101010] border border-[#39ff14] rounded-xl shadow-lg font-mono text-[#39ff14] flex flex-col h-[80vh] max-w-xl mx-auto mt-8 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#181818]">
        {messages.map(msg => (
          <div key={msg.id} className="">
            <div className="text-xs text-[#39ff14]/60 mb-1">{msg.sender} <span className="ml-2">{msg.timestamp}</span></div>
            <div className="bg-[#101010] border border-[#39ff14]/40 rounded-lg px-4 py-2 inline-block max-w-[80%] break-words">
              <span>{msg.content}</span>
              {msg.imageUrl && (
                <img src={msg.imageUrl} alt="attachment" className="mt-2 rounded border border-[#39ff14]/30 max-w-xs" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-[#39ff14]/30 bg-[#101010] flex items-center gap-2">
        <button
          className="p-2 rounded border border-[#39ff14] hover:bg-[#222] text-[#39ff14]"
          onClick={() => fileInputRef.current?.click()}
          title="แนบไฟล์"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleAttach}
          title="แนบรูปภาพ"
        />
        <input
          className="flex-1 bg-[#181818] border border-[#39ff14]/40 rounded px-3 py-2 text-[#39ff14] font-mono focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button
          className="p-2 rounded border border-[#39ff14] hover:bg-[#222] text-[#39ff14]"
          onClick={handleSend}
          title="ส่งข้อความ"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
