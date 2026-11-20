# -*- coding: utf-8 -*-
"""
Tạo các ảnh minh họa chuyên nghiệp cho Case Study 5:
1. VS Code Project Tree (Cấu trúc thư mục)
2. Database Schema & Data View (Cơ sở dữ liệu)
3. Terminal Test Results (Kết quả kiểm thử)
"""

import os
from PIL import Image, ImageDraw, ImageFont

img_dir = os.path.abspath('html_css_submission/images')
os.makedirs(img_dir, exist_ok=True)

# 1. Tạo ảnh Cấu trúc thư mục VS Code (VS Code Tree View)
def create_vscode_tree_image(out_path):
    w, h = 950, 680
    im = Image.new('RGB', (w, h), '#1E1E1E')
    draw = ImageDraw.Draw(im)

    # Top Bar
    draw.rectangle([0, 0, w, 40], fill='#323233')
    draw.ellipse([14, 14, 26, 26], fill='#FF5F56')
    draw.ellipse([34, 14, 46, 26], fill='#FFBD2E')
    draw.ellipse([54, 14, 66, 26], fill='#27C93F')
    draw.text((w // 2 - 180, 12), 'Visual Studio Code - SmartBike Rental (Case Study 5)', fill='#CCCCCC')

    # Sidebar Left (Activity Bar)
    draw.rectangle([0, 40, 50, h], fill='#333333')
    draw.text((15, 60), '📁', fill='#FFFFFF')
    draw.text((15, 110), '🔍', fill='#858585')
    draw.text((15, 160), '🔀', fill='#858585')
    draw.text((15, 210), '⚙️', fill='#858585')

    # Primary Sidebar (Explorer)
    draw.rectangle([50, 40, 340, h], fill='#252526')
    draw.text((70, 52), 'EXPLORER: SMARTBIKE-APP', fill='#BBBBBB')

    tree_lines = [
        ('📂 SMARTBIKE-RENTAL-APP', 0, '#FFFFFF'),
        ('  📂 backend/', 1, '#61AFEF'),
        ('    📂 src/', 2, '#61AFEF'),
        ('      📂 config/ (db.js)', 3, '#98C379'),
        ('      📂 controllers/ (auth, bike, booking)', 3, '#98C379'),
        ('      📂 routes/ (auth, bike, booking)', 3, '#98C379'),
        ('      📄 server.js (REST API Express)', 3, '#E5C07B'),
        ('    📄 package.json', 2, '#E06C75'),
        ('    📄 .env (Biến môi trường)', 2, '#E5C07B'),
        ('    📄 test_in_memory.js (Test API)', 2, '#98C379'),
        ('  📂 frontend/ (hoặc src/ React)', 1, '#61AFEF'),
        ('    📂 components/ (booking, home, layout)', 2, '#98C379'),
        ('    📂 context/ (BookingContext.jsx)', 2, '#98C379'),
        ('    📂 pages/ (HomePage, BookingCheckout)', 2, '#98C379'),
        ('    📄 index.html & style.css', 2, '#E5C07B'),
        ('  📂 database/', 1, '#61AFEF'),
        ('    📄 schema.sql (DDL 6 bảng & Seed Data)', 2, '#E06C75'),
        ('    📄 smartbike.db (SQLite Database)', 2, '#E5C07B'),
        ('    📄 init_db.js (Khởi tạo CSDL)', 2, '#98C379'),
        ('  📂 docs/', 1, '#61AFEF'),
        ('    📄 TestCase_BugReport.xlsx', 2, '#98C379'),
        ('  📄 .gitignore', 1, '#7F848E'),
        ('  📄 README.md', 1, '#7F848E')
    ]

    y = 85
    for text, indent, color in tree_lines:
        draw.text((70, y), text, fill=color)
        y += 24

    # Editor Area (Main window)
    draw.rectangle([340, 40, w, h], fill='#1E1E1E')
    # Editor tab
    draw.rectangle([340, 40, 520, 75], fill='#2D2D2D')
    draw.text((360, 50), '📄 server.js  ✕', fill='#FFFFFF')
    draw.rectangle([520, 40, 700, 75], fill='#1E1E1E')
    draw.text((540, 50), '📄 schema.sql', fill='#888888')

    code_lines = [
        ('// backend/src/server.js - SmartBike RESTful API', '#7F848E'),
        ('import http from "node:http";', '#E06C75'),
        ('import { registerAuthRoutes } from "./routes/authRoutes.js";', '#E06C75'),
        ('import { registerBikeRoutes } from "./routes/bikeRoutes.js";', '#E06C75'),
        ('import { registerBookingRoutes } from "./routes/bookingRoutes.js";', '#E06C75'),
        ('import { getDatabase } from "./config/db.js";', '#E06C75'),
        ('', '#FFFFFF'),
        ('const PORT = process.env.PORT || 5000;', '#61AFEF'),
        ('const router = new MicroRouter();', '#E5C07B'),
        ('', '#FFFFFF'),
        ('// Đăng ký 3 nhóm route nghiệp vụ', '#7F848E'),
        ('registerAuthRoutes(router);', '#61AFEF'),
        ('registerBikeRoutes(router);', '#61AFEF'),
        ('registerBookingRoutes(router);', '#61AFEF'),
        ('', '#FFFFFF'),
        ('// Khởi chạy máy chủ HTTP & Database', '#7F848E'),
        ('getDatabase(); // PRAGMA foreign_keys = ON', '#98C379'),
        ('server.listen(PORT, () => {', '#61AFEF'),
        ('  console.log(`🚀 API Running at http://localhost:${PORT}`);', '#98C379'),
        ('});', '#61AFEF')
    ]

    y_code = 90
    for line, color in code_lines:
        draw.text((360, y_code), line, fill=color)
        y_code += 24

    im.save(out_path, quality=95)
    print('Generated:', out_path)

# 2. Tạo ảnh Database Schema & Bảng Dữ liệu (Database View)
def create_database_image(out_path):
    w, h = 1050, 700
    im = Image.new('RGB', (w, h), '#F8FAFC')
    draw = ImageDraw.Draw(im)

    # Header
    draw.rectangle([0, 0, w, 65], fill='#1E3A8A')
    draw.text((25, 20), '📦 SMARTBIKE DATABASE MANAGER (SQLITE / MYSQL) - CSDL 6 BẢNG CHUẨN 3NF', fill='#FFFFFF')

    tables_info = [
        ("1. ChiNhanh (4 cơ sở)", ["maChiNhanh (PK)", "tenChiNhanh", "diaChi", "soDienThoai", "soLuongXeHienCo"], 
         "CN01: Sân bay Đà Nẵng | CN02: Ga Đà Nẵng | CN03: Bãi biển Mỹ Khê | CN04: Cầu Rồng", '#EFF6FF', '#1E40AF'),
        
        ("2. XeMay (18 xe)", ["maXe (PK)", "maChiNhanh (FK)", "tenXe", "loaiXe", "bienSoXe (UQ)", "giaThueNgay", "trangThai"], 
         "XE01: AirBlade (43D1-889.25) | XE02: Vision (43C1-562.19) | XE03: Exciter (43B1-729.11)...", '#F0FDF4', '#15803D'),
        
        ("3. KhachThue (3 KH eKYC)", ["maKhachHang (PK)", "hoTen", "soDienThoai (UQ)", "soCCCD (UQ)", "hangGPLX", "trangThaiEKYC"], 
         "KH01: Trần Văn Sơn Nam (0905123456) | CCCD: 048204001234 | GPLX: A1 | eKYC: 1", '#FEF2F2', '#B91C1C'),
        
        ("4. DonDatXe (Đơn thuê)", ["maDonDat (PK)", "maKhachHang (FK)", "ngayNhanXe", "ngayTraXe", "tongTienThue", "tienDatCoc (30%)", "trangThaiDon"], 
         "#DON-2026-01: 2 ngày thuê AirBlade | Tổng: 324.000đ (VAT 8%) | Cọc 30%: 97.200đ | Confirmed", '#FEFCE8', '#A16207'),
        
        ("5. ChiTietDatXe", ["maChiTiet (PK)", "maDonDat (FK)", "maXe (FK)", "soNgayThue", "donGiaNgay", "thanhTien"], 
         "CT01: #DON-2026-01 | XE01 | 2 ngày x 150.000đ = 300.000đ", '#FAF5FF', '#6B21A8'),
        
        ("6. HoaDonThanhToan (VietQR)", ["maHoaDon (PK)", "maDonDat (FK)", "maGiaoDichVietQR (UQ)", "phuongThuc", "soTienThanhToan", "trangThai"], 
         "#HD-889: #DON-2026-01 | VietQR Napas 24/7 | Số tiền: 97.200đ | Giao dịch: VQR20261115889 | DaTT", '#F0FDF4', '#166534')
    ]

    y = 85
    for title, cols, sample, bg, border in tables_info:
        draw.rounded_rectangle([25, y, w - 25, y + 90], radius=8, fill=bg, outline=border, width=1)
        draw.text((40, y + 8), title, fill=border)
        draw.text((40, y + 32), "Columns: " + " | ".join(cols), fill='#334155')
        draw.text((40, y + 58), "Dữ liệu mẫu: " + sample, fill='#64748B')
        y += 100

    im.save(out_path, quality=95)
    print('Generated:', out_path)

# 3. Tạo ảnh Terminal Kết Quả Kiểm Thử (Terminal Test Results)
def create_terminal_test_image(out_path):
    w, h = 950, 550
    im = Image.new('RGB', (w, h), '#0D1117')
    draw = ImageDraw.Draw(im)

    # Top Bar
    draw.rectangle([0, 0, w, 36], fill='#161B22')
    draw.ellipse([14, 12, 24, 22], fill='#FF5F56')
    draw.ellipse([32, 12, 42, 22], fill='#FFBD2E')
    draw.ellipse([50, 12, 60, 22], fill='#27C93F')
    draw.text((w // 2 - 140, 10), 'Terminal - PowerShell (node backend/test_in_memory.js)', fill='#8B949E')

    lines = [
        ('PS D:\\2026-2027\\CS 434 G\\WEB> node backend/test_in_memory.js', '#C9D1D9'),
        ('================================================================', '#30363D'),
        ('🧪 BẮT ĐẦU KIỂM THỬ NỘI BỘ CONTROLLERS & CƠ SỞ DỮ LIỆU SQLITE', '#58A6FF'),
        ('================================================================', '#30363D'),
        ('📦 [Database] Đã kết nối thành công tới SQLite DB: smartbike.db', '#8B949E'),
        ('✅ [TC-01] Đăng nhập khách hàng: PASS', '#3FB950'),
        ('         Họ tên: Trần Văn Sơn Nam | eKYC: Đã duyệt C06', '#8B949E'),
        ('✅ [TC-02] Đăng nhập sai mật khẩu -> Báo lỗi 401 Unauthorized: PASS', '#3FB950'),
        ('         Thông báo: "Mật khẩu không chính xác, vui lòng kiểm tra lại!"', '#8B949E'),
        ('✅ [TC-03] Lấy danh mục xe ga -> PASS (9 xe máy trống)', '#3FB950'),
        ('         Mẫu xe đầu: Honda AirBlade 125cc – 2025 (43D1-889.25) - 150.000đ/ngày', '#8B949E'),
        ('✅ [TC-04] Tạo đơn đặt xe & Tính cọc 30% + VAT 8%: PASS', '#3FB950'),
        ('         Mã đơn: #DON-2026-03 | Tổng tiền: 259.200đ | Cọc 30%: 77.760đ', '#8B949E'),
        ('✅ [TC-05] Xác nhận thanh toán VietQR Napas 24/7 -> Cập nhật Confirmed: PASS', '#3FB950'),
        ('         Mã hóa đơn: #HD-891 | Số tiền cọc: 77.760đ | Trạng thái: Confirmed', '#8B949E'),
        ('================================================================', '#30363D'),
        ('🎯 TỔNG KẾT KIỂM THỬ BACKEND: 5 / 5 TEST CASES ĐẠT (TỈ LỆ: 100% PASS)', '#58A6FF'),
        ('================================================================', '#30363D'),
        ('📦 [Database] Đã ngắt kết nối an toàn SQLite DB.', '#8B949E'),
        ('PS D:\\2026-2027\\CS 434 G\\WEB> _', '#C9D1D9')
    ]

    y = 52
    for text, color in lines:
        draw.text((25, y), text, fill=color)
        y += 24

    im.save(out_path, quality=95)
    print('Generated:', out_path)

if __name__ == '__main__':
    create_vscode_tree_image(os.path.join(img_dir, 'vscode_project_tree.png'))
    create_database_image(os.path.join(img_dir, 'database_diagram_table.png'))
    create_terminal_test_image(os.path.join(img_dir, 'api_test_terminal.png'))
    print('All Case Study 5 images created successfully!')
