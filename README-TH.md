# SHARKSO🦈IAL - แพลตฟอร์มโซเชียลแบบแยกโมดูล

แพลตฟอร์มโซเชียลมีเดียสมัยใหม่ที่สร้างด้วย React, TypeScript และ Express.js มีระบบสลับ mock/production และโมดูล authentication ที่แยกต่างหากสำหรับการผสานรวมกับผู้ให้บริการ auth ต่างๆ ในอนาคต

## 🚀 ฟีเจอร์

### ฟังก์ชันหลัก
- **ระบบแชท**: ระบบส่งข้อความแบบเรียลไทม์ทั้งกลุ่มและส่วนบุคคล
- **ฟีดโซเชียล**: สร้างโพสต์ ไลค์ คอมเมนต์ และแชร์
- **การจัดการเพื่อน**: คำขอเป็นเพื่อน การเชื่อมต่อ และการค้นหาโซเชียล
- **โปรไฟล์ผู้ใช้**: โปรไฟล์ที่ปรับแต่งได้พร้อมสถิติและการตั้งค่า
- **ดีไซน์มือถือก่อน**: UI ที่ตอบสนองธีมไทย

### จุดเด่นด้านสถาปัตยกรรม
- **ระบบ Auth แบบแยกโมดูล**: โมดูล authentication ที่แยกออกมาอย่างสมบูรณ์
- **สลับ Mock/Prod**: การสลับระหว่างบริการ mock และ production ตาม environment
- **เตรียมพร้อมอนาคต**: พร้อมสำหรับการผสานรวม Firebase, Supabase หรือ OAuth2
- **API ที่เรียบร้อย**: Backend RESTful พร้อมการจัดการข้อผิดพลาดที่ครอบคลุม
- **ความปลอดภัยประเภท**: ครอบคลุม TypeScript เต็มรูปแบบทั้ง frontend และ backend

## 🛠 เทคโนโลยีที่ใช้

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

## วิธีเริ่มต้นใช้งาน

### โหมด Mock สำหรับทดสอบ UI

- หากต้องการทดสอบ UI โดยไม่ต้องเชื่อมต่อ backend ให้ตั้งค่าตัวแปร
  - ใน `.env`: `USE_MOCK=true`
  - หรือใน console browser: `window.USE_MOCK = true;`
- ทุกฟีเจอร์หลัก (ล็อกอิน ฟีด เพื่อน แชท) จะใช้ข้อมูล mock ทันทีเมื่อเปิด
- หากต้องการปิด mock ให้ตั้งค่า `USE_MOCK=false` หรือไม่กำหนดตัวแปรนี้

### ข้อกำหนดเบื้องต้น
- Node.js 18+ 
- npm หรือ yarn

### การติดตั้ง

1. **โคลน repository**
   ```bash
   git clone <your-repo-url>
   cd sharkso-social
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **ตั้งค่า environment variables**
   ```bash
   cp .env.example .env
   ```

4. **เริ่มต้น development server**
   ```bash
   npm run dev
   ```

แอพจะใช้งานได้ที่ `http://localhost:5000`

## 🔧 โหมด Mock/Production

### โหมด Mock (Development)
เหมาะสำหรับการพัฒนาอย่างรวดเร็วโดยไม่ต้องพึ่งพาบริการภายนอก:

```bash
# ในไฟล์ .env
USE_MOCK=true
```

**ฟีเจอร์ในโหมด Mock:**
- จำลองการ authentication ของผู้ใช้
- ข้อมูลตัวอย่างภาษาไทยที่เตรียมไว้แล้ว
- ความล่าช้าของ API response ที่เสมือนจริง
- ไม่ต้องการบริการภายนอก

### โหมด Production
พร้อมสำหรับการ deployment จริง:

```bash
# ในไฟล์ .env
USE_MOCK=false
```

**ข้อกำหนดสำหรับ Production:**
- ฐานข้อมูล PostgreSQL
- การกำหนดค่า JWT secret
- API keys ของบริการภายนอก (Firebase/Supabase)
- การกำหนดค่าบริการอีเมล

## 📁 โครงสร้างโปรเจกต์

```
├── client/                 # แอปพลิเคชัน React Frontend
│   ├── src/
│   │   ├── components/     # คอมโพเนนต์ UI ที่ใช้ซ้ำได้
│   │   ├── contexts/       # React contexts (Auth, App)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # ไลบรารี utility
│   │   ├── pages/          # คอมโพเนนต์หน้าเว็บ
│   │   └── services/       # คลาสบริการ API
├── server/                 # แอปพลิเคชัน Express Backend
│   ├── services/           # บริการ business logic
│   │   ├── auth.service.ts # บริการ Authentication
│   │   ├── config.service.ts # การจัดการ Configuration
│   │   └── mock.service.ts # บริการข้อมูล Mock
│   ├── index.ts           # จุดเริ่มต้นเซิร์ฟเวอร์
│   ├── routes.ts          # คำจำกัดความ API route
│   ├── storage.ts         # อินเทอร์เฟซการจัดเก็บข้อมูล
│   └── vite.ts            # การผสานรวม Vite
├── shared/                # ประเภทและ schemas ที่แชร์
│   └── schema.ts          # Database schema และ types
└── components.json        # การกำหนดค่า Shadcn UI
```

## 🔌 สถาปัตยกรรม Authentication

### การใช้งานปัจจุบัน
```typescript
// การเลือกบริการตาม environment
export class AuthServiceFactory {
  static create(): IAuthService {
    if (config.useMock) {
      return new MockAuthService();    // Development
    }
    return new ProductionAuthService(); // Production
  }
}
```

### จุดผสานรวมในอนาคต
ระบบถูกออกแบบเพื่อผสานรวมได้ง่ายกับ:

- **Firebase Authentication**
- **Supabase Auth**
- **ผู้ให้บริการ OAuth2** (Google, Facebook, LINE)
- **การใช้งาน JWT แบบกำหนดเอง**

## 🎯 วิธีใช้งานแอพ

### แท็บแชท
- ค้นหาแชทที่มีอยู่
- ดูรายการแชททั้งส่วนตัวและกลุ่ม
- สถานะออนไลน์ของเพื่อน
- จำนวนข้อความที่ยังไม่ได้อ่าน

### แท็บโพสต์
- ดูฟีดโซเชียลจากเพื่อน
- สร้างโพสต์ใหม่พร้อมรูปภาพ
- ไลค์ คอมเมนต์ และแชร์โพสต์
- บันทึกโพสต์ที่ชอบ

### แท็บเพื่อน
- ดูรายชื่อเพื่อน
- จัดการคำขอเป็นเพื่อน
- ค้นหาเพื่อนใหม่
- ส่งข้อความหาเพื่อนโดยตรง

### แท็บโปรไฟล์
- ดูและแก้ไขโปรไฟล์ส่วนตัว
- ดูสถิติ (โพสต์ เพื่อน ไลค์)
- ตั้งค่าแอป
- ออกจากระบบ

## 🚀 การ Deployment

### การ Deployment บน Replit
โปรเจกต์นี้ปรับให้เหมาะสำหรับ Replit Deployments:

1. ตรวจสอบให้แน่ใจว่าตั้งค่า environment variables แล้ว
2. กำหนดค่าการเชื่อมต่อฐานข้อมูล
3. Deploy โดยใช้ฟีเจอร์ auto-deploy ของ Replit

### การ Deployment แบบ Manual
```bash
# Build แอปพลิเคชัน
npm run build

# เริ่มเซิร์ฟเวอร์ production
npm start
```

## 🔧 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

1. **แอพไม่แสดงข้อมูล**
   - ตรวจสอบว่าตั้งค่า `USE_MOCK=true` ในไฟล์ .env แล้ว
   - รีสตาร์ทเซิร์ฟเวอร์

2. **Port ชนกัน**
   - เปลี่ยน PORT ในไฟล์ .env
   - หรือหยุดกระบวนการที่ใช้ port 5000 อยู่

3. **TypeScript Errors**
   - รัน `npm run build` เพื่อตรวจสอบข้อผิดพลาด
   - ตรวจสอบการ import ของไฟล์ต่างๆ

## 📖 การพัฒนาเพิ่มเติม

### การเพิ่มฟีเจอร์ใหม่
1. สร้างคอมโพเนนต์ใน `client/src/components/`
2. เพิ่ม API route ใน `server/routes.ts`
3. อัปเดต storage interface ใน `server/storage.ts`
4. เพิ่ม mock data ใน `server/services/mock.service.ts`

### การเปลี่ยนธีม
- แก้ไขสีใน `client/src/index.css`
- ปรับ Tailwind classes ในคอมโพเนนต์

### การเพิ่มภาษา
- เพิ่ม locale files
- อัปเดตข้อความใน UI components
- กำหนดค่า date-fns locale

## 🤝 การร่วมพัฒนา

1. Fork repository
2. สร้าง feature branch: `git checkout -b feature/amazing-feature`
3. Commit การเปลี่ยนแปลง: `git commit -m 'Add amazing feature'`
4. Push ไปยัง branch: `git push origin feature/amazing-feature`
5. เปิด Pull Request

## 📄 License

โปรเจกต์นี้ได้รับอนุญาตภายใต้ MIT License

## 🙏 ขอบคุณ

- สร้างด้วย React และ TypeScript สมัยใหม่
- คอมโพเนนต์ UI จาก Shadcn UI
- รองรับภาษาไทยและการพิจารณาทางวัฒนธรรม
- ได้แรงบันดาลใจจากแพลตฟอร์มโซเชียลมีเดียยอดนิยม