# SHARKSO🦈IAL Terminal Chat Room (เฟส 1)

## ฟีเจอร์หลัก
- UI Terminal Chat Room ธีมดำ-เขียวนีออน + Monospace + Hacker Effect
- Mock message (แสดง 50 ข้อความล่าสุด, ส่งข้อความใหม่ได้)
- รองรับ config toggle mock/prod (แก้ไขในภายหลัง)
- โค้ดแยกโมดูล `src/components/SharkChat`

## วิธีทดสอบ
1. รัน `npm run dev` ที่โฟลเดอร์ client
2. เปิด http://localhost:5000 จะพบหน้า Terminal Chat Room
3. พิมพ์ข้อความแล้วกด Enter เพื่อส่ง (mock)

## การเปลี่ยนแปลงธีม/เอฟเฟกต์
- ใช้ CSS: terminalChat.css (ดำ-เขียวนีออน, scanline, typewriter)
- ฟอนต์ Monospace

## Roadmap
- [x] SharkChat Terminal (mock)
- [ ] SharkShop (เฟส 2)
- [ ] Auth/Profile/Wallet (modular)

---

## Developer Note
- ทุกครั้งที่มีการแก้ไข/เพิ่มฟีเจอร์ จะอัปเดต README.md และเอกสารเสมอ
- หากพบ error หรือข้อแนะนำ จะลงมือแก้ไขทันที
- ระบบล็อคอินจะทำเป็นโมดูลแยกในเฟสถัดไป
