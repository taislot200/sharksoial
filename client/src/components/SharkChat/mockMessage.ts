export interface Message {
  username: string;
  text: string;
  timestamp: number;
}

const mockUser = "sharkuser";
let messages: Message[] = [
  { username: "admin", text: "Welcome to SHARKSO🦈IAL Terminal Chat!", timestamp: Date.now() - 100000 },
  { username: "mim_hacker", text: "สวัสดีชาวแชท!", timestamp: Date.now() - 90000 },
  { username: "darkmatrix", text: "ใครออนไลน์บ้าง?", timestamp: Date.now() - 80000 },
  { username: "sharkuser", text: "พร้อมลุย!", timestamp: Date.now() - 70000 },
];

export function getMockMessages(): Message[] {
  return messages;
}

export function sendMockMessage(text: string) {
  messages.push({
    username: mockUser,
    text,
    timestamp: Date.now(),
  });
  if (messages.length > 100) {
    messages = messages.slice(-100);
  }
}
