# filed_notes

# 📝 Field Notes — Offline-First Mobile Application

> Đồ án môn học: **Lập trình Mobile (Mobile App Development)**  
> Trường Đại học Công nghệ Đồng Nai (DNTU) — Lớp: `TH7011101 (23DTH1)`  
> Thời gian thực hiện: 14/10/2026 — 28/10/2026

---

## 👥 Thành viên nhóm

| Họ và tên | Mã số sinh viên (MSSV) | Vai trò / Công việc chính |
| :--- | :--- | :--- |
1923050645 | Nguyễn Trung Hậu
1923050808 | Nguyễn Vũ Ngọc Huy

---

## 🎯 Giới thiệu dự án

**Field Notes** là một ứng dụng di động hoạt động theo cơ chế **offline-first** (ưu tiên ngoại tuyến), được thiết kế dành riêng cho sinh viên hoặc các nhà nghiên cứu đi thực tế tại hiện trường (site visit) ở những khu vực không có sóng di động hoặc Internet. Ứng dụng giúp ghi lại toàn bộ quan sát thực tế (tiêu đề, nội dung, ảnh chụp nén, tọa độ vị trí) an toàn trên thiết bị và tự động đồng bộ lên máy chủ ngay khi có kết nối mạng trở lại.

---

## 🚀 Các tính năng chính (Must Have & Should Have)

- 🔐 **Xác thực người dùng:** Đăng nhập, đăng xuất với phiên làm việc duy trì liên tục (persistent session) và lưu trữ mật khẩu/token an toàn qua `SecureStore`.
- 📷 **Ghi chú hiện trường:** Tạo ghi chú bao gồm tiêu đề, nội dung, ảnh chụp (được nén và lưu vào bộ nhớ ứng dụng), cùng với tọa độ vị trí GPS tùy chọn.
- 📴 **Hoạt động ngoại tuyến & Hàng đợi đồng bộ (Sync Queue):** Ghi chú hoạt động hoàn toàn offline, tự động đưa vào hàng đợi và đồng bộ khi có mạng, hiển thị trực quan trạng thái từng ghi chú (và xử lý rõ ràng khi lỗi đồng bộ).
- 📍 **Điều hướng & Định vị (Deep Linking & Notifications):** Màn hình danh sách và chi tiết ghi chú; hỗ trợ mở sâu qua **deep link** hoặc bấm vào **thông báo**.
- 🔍 **Tìm kiếm & Bộ lọc:** Lọc ghi chú theo trạng thái (`draft`, `queued`, `synced`) và tìm kiếm nhanh trên tiêu đề, nội dung được tính toán tối ưu lúc render.
- 🛡️ **Xử lý quyền (Permissions):** Toàn bộ quyền truy cập (Máy ảnh, Vị trí) đều có luồng dự phòng (refusal path), cho phép tiếp tục tạo ghi chú thủ công nếu bị từ chối quyền.
- 🗺️ **Bản đồ trực quan (Should Have):** Hiển thị danh sách các ghi chú có định vị trực tiếp trên bản đồ.
- 📤 **Xuất dữ liệu:** Hỗ trợ xuất toàn bộ ghi chú trong ngày thành file chia sẻ.

---

## 🛠️ Yêu cầu kỹ thuật (Technical Stack)

- **Framework:** Expo SDK 56+ (React Native) với **Expo Router**.
- **Ngôn ngữ:** TypeScript (Strict mode bật).
- **Kiến trúc:** Function components và Custom hooks hoàn toàn.
- **Giao diện:** Hỗ trợ Light / Dark mode thông qua một file token màu trung tâm (Không dùng mã màu HEX cứng).
- **Kiểm thử (Testing):** Tối thiểu 3 automated tests (Pure-logic, Component, Critical path).
- **Bảo mật & Chất lượng:** `npx tsc --noEmit` và `npx expo lint` sạch sẽ không lỗi.

---

## ⚙️ Hướng dẫn cài đặt và chạy dự án (Dành cho máy sạch)

Thực hiện lần lượt các bước sau để chạy ứng dụng trên máy của bạn:

### 1. Yêu cầu hệ thống
- Đã cài đặt **Node.js** (phiên bản LTS khuyến nghị).
- Đã cài đặt **Git**.
- Trình giả lập điện thoại (Android Studio / Xcode) hoặc ứng dụng **Expo Go** trên thiết bị thật.

### 2. Các bước thiết lập
```bash
# Bước 1: Clone kho lưu trữ về máy
git clone <Repository-URL>

# Bước 2: Di chuyển vào thư mục dự án
cd <Ten-Thu-Muc-Project>

# Bước 3: Cài đặt các gói phụ thuộc (Dependencies)
npm install

# Bước 4: Kiểm tra lỗi TypeScript và Linter
npx tsc --noEmit
npx expo lint

# Bước 5: Khởi động ứng dụng bằng Expo
npx expo start
