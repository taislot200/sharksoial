# SHARKSO🦈IAL - แพลตฟอร์มโซเชียลแบบแยกโมดูล

> อัปเดตล่าสุด: 17 มิ.ย. 2025 - เพิ่มตัวอย่าง schema ฐานข้อมูล, แนวทาง mock/prod, และวิธีขยายระบบ

แพลตฟอร์มโซเชียลมีเดียสมัยใหม่ที่สร้างด้วย React, TypeScript และ Express.js มีระบบสลับ mock/production และโมดูล authentication ที่แยกต่างหากสำหรับการผสานรวมกับผู้ให้บริการ auth ต่างๆ ในอนาคต

## 🚀 ฟีเจอร์

### ฟังก์ชันหลัก
- **ระบบแชท**: ระบบส่งข้อความแบบเรียลไทม์ทั้งกลุ่มและส่วนบุคคล (แนบภาพได้)
- **ฟีดโซเชียล**: สร้างโพสต์ ไลค์ คอมเมนต์ และแชร์
- **การจัดการเพื่อน**: คำขอเป็นเพื่อน การเชื่อมต่อ และการค้นหาโซเชียล
- **โปรไฟล์ผู้ใช้**: โปรไฟล์ที่ปรับแต่งได้พร้อมสถิติและการตั้งค่า
- **ดีไซน์มือถือก่อน**: UI ที่ตอบสนองธีมไทย

### จุดเด่นด้านสถาปัตยกรรม
- **ระบบ Auth แบบแยกโมดูล**: โมดูล authentication ที่แยกออกมาอย่างสมบูรณ์
- **สลับ Mock/Prod**: การสลับระหว่างบริการ mock และ production ตาม environment (`USE_MOCK`)
- **เตรียมพร้อมอนาคต**: พร้อมสำหรับการผสานรวม Firebase, Supabase หรือ OAuth2
- **API ที่เรียบร้อย**: Backend RESTful พร้อมการจัดการข้อผิดพลาดที่ครอบคลุม
- **ความปลอดภัยประเภท**: ครอบคลุม TypeScript เต็มรูปแบบทั้ง frontend และ backend

## 🛠 Tech Stack

### Frontend
- **React 18** พร้อม TypeScript
- **Tailwind CSS** + คอมโพเนนต์ **Shadcn UI**
- **React Query** สำหรับการจัดการ state
- **Wouter** สำหรับ routing
- **React Context** สำหรับ state ส่วนกลาง

### Backend
- **Express.js** พร้อม TypeScript
- **Drizzle ORM** สำหรับการดำเนินการฐานข้อมูล
- **สถาปัตยกรรมบริการแบบแยกโมดูล**
- **การกำหนดค่าตาม environment**

## 🗄️ Database Schema (Drizzle ORM)

ตัวอย่าง schema หลัก (ดูรายละเอียดใน `shared/schema.ts`):

```typescript
export const users = pgTable("users", { ... });
export const posts = pgTable("posts", { ... });
export const comments = pgTable("comments", { ... });
export const friendships = pgTable("friendships", { ... });
export const chats = pgTable("chats", { ... });
export const chatMembers = pgTable("chat_members", { ... });
export const messages = pgTable("messages", { ... });
```

- **chats**: รองรับทั้งกลุ่มและเดี่ยว (`isGroup`)
- **messages**: รองรับข้อความ, รูปภาพ, ไฟล์ (`messageType`)

## 🔧 Mock/Production Mode

- **Mock**: ใช้ mock service/data (เช่น `MockAuthService`, `mock.service.ts`)
- **Production**: เชื่อมต่อฐานข้อมูลจริง, Auth จริง, API จริง
- สลับโหมดด้วย env: `USE_MOCK=true` หรือ `false`
- ทุก service (auth, chat, post ฯลฯ) มี interface เดียวกันทั้ง mock/prod

## 🧑‍💻 ขยายระบบ/พัฒนา

- เพิ่มฟีเจอร์ใหม่: สร้างคอมโพเนนต์ใน `client/src/components/` และ service mock/prod ใน `server/services/`
- เพิ่ม field/schema: อัปเดต `shared/schema.ts` แล้ว migrate ฐานข้อมูลจริง
- ทุกครั้งที่เพิ่ม/เปลี่ยน schema หรือ business logic **ควรอัปเดต README และ SYSTEM_OVERVIEW.md**
- ตัวอย่าง mock data: ดูใน `server/services/mock.service.ts`

## 🏁 เริ่มต้นใช้งาน

1. **โคลน repository**
   ```bash
   git clone <your-repo-url>
   cd sharkso-social
   ```
2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```
3. **ตั้งค่า environment**
   ```bash
   cp .env.example .env
   # ตั้งค่า USE_MOCK=true สำหรับ dev
   ```
4. **เริ่มต้น development server**
   ```bash
   npm run dev
   ```

## 📝 หมายเหตุ
- อัปเดตเอกสารทุกครั้งเมื่อมีการเปลี่ยนแปลง schema, business logic หรือโครงสร้างระบบ เพื่อให้ง่ายต่อการพัฒนาและ deployment จริง
- ดูรายละเอียดโครงสร้างและแนวคิดระบบใน `SYSTEM_OVERVIEW.md`
