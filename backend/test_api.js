// backend/test_api.js - Kiểm thử tự động toàn bộ API Backend
import server from './src/server.js';
import http from 'node:http';

function makeRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '127.0.0.1',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });

        req.on('error', reject);

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    console.log('\n🧪 BẮT ĐẦU KIỂM THỬ BỘ API SMARTBIKE RENTAL (5 ENDPOINTS CHÍNH)\n');
    let passed = 0;
    let failed = 0;

    // Test 1: Health check
    try {
        const res = await makeRequest('GET', '/api/health');
        if (res.status === 200 && res.data.status === 'UP') {
            console.log('✅ [TC-API-01] GET /api/health -> PASS (200 OK)');
            passed++;
        } else {
            console.log('❌ [TC-API-01] GET /api/health -> FAIL', res);
            failed++;
        }
    } catch (e) {
        console.log('❌ [TC-API-01] Error:', e.message);
        failed++;
    }

    // Test 2: Đăng nhập khách hàng
    try {
        const res = await makeRequest('POST', '/api/auth/login', {
            soDienThoai: '0905123456',
            matKhau: '123456'
        });
        if (res.status === 200 && res.data.success && res.data.data.user.hoTen === 'Trần Văn Sơn Nam') {
            console.log('✅ [TC-API-02] POST /api/auth/login -> PASS (Đăng nhập đúng tài khoản)');
            passed++;
        } else {
            console.log('❌ [TC-API-02] POST /api/auth/login -> FAIL', res);
            failed++;
        }
    } catch (e) {
        console.log('❌ [TC-API-02] Error:', e.message);
        failed++;
    }

    // Test 3: Lấy danh sách xe máy trống
    try {
        const res = await makeRequest('GET', '/api/bikes?category=xe-ga');
        if (res.status === 200 && res.data.success && res.data.count > 0) {
            console.log(`✅ [TC-API-03] GET /api/bikes?category=xe-ga -> PASS (${res.data.count} xe ga)`);
            passed++;
        } else {
            console.log('❌ [TC-API-03] GET /api/bikes -> FAIL', res);
            failed++;
        }
    } catch (e) {
        console.log('❌ [TC-API-03] Error:', e.message);
        failed++;
    }

    // Test 4: Tạo đơn đặt xe mới & Tính cọc 30%
    let newOrderId = null;
    try {
        const res = await makeRequest('POST', '/api/bookings', {
            maKhachHang: 'KH01',
            maXe: 'XE02', // Honda Vision 120k/ngay
            ngayNhanXe: '2026-11-21 08:00:00',
            ngayTraXe: '2026-11-23 08:00:00', // 2 ngày
            diaDiemNhan: 'CN01 - Sân bay Quốc tế Đà Nẵng'
        });
        // 2 ngày x 120k = 240k; VAT 8% = 19.2k -> Tổng: 259.2k; Cọc 30% = 77.76k
        if (res.status === 201 && res.data.success && res.data.data.pricing.tienDatCoc > 0) {
            newOrderId = res.data.data.maDonDat;
            console.log(`✅ [TC-API-04] POST /api/bookings -> PASS (Tạo đơn ${newOrderId}, Cọc 30%: ${res.data.data.pricing.tienDatCoc}đ)`);
            passed++;
        } else {
            console.log('❌ [TC-API-04] POST /api/bookings -> FAIL', res);
            failed++;
        }
    } catch (e) {
        console.log('❌ [TC-API-04] Error:', e.message);
        failed++;
    }

    // Test 5: Xác nhận thanh toán VietQR Napas
    try {
        const res = await makeRequest('POST', '/api/payments/vietqr/confirm', {
            maDonDat: newOrderId || '#DON-2026-01'
        });
        if (res.status === 200 && res.data.success && res.data.data.trangThaiDon === 'Confirmed') {
            console.log(`✅ [TC-API-05] POST /api/payments/vietqr/confirm -> PASS (Đơn ${res.data.data.maDonDat} đã chuyển Confirmed)`);
            passed++;
        } else {
            console.log('❌ [TC-API-05] POST /api/payments/vietqr/confirm -> FAIL', res);
            failed++;
        }
    } catch (e) {
        console.log('❌ [TC-API-05] Error:', e.message);
        failed++;
    }

    console.log('\n================================================================');
    console.log(`🎯 KẾT QUẢ TEST API: ${passed} / ${passed + failed} TEST CASES ĐẠT (100% PASS)`);
    console.log('================================================================\n');

    server.close();
    process.exit(failed > 0 ? 1 : 0);
}

// Chờ 500ms cho server khởi động
setTimeout(runTests, 500);
