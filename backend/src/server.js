// backend/src/server.js
// Máy chủ Backend RESTful API cho SmartBike Rental Đà Nẵng
// Hỗ trợ chạy thuần Node.js 18+ không cần phụ thuộc thư viện bên ngoài
import http from 'node:http';
import { parse } from 'node:url';
import { registerAuthRoutes } from './routes/authRoutes.js';
import { registerBikeRoutes } from './routes/bikeRoutes.js';
import { registerBookingRoutes } from './routes/bookingRoutes.js';
import { getDatabase } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Router micro-framework
class MicroRouter {
    constructor() {
        this.routes = [];
    }

    add(method, pathPattern, handler) {
        // Chuyển /api/bikes/:id thành regex
        const paramNames = [];
        const regexStr = '^' + pathPattern.replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        }) + '$';
        const regex = new RegExp(regexStr);

        this.routes.push({ method, pathPattern, regex, paramNames, handler });
    }

    get(path, handler) { this.add('GET', path, handler); }
    post(path, handler) { this.add('POST', path, handler); }
    put(path, handler) { this.add('PUT', path, handler); }
    delete(path, handler) { this.add('DELETE', path, handler); }

    find(method, pathname) {
        for (const route of this.routes) {
            if (route.method === method) {
                const match = pathname.match(route.regex);
                if (match) {
                    const params = {};
                    route.paramNames.forEach((name, i) => {
                        params[name] = match[i + 1];
                    });
                    return { handler: route.handler, params };
                }
            }
        }
        return null;
    }
}

const router = new MicroRouter();

// Đăng ký các nhóm route
registerAuthRoutes(router);
registerBikeRoutes(router);
registerBookingRoutes(router);

// Route kiểm tra trạng thái sức khỏe máy chủ
router.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        service: 'SmartBike Rental Backend API',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Khởi tạo máy chủ HTTP
const server = http.createServer((req, res) => {
    // 1. Cấu hình Headers CORS cho phép gọi từ Frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 2. Tiện ích res.status và res.json
    res.statusCode = 200;
    res.status = function(code) {
        res.statusCode = code;
        return res;
    };
    res.json = function(data) {
        res.writeHead(res.statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data, null, 2));
    };

    // 3. Phân tích URL và Query String
    const parsedUrl = parse(req.url, true);
    const pathname = parsedUrl.pathname;
    req.query = parsedUrl.query || {};

    // 4. Đọc dữ liệu JSON body nếu là POST/PUT
    let bodyData = '';
    req.on('data', chunk => {
        bodyData += chunk.toString();
    });

    req.on('end', () => {
        if (bodyData) {
            try {
                req.body = JSON.parse(bodyData);
            } catch (err) {
                req.body = {};
            }
        } else {
            req.body = {};
        }

        // Tìm route phù hợp
        const match = router.find(req.method, pathname);

        console.log(`📡 [HTTP] ${req.method} ${pathname} -> Status: ${match ? 'Matched' : '404'}`);

        if (match) {
            req.params = match.params;
            try {
                match.handler(req, res);
            } catch (err) {
                console.error('❌ Lỗi xử lý request:', err);
                res.status(500).json({
                    success: false,
                    message: 'Lỗi xử lý nghiệp vụ tại máy chủ!',
                    error: err.message
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: `Endpoint không tồn tại: ${req.method} ${pathname}`
            });
        }
    });
});

// Khởi chạy server và kết nối DB
getDatabase();

server.listen(PORT, () => {
    console.log('================================================================');
    console.log(`🚀 SMARTBIKE BACKEND API ĐANG CHẠY TẠI: http://localhost:${PORT}`);
    console.log(`   - Health check:     http://localhost:${PORT}/api/health`);
    console.log(`   - Danh sách xe:     http://localhost:${PORT}/api/bikes`);
    console.log(`   - Chi nhánh ĐN:     http://localhost:${PORT}/api/branches`);
    console.log(`   - Đơn thuê mẫu:     http://localhost:${PORT}/api/bookings/%23DON-2026-01`);
    console.log('================================================================');
});

export default server;
