# SMARTBIKE RENTAL Đà Nẵng — Cấu Trúc Dự Án Đa Module (Clean Architecture)

Hệ thống cho thuê xe máy thông minh tích hợp eKYC & thanh toán VietQR tự động tại Đà Nẵng. Dự án được chia tách kiến trúc rõ ràng thành các tầng **components**, **data**, **pages**, **context**, loại bỏ hoàn toàn việc gộp chung một file JSX cồng kềnh.

---

## 📁 Cấu Trúc Thư Mục (Folder Structure)

```text
WEB/
├── public/
├── src/
│   ├── context/
│   │   └── BookingContext.jsx        # Quản lý state toàn cục (xe đang chọn, ngày giờ, bộ lọc, giỏ thuê, popup...)
│   │
│   ├── data/                         # Tách biệt toàn bộ dữ liệu tĩnh & mock data
│   │   ├── bikesData.js              # Danh mục 18+ xe (AirBlade, Vision, Exciter, Wave Alpha...) kèm thông số
│   │   ├── commitmentsData.js        # Dữ liệu 4 cam kết khách hàng & huy hiệu tin cậy
│   │   ├── branchesData.js           # Danh sách 4 chi nhánh tại Đà Nẵng & điều khoản chính sách
│   │   └── mockBookingData.js        # Dữ liệu mẫu đơn thuê #DON-2026-01, eKYC C06, ngân hàng VietQR
│   │
│   ├── components/
│   │   ├── layout/                   # Các thành phần giao diện khung
│   │   │   ├── Navbar.jsx            # Header, logo SmartBike, menu điều hướng, badge đơn thuê, hotline, user eKYC
│   │   │   ├── Footer.jsx            # Chân trang 4 cột: thương hiệu, chi nhánh, chính sách, cổng thanh toán
│   │   │   └── Stepper.jsx           # Thanh tiến trình 3 bước (Bước 1: Chọn xe -> Bước 2: eKYC & Cọc -> Bước 3: Nhận xe)
│   │   │
│   │   ├── home/                     # Các khối thành phần riêng biệt của Trang Chủ
│   │   │   ├── HeroSection.jsx       # Banner mở đầu, định vị địa lý Đà Nẵng, 4 trust badges
│   │   │   ├── SearchBookingCard.jsx # Hộp tìm kiếm và giữ xe nổi (Floating card)
│   │   │   ├── BikeFilterTabs.jsx    # Bộ lọc phân loại xe: Tất cả (18), Xe ga (10), Xe số (5), Xe côn tay (3)
│   │   │   ├── BikeCard.jsx          # Thẻ hiển thị từng mẫu xe (biển số, giá thuê, trang bị, nút Đặt thuê)
│   │   │   ├── FleetSection.jsx      # Danh mục đội xe dạng grid tương tác
│   │   │   └── CommitmentSection.jsx # Khối 4 cam kết dịch vụ bảo vệ khách hàng
│   │   │
│   │   ├── booking/                  # Các khối giao diện Trang Checkout / Thanh toán
│   │   │   ├── CustomerKYCInfo.jsx   # Khối 1: Thông tin khách thuê & tài liệu OCR (CCCD gắn chip, GPLX)
│   │   │   ├── ContractDetails.jsx   # Khối 2: Chi tiết hợp đồng xe, phụ kiện đi kèm, bảng hạch toán giá & cọc 30%
│   │   │   ├── PaymentVietQR.jsx     # Khối 3: Cổng VietQR Napas 24/7, đếm ngược giữ lịch, nút sao chép STK/nội dung
│   │   │   └── SupportHotlineBox.jsx # Hộp liên hệ hỗ trợ điều phối viên 24/7
│   │   │
│   │   └── common/                   # Thành phần dùng chung (Reusable UI)
│   │       ├── Badge.jsx             # Huy hiệu trạng thái nhiều biến thể màu sắc
│   │       ├── Toast.jsx             # Thông báo nổi khi sao chép thông tin thành công
│   │       └── KycModal.jsx          # Modal phóng to chi tiết giấy tờ eKYC đã xác thực OCR
│   │
│   ├── pages/                        # Tầng Pages đại diện cho từng màn hình
│   │   ├── HomePage.jsx              # Trang chủ giới thiệu & đặt xe nhanh
│   │   └── BookingCheckoutPage.jsx   # Trang hợp đồng điện tử & thanh toán cọc VietQR
│   │
│   ├── App.jsx                       # Root view kết nối Router & Provider
│   ├── main.jsx                      # Entrypoint khởi tạo React DOM
│   └── index.css                     # Tailwind CSS & custom styling
│
├── tailwind.config.js                # Cấu hình màu sắc thương hiệu (brand colors)
├── vite.config.js                    # Cấu hình Vite build tool
└── package.json
```

---

## 🚀 Hướng Dẫn Chạy Ứng Dụng

1. **Khởi chạy môi trường phát triển (Development):**
   ```bash
   npm run dev
   ```
   Truy cập vào: `http://localhost:3000`

2. **Đóng gói dự án (Production Build):**
   ```bash
   npm run build
   ```

3. **Xem trước bản đóng gói (Preview):**
   ```bash
   npm run preview
   ```

---

## ✨ Tính Năng Nổi Bật Được Cài Đặt

1. **Chuyển trang mượt mà giữa Trang chủ & Trang đơn thuê:**
   - Bấm nút **"ĐẶT THUÊ"** trên bất kỳ xe nào sẽ tự động chuyển sang trang hợp đồng tương ứng với xe đó.
   - Bấm vào menu **"Đơn thuê (1)"** hoặc avatar người dùng để xem đơn hàng đã tạo.
   - Bấm **"Quay lại chọn xe khác"** để trở về danh sách xe.

2. **Lọc xe theo danh mục:**
   - Cho phép chọn *Tất cả*, *Xe ga*, *Xe số*, *Xe côn tay* với số lượng cập nhật tự động.

3. **Thanh toán VietQR Napas 24/7:**
   - Bộ đếm thời gian giữ lịch xe (đếm ngược theo thời gian thực).
   - Mã VietQR động được tạo đúng số tiền cọc (30%) và mã đơn thuê.
   - Nút sao chép Số tài khoản và Nội dung chuyển khoản kèm hiệu ứng Toast thông báo.
   - Nút **"XÁC NHẬN ĐÃ CHUYỂN KHOẢN"** kích hoạt thành công trạng thái hợp đồng.

4. **Xem trước hồ sơ eKYC:**
   - Nhấp vào bất kỳ ảnh CCCD hoặc GPLX để mở modal soi chi tiết chứng thực AI OCR.
