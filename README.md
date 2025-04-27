This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Tạo nội dung file README.md dựa trên những gì đã thống nhất với người dùng

readme_content = """
# 📚 Project Documentation

## 🔥 Firebase

### Firebase dùng để làm gì?

- Firebase là nền tảng backend-as-a-service (BaaS) hỗ trợ web và mobile app.
- Trong project này, **Firebase Cloud Firestore** được dùng làm **database** để lưu trữ:
  - Thông tin sản phẩm (tên, mô tả, giá, loại, URL hình ảnh).

### Firebase được sử dụng như thế nào?

- Tạo Project Firebase.
- Kết nối Web App với Firebase SDK.
- Sử dụng **Firestore Database** để:
  - Thêm mới sản phẩm.
  - Lấy danh sách sản phẩm.
  - Hiển thị sản phẩm ra giao diện web.
- Lưu **URL hình ảnh** (không lưu file ảnh trực tiếp).

**Lưu ý:**  
- Firebase Storage yêu cầu nâng cấp billing plan (Blaze) mới sử dụng được.  
- Vì thế, project này **không dùng Firebase Storage**, chỉ dùng Firestore.

---

## ☁️ Cloudinary

### Cloudinary dùng để làm gì?

- Cloudinary là dịch vụ lưu trữ và quản lý file media (ảnh, video...) chuyên nghiệp.
- Trong project này, **Cloudinary** được dùng để:
  - Upload và lưu trữ ảnh sản phẩm.
  - Lấy **URL public** của ảnh để lưu vào Firestore.

### Cloudinary được sử dụng như thế nào?

- Đăng ký tài khoản miễn phí trên [cloudinary.com](https://cloudinary.com/).
- Upload ảnh sản phẩm:
  - **Cách 1**: Upload thủ công trên Dashboard → copy URL ảnh.
  - **Cách 2**: Tích hợp Cloudinary Upload Widget để upload ảnh trực tiếp từ web app.
- Sau khi upload, Cloudinary trả về một đường link (`secure_url`) → lưu vào Firestore cùng với dữ liệu sản phẩm.

---

# 🚀 Tóm tắt quy trình hoạt động

1. Người quản trị upload ảnh sản phẩm lên **Cloudinary**.
2. Lấy **URL ảnh** từ Cloudinary.
3. Tạo sản phẩm mới trên web app, nhập các thông tin sản phẩm và dán **URL ảnh** vào.
4. Web app lưu toàn bộ thông tin vào **Firestore**.
5. Người dùng vào web app sẽ thấy sản phẩm với ảnh đầy đủ.

---

# 📦 Kết cấu dữ liệu `Product`

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;    // URL ảnh từ Cloudinary
  category: string;
  quantity?: number;
  price?: number;
}
