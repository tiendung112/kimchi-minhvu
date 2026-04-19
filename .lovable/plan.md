

# Kế hoạch: Web Thiệp Cưới Cao Cấp (Tiếng Việt)

Một trang thiệp cưới một-trang (single-page), tối ưu mobile, theo phong cách **Luxury Minimalist & Romantic** với bảng màu Ngà / Sage Xanh / Vàng Champagne.

## Cấu trúc các phần (theo thứ tự cuộn)

1. **Hero** — Ảnh nền cặp đôi, overlay tối nhẹ, tiêu đề "Lễ Thành Hôn của [Chú rể] & [Cô dâu]", ngày cưới, đồng hồ đếm ngược (Ngày : Giờ : Phút : Giây) cập nhật mỗi giây, nút cuộn xuống.
2. **Trân trọng kính mời** — Lời mời ngắn, tên hai gia đình, ngày âm/dương lịch.
3. **Cô dâu & Chú rể** — Hai khối ảnh tròn + tên + vài dòng giới thiệu.
4. **Câu chuyện tình yêu** — Timeline dọc các mốc kỷ niệm (gặp nhau, hẹn hò đầu tiên, cầu hôn…), so le trái/phải trên desktop, dồn 1 cột trên mobile.
5. **Thông tin buổi lễ** — 2 Card sang trọng:
   - **Lễ Thành Hôn**: thời gian, địa chỉ tư gia, nút "Chỉ đường Google Maps".
   - **Tiệc Cưới**: thời gian, địa chỉ nhà hàng, nút "Xem vị trí".
6. **Bộ sưu tập ảnh** — Grid masonry (CSS columns), click ảnh mở Dialog phóng to.
7. **Xác nhận tham dự (RSVP)** — Form: Họ tên, Số điện thoại, Khách của (Nhà trai/Nhà gái — RadioGroup), Số người tham dự, Lời chúc. Validate bằng zod + react-hook-form. Lưu vào Supabase. Toast: "Cảm ơn bạn đã gửi xác nhận!".
8. **Mừng cưới online** — Nút "Gửi lời chúc & Quà tặng" mở Dialog hiển thị 2 tab (Chú rể / Cô dâu) với mã QR ngân hàng + STK + chủ tài khoản, có nút copy STK.
9. **Footer** — Lời cảm ơn, tên cặp đôi, ngày cưới.

## Thiết kế hệ thống

- **Màu (HSL trong `index.css`)**: ivory `0 33% 99%` (background), sage `122 16% 37%` (primary), gold `46 65% 52%` (accent), foreground sage đậm.
- **Font**: nạp Google Fonts `Playfair Display` (400/600/700) cho `.font-serif` và `Inter` (400/500/600) cho body, qua `<link>` trong `index.html`.
- **Tailwind**: thêm `fontFamily.serif = ['Playfair Display', 'serif']`, mở rộng keyframes `fade-in-up`, `shimmer` cho viền vàng.
- Mọi màu dùng token semantic (không hardcode hex trong component).

## Animation

- Dùng **Framer Motion** với `whileInView` + `viewport={{ once: true }}` cho scroll reveal (fade + translateY). Stagger nhẹ cho timeline và gallery.
- Hover scale nhẹ trên ảnh gallery và nút.

## Backend (Lovable Cloud / Supabase)

- Bật **Lovable Cloud**.
- Migration tạo bảng `public.rsvp_responses`:
  - `id uuid pk default gen_random_uuid()`
  - `full_name text not null` (≤100)
  - `phone text not null` (≤20)
  - `guest_of text not null check in ('nha_trai','nha_gai')`
  - `attendee_count int not null check >0 and <=20`
  - `wishes text` (≤1000)
  - `created_at timestamptz default now()`
- **RLS**: enable; policy `INSERT` cho `anon` + `authenticated` (ai cũng gửi được); không có policy SELECT (khách không đọc được danh sách người khác).
- Client gọi `supabase.from('rsvp_responses').insert(...)`.

## Cấu trúc file mới

```text
src/
  pages/Index.tsx              (lắp ráp các section)
  components/wedding/
    Hero.tsx                   (countdown + tiêu đề)
    Countdown.tsx              (hook setInterval)
    Invitation.tsx             ("Trân trọng kính mời")
    CoupleIntro.tsx
    LoveStory.tsx              (timeline)
    EventInfo.tsx              (2 Card)
    Gallery.tsx                (masonry + Dialog lightbox)
    RsvpForm.tsx               (react-hook-form + zod + supabase)
    GiftModal.tsx              (Dialog + Tabs QR)
    Footer.tsx
    SectionTitle.tsx           (tiêu đề có đường vàng trang trí)
    Reveal.tsx                 (wrapper Framer Motion scroll-reveal)
  lib/wedding-config.ts        (tên, ngày, địa chỉ, link maps, STK, ảnh — dễ chỉnh)
```

- Cập nhật `index.html` (title tiếng Việt, link Google Fonts).
- Cập nhật `src/index.css` (tokens màu mới, `body { font-family: Inter }`, util `.font-serif`).
- Cập nhật `tailwind.config.ts` (fontFamily, keyframes).

## Phụ thuộc cần cài

- `framer-motion` (chưa có)
- `react-hook-form`, `@hookform/resolvers`, `zod` (cho RSVP form — kiểm tra & cài nếu thiếu)
- `@supabase/supabase-js` (auto khi bật Lovable Cloud)

## Nội dung mặc định (placeholder, dễ sửa trong `wedding-config.ts`)

- Chú rể: "Minh Anh" — Cô dâu: "Thu Hà"
- Ngày cưới: 14/12/2025, 10:00
- Lễ Thành Hôn: tư gia nhà gái, 8:00
- Tiệc Cưới: Nhà hàng Continental, 18:00
- Ảnh: dùng ảnh placeholder từ Unsplash (cặp đôi, hoa, nhẫn) — generate vài ảnh AI nếu cần
- QR ngân hàng: ảnh placeholder + STK mẫu

## Mobile-first

- Viewport mục tiêu ~390px: 1 cột cho mọi section, font tiêu đề `text-4xl` mobile / `text-6xl` desktop, padding `px-5 py-16`, tap target ≥44px, ảnh `loading="lazy"`.

## Validation & bảo mật

- Zod schema cho form (trim, max length, regex SĐT VN `^(0|\+84)\d{9,10}$`).
- Không log dữ liệu form ra console.
- RLS chỉ cho INSERT từ public.

