-- =============================================================================
-- HỆ THỐNG QUẢN LÝ CHO THUÊ XE MÁY TRỰC TUYẾN - SMARTBIKE RENTAL ĐÀ NẴNG
-- MÔN: CÔNG CỤ & PHƯƠNG PHÁP THIẾT KẾ QUẢN LÝ PHẦN MỀM (CS 434)
-- CASE STUDY 5: TỪ BẢN THIẾT KẾ ĐẾN SẢN PHẨM HOÀN CHỈNH
-- NHÓM 1: TRẦN VĂN SƠN NAM, NGÔ QUANG VINH, ĐẶNG TRƯƠNG TẤN THĂNG, TRẦN BÙI MINH NHẬT, PHAN QUỐC TRỤ
-- =============================================================================

-- Xóa các bảng cũ theo thứ tự ràng buộc khóa ngoại (Foreign Key Dependency)
DROP TABLE IF EXISTS HoaDonThanhToan;
DROP TABLE IF EXISTS ChiTietDatXe;
DROP TABLE IF EXISTS DonDatXe;
DROP TABLE IF EXISTS KhachThue;
DROP TABLE IF EXISTS XeMay;
DROP TABLE IF EXISTS ChiNhanh;

-- -----------------------------------------------------------------------------
-- BẢNG 1: ChiNhanh (Quản lý các cơ sở giao nhận xe máy tại Đà Nẵng)
-- -----------------------------------------------------------------------------
CREATE TABLE ChiNhanh (
    maChiNhanh VARCHAR(10) PRIMARY KEY,
    tenChiNhanh NVARCHAR(100) NOT NULL,
    diaChi NVARCHAR(255) NOT NULL,
    soDienThoai VARCHAR(15) NOT NULL,
    soLuongXeHienCo INT DEFAULT 0,
    ngayTao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- BẢNG 2: XeMay (Danh mục đội xe máy thông minh)
-- -----------------------------------------------------------------------------
CREATE TABLE XeMay (
    maXe VARCHAR(10) PRIMARY KEY,
    maChiNhanh VARCHAR(10) NOT NULL,
    tenXe NVARCHAR(100) NOT NULL,
    loaiXe NVARCHAR(20) NOT NULL CHECK(loaiXe IN ('Xe ga', 'Xe số', 'Xe côn tay')),
    bienSoXe VARCHAR(15) NOT NULL UNIQUE,
    giaThueNgay DECIMAL(12, 0) NOT NULL CHECK(giaThueNgay > 0),
    trangThai NVARCHAR(20) NOT NULL DEFAULT 'Trống' CHECK(trangThai IN ('Trống', 'Đã đặt', 'Đang thuê', 'Bảo dưỡng')),
    dungTichXiLanh VARCHAR(20) DEFAULT '125cc',
    mucTieuHaoXang VARCHAR(30) DEFAULT '2.0L / 100km',
    hinhAnhUrl NVARCHAR(255),
    ngayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maChiNhanh) REFERENCES ChiNhanh(maChiNhanh) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- -----------------------------------------------------------------------------
-- BẢNG 3: KhachThue (Hồ sơ khách hàng & Định danh điện tử eKYC C06)
-- -----------------------------------------------------------------------------
CREATE TABLE KhachThue (
    maKhachHang VARCHAR(10) PRIMARY KEY,
    hoTen NVARCHAR(100) NOT NULL,
    soDienThoai VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100),
    soCCCD CHAR(12) NOT NULL UNIQUE,
    hangGPLX VARCHAR(20) NOT NULL DEFAULT 'Hạng A1',
    trangThaiEKYC INT DEFAULT 1 CHECK(trangThaiEKYC IN (0, 1)), -- 0: Chưa duyệt, 1: Hợp lệ
    matKhauHash VARCHAR(255) NOT NULL,
    vaiTro NVARCHAR(20) DEFAULT 'Customer' CHECK(vaiTro IN ('Customer', 'Staff', 'Admin')),
    ngayTao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- BẢNG 4: DonDatXe (Đơn đặt thuê xe máy trực tuyến)
-- -----------------------------------------------------------------------------
CREATE TABLE DonDatXe (
    maDonDat VARCHAR(20) PRIMARY KEY,
    maKhachHang VARCHAR(10) NOT NULL,
    ngayNhanXe DATETIME NOT NULL,
    ngayTraXe DATETIME NOT NULL,
    diaDiemNhan NVARCHAR(255) NOT NULL,
    tongTienThue DECIMAL(12, 0) NOT NULL DEFAULT 0,
    thueVAT8PhanTram DECIMAL(12, 0) NOT NULL DEFAULT 0,
    tienDatCoc DECIMAL(12, 0) NOT NULL DEFAULT 0, -- 30% của tổng tiền
    trangThaiDon NVARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK(trangThaiDon IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    thoiGianTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maKhachHang) REFERENCES KhachThue(maKhachHang) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- -----------------------------------------------------------------------------
-- BẢNG 5: ChiTietDatXe (Chi tiết các mẫu xe được chọn trong từng đơn)
-- -----------------------------------------------------------------------------
CREATE TABLE ChiTietDatXe (
    maChiTiet INT PRIMARY KEY,
    maDonDat VARCHAR(20) NOT NULL,
    maXe VARCHAR(10) NOT NULL,
    soNgayThue INT NOT NULL CHECK(soNgayThue > 0),
    donGiaNgay DECIMAL(12, 0) NOT NULL,
    thanhTien DECIMAL(12, 0) NOT NULL,
    FOREIGN KEY (maDonDat) REFERENCES DonDatXe(maDonDat) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (maXe) REFERENCES XeMay(maXe) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- -----------------------------------------------------------------------------
-- BẢNG 6: HoaDonThanhToan (Hóa đơn và giao dịch VietQR Napas 24/7)
-- -----------------------------------------------------------------------------
CREATE TABLE HoaDonThanhToan (
    maHoaDon VARCHAR(20) PRIMARY KEY,
    maDonDat VARCHAR(20) NOT NULL,
    maGiaoDichVietQR VARCHAR(50) NOT NULL UNIQUE,
    phuongThuc NVARCHAR(50) NOT NULL DEFAULT 'VietQR Napas 24/7',
    soTienThanhToan DECIMAL(12, 0) NOT NULL,
    loaiThanhToan NVARCHAR(30) NOT NULL DEFAULT 'Đặt cọc 30%' CHECK(loaiThanhToan IN ('Đặt cọc 30%', 'Thanh toán đủ 100%', 'Hoàn cọc')),
    thoiGianTT DATETIME DEFAULT CURRENT_TIMESTAMP,
    trangThai NVARCHAR(20) NOT NULL DEFAULT 'DaTT' CHECK(trangThai IN ('ChoTT', 'DaTT', 'ThatBai')),
    FOREIGN KEY (maDonDat) REFERENCES DonDatXe(maDonDat) ON UPDATE CASCADE ON DELETE CASCADE
);

-- =============================================================================
-- CHÈN DỮ LIỆU MẪU (SEED DATA CHO HỆ THỐNG CHẠY THỰC TẾ)
-- =============================================================================

-- 1. Seed Chi Nhánh Đà Nẵng
INSERT INTO ChiNhanh (maChiNhanh, tenChiNhanh, diaChi, soDienThoai, soLuongXeHienCo) VALUES
('CN01', 'CN01 - Sân bay Quốc tế Đà Nẵng', 'Sảnh đến T1, Cột 05 Sân bay Quốc tế Đà Nẵng, Hải Châu', '0905111222', 10),
('CN02', 'CN02 - Ga Đà Nẵng', '202 Hải Phòng, Tam Thuận, Thanh Khê, Đà Nẵng', '0905222333', 5),
('CN03', 'CN03 - Bãi biển Mỹ Khê', '120 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng', '0905333444', 8),
('CN04', 'CN04 - Cầu Rồng & Chợ Hàn', '45 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng', '0905444555', 6);

-- 2. Seed Danh mục 18 Xe Máy (Honda, Yamaha - Đầy đủ 3 phân loại)
INSERT INTO XeMay (maXe, maChiNhanh, tenXe, loaiXe, bienSoXe, giaThueNgay, trangThai, dungTichXiLanh, mucTieuHaoXang, hinhAnhUrl) VALUES
('XE01', 'CN01', 'Honda AirBlade 125cc – 2025', 'Xe ga', '43D1-889.25', 150000, 'Đã đặt', '125cc eSP+', '2.1L / 100km', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc'),
('XE02', 'CN01', 'Honda Vision 110cc SmartKey', 'Xe ga', '43C1-562.19', 120000, 'Trống', '110cc eSP', '1.8L / 100km', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87'),
('XE03', 'CN01', 'Yamaha Exciter 155 VVA', 'Xe côn tay', '43B1-729.11', 180000, 'Trống', '155cc VVA', '2.09L / 100km', 'https://images.unsplash.com/photo-1609630875171-b1321377ee65'),
('XE04', 'CN01', 'Honda Wave Alpha 110cc', 'Xe số', '43K1-334.82', 90000, 'Trống', '110cc', '1.72L / 100km', 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae'),
('XE05', 'CN02', 'Honda Lead 125cc Cốp Rộng', 'Xe ga', '43E1-294.68', 140000, 'Trống', '125cc eSP+', '2.16L / 100km', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc'),
('XE06', 'CN02', 'Honda Winner X 150cc ABS', 'Xe côn tay', '43F1-654.12', 170000, 'Trống', '150cc DOHC', '1.99L / 100km', 'https://images.unsplash.com/photo-1609630875171-b1321377ee65'),
('XE07', 'CN02', 'Yamaha Sirius FI 115cc', 'Xe số', '43H1-821.55', 95000, 'Trống', '115cc FI', '1.57L / 100km', 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae'),
('XE08', 'CN03', 'Honda SH Mode 125cc ABS', 'Xe ga', '43G1-998.88', 220000, 'Trống', '125cc eSP+', '2.16L / 100km', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87'),
('XE09', 'CN03', 'Honda Future 125cc Fi', 'Xe số', '43K1-778.23', 110000, 'Trống', '125cc FI', '1.54L / 100km', 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae'),
('XE10', 'CN03', 'Yamaha NVX 155cc VVA', 'Xe ga', '43D1-456.78', 170000, 'Trống', '155cc BlueCore', '2.23L / 100km', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc'),
('XE11', 'CN04', 'Yamaha Grande Hybrid 125cc', 'Xe ga', '43C1-987.65', 160000, 'Trống', '125cc Hybrid', '1.66L / 100km', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87'),
('XE12', 'CN04', 'Suzuki Raider R150 Fi', 'Xe côn tay', '43B1-888.99', 190000, 'Trống', '150cc DOHC', '2.20L / 100km', 'https://images.unsplash.com/photo-1609630875171-b1321377ee65'),
('XE13', 'CN01', 'Honda Blade 110cc', 'Xe số', '43K1-112.34', 90000, 'Trống', '110cc', '1.85L / 100km', 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae'),
('XE14', 'CN01', 'Honda Vario 160cc ABS', 'Xe ga', '43D1-332.11', 190000, 'Trống', '160cc eSP+', '2.20L / 100km', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc'),
('XE15', 'CN02', 'Yamaha Jupiter FI 115cc', 'Xe số', '43H1-554.22', 95000, 'Trống', '115cc', '1.64L / 100km', 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae'),
('XE16', 'CN03', 'Honda SH 150cc ABS', 'Xe ga', '43G1-123.45', 280000, 'Trống', '150cc eSP+', '2.24L / 100km', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87'),
('XE17', 'CN04', 'Yamaha Janus 125cc SmartKey', 'Xe ga', '43C1-445.66', 130000, 'Trống', '125cc', '1.87L / 100km', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87'),
('XE18', 'CN04', 'Honda CBR150R', 'Xe côn tay', '43B1-999.00', 250000, 'Trống', '150cc DOHC', '2.25L / 100km', 'https://images.unsplash.com/photo-1609630875171-b1321377ee65');

-- 3. Seed Tài Khoản Khách Hàng (Tài khoản mẫu đã xác thực eKYC)
INSERT INTO KhachThue (maKhachHang, hoTen, soDienThoai, email, soCCCD, hangGPLX, trangThaiEKYC, matKhauHash, vaiTro) VALUES
('KH01', 'Trần Văn Sơn Nam', '0905123456', 'sonnam.tran@smartbike.vn', '048204001234', 'Hạng A1 (Vô thời hạn)', 1, 'scrypt$admin123', 'Customer'),
('KH02', 'Ngô Quang Vinh', '0905888999', 'vinh.ngo@smartbike.vn', '048204005678', 'Hạng A2', 1, 'scrypt$vinh2026', 'Staff'),
('KH03', 'Đặng Trương Tấn Thăng', '0905777666', 'thang.dang@smartbike.vn', '048204009999', 'Hạng A1', 1, 'scrypt$thang2026', 'Admin');

-- 4. Seed Đơn Đặt Thuê Xe Mẫu (#DON-2026-01 theo đúng Case Study 4)
INSERT INTO DonDatXe (maDonDat, maKhachHang, ngayNhanXe, ngayTraXe, diaDiemNhan, tongTienThue, thueVAT8PhanTram, tienDatCoc, trangThaiDon, thoiGianTao) VALUES
('#DON-2026-01', 'KH01', '2026-11-15 08:00:00', '2026-11-17 08:00:00', 'Sảnh đến T1 – Sân bay Quốc tế Đà Nẵng', 324000, 24000, 97200, 'Confirmed', '2026-11-14 14:30:00');

-- 5. Seed Chi Tiết Đặt Xe
INSERT INTO ChiTietDatXe (maChiTiet, maDonDat, maXe, soNgayThue, donGiaNgay, thanhTien) VALUES
(1, '#DON-2026-01', 'XE01', 2, 150000, 300000);

-- 6. Seed Hóa Đơn Thanh Toán Đặt Cọc VietQR Napas 24/7
INSERT INTO HoaDonThanhToan (maHoaDon, maDonDat, maGiaoDichVietQR, phuongThuc, soTienThanhToan, loaiThanhToan, thoiGianTT, trangThai) VALUES
('#HD-889', '#DON-2026-01', 'VQR20261115889', 'VietQR Napas 24/7', 97200, 'Đặt cọc 30%', '2026-11-14 14:35:15', 'DaTT');

-- =============================================================================
-- VIEW TIỆN ÍCH DÀNH CHO BACKEND API
-- =============================================================================
CREATE VIEW View_DanhSachXeChiTiet AS
SELECT 
    x.maXe,
    x.tenXe,
    x.loaiXe,
    x.bienSoXe,
    x.giaThueNgay,
    x.trangThai,
    x.dungTichXiLanh,
    x.mucTieuHaoXang,
    x.hinhAnhUrl,
    c.maChiNhanh,
    c.tenChiNhanh,
    c.diaChi AS diaChiChiNhanh
FROM XeMay x
JOIN ChiNhanh c ON x.maChiNhanh = c.maChiNhanh;

CREATE VIEW View_DonThueTongHop AS
SELECT 
    d.maDonDat,
    k.hoTen AS tenKhachHang,
    k.soDienThoai,
    k.soCCCD,
    k.trangThaiEKYC,
    x.tenXe,
    x.bienSoXe,
    d.ngayNhanXe,
    d.ngayTraXe,
    d.diaDiemNhan,
    d.tongTienThue,
    d.tienDatCoc,
    d.trangThaiDon,
    h.maHoaDon,
    h.maGiaoDichVietQR,
    h.trangThai AS trangThaiThanhToan
FROM DonDatXe d
JOIN KhachThue k ON d.maKhachHang = k.maKhachHang
JOIN ChiTietDatXe ct ON d.maDonDat = ct.maDonDat
JOIN XeMay x ON ct.maXe = x.maXe
LEFT JOIN HoaDonThanhToan h ON d.maDonDat = h.maDonDat;
