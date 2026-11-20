// database/init_db.js - Khởi tạo CSDL thực tế cho SmartBike Rental (ES Module)
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'smartbike.db');
const schemaPath = path.join(__dirname, 'schema.sql');

console.log('🔄 Đang khởi tạo CSDL SmartBike tại:', dbPath);

if (fs.existsSync(dbPath)) {
    try {
        fs.unlinkSync(dbPath);
        console.log('🗑️  Đã làm sạch file DB cũ.');
    } catch (e) {
        console.log('⚠️  File DB đang mở, sẽ ghi đè nội dung.');
    }
}

const db = new DatabaseSync(dbPath);
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

// Thực thi toàn bộ lệnh SQL
db.exec(schemaSql);

console.log('✅ Khởi tạo bảng và chèn dữ liệu mẫu thành công!');

// Kiểm tra số lượng bản ghi thực tế
const branchCount = db.prepare('SELECT COUNT(*) AS count FROM ChiNhanh').get().count;
const bikeCount = db.prepare('SELECT COUNT(*) AS count FROM XeMay').get().count;
const userCount = db.prepare('SELECT COUNT(*) AS count FROM KhachThue').get().count;
const bookingCount = db.prepare('SELECT COUNT(*) AS count FROM DonDatXe').get().count;
const invoiceCount = db.prepare('SELECT COUNT(*) AS count FROM HoaDonThanhToan').get().count;

console.log('📊 THỐNG KÊ CƠ SỞ DỮ LIỆU HIỆN CÓ:');
console.log(`   - Chi nhánh Đà Nẵng: ${branchCount} cơ sở`);
console.log(`   - Đội xe máy:        ${bikeCount} xe`);
console.log(`   - Khách thuê eKYC:   ${userCount} tài khoản`);
console.log(`   - Đơn thuê xe:       ${bookingCount} đơn (#DON-2026-01)`);
console.log(`   - Hóa đơn VietQR:    ${invoiceCount} giao dịch`);

// Truy vấn thử đơn hàng chi tiết
const sampleBooking = db.prepare('SELECT * FROM View_DonThueTongHop LIMIT 1').get();
console.log('\n🔍 ĐƠN HÀNG MẪU ĐƯỢC ÁNH XẠ TRONG CSDL:');
console.log(JSON.stringify(sampleBooking, null, 2));

db.close();
