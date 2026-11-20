// backend/src/controllers/bikeController.js
// Quản lý danh mục đội xe máy & Chi nhánh tại Đà Nẵng
import { getDatabase } from '../config/db.js';

export const bikeController = {
    // Lấy danh sách xe kèm bộ lọc
    getAllBikes: (req, res) => {
        try {
            const db = getDatabase();
            const { category, branch, status } = req.query || {};

            let query = `
                SELECT 
                    x.maXe, x.tenXe, x.loaiXe, x.bienSoXe, x.giaThueNgay, x.trangThai,
                    x.dungTichXiLanh, x.mucTieuHaoXang, x.hinhAnhUrl,
                    c.maChiNhanh, c.tenChiNhanh, c.diaChi AS diaChiChiNhanh
                FROM XeMay x
                JOIN ChiNhanh c ON x.maChiNhanh = c.maChiNhanh
                WHERE 1=1
            `;
            const params = [];

            if (category && category !== 'all') {
                const catMap = {
                    'xe-ga': 'Xe ga',
                    'xe-so': 'Xe số',
                    'xe-con-tay': 'Xe côn tay'
                };
                const mapped = catMap[category] || category;
                query += ` AND x.loaiXe = ?`;
                params.push(mapped);
            }

            if (branch && branch !== 'all') {
                query += ` AND x.maChiNhanh = ?`;
                params.push(branch);
            }

            if (status) {
                query += ` AND x.trangThai = ?`;
                params.push(status);
            }

            query += ` ORDER BY x.maXe ASC`;

            const bikes = db.prepare(query).all(...params);

            // Thống kê theo phân loại
            const stats = db.prepare(`
                SELECT 
                    COUNT(*) AS total,
                    SUM(CASE WHEN loaiXe = 'Xe ga' THEN 1 ELSE 0 END) AS xeGa,
                    SUM(CASE WHEN loaiXe = 'Xe số' THEN 1 ELSE 0 END) AS xeSo,
                    SUM(CASE WHEN loaiXe = 'Xe côn tay' THEN 1 ELSE 0 END) AS xeConTay,
                    SUM(CASE WHEN trangThai = 'Trống' THEN 1 ELSE 0 END) AS xeTrong
                FROM XeMay
            `).get();

            return res.status(200).json({
                success: true,
                count: bikes.length,
                stats,
                data: bikes
            });
        } catch (error) {
            console.error('❌ Lỗi tại bikeController.getAllBikes:', error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi truy vấn danh mục xe máy!',
                error: error.message
            });
        }
    },

    // Lấy chi tiết 1 xe theo maXe
    getBikeById: (req, res) => {
        try {
            const { id } = req.params;
            const db = getDatabase();
            const bike = db.prepare(`
                SELECT 
                    x.*, c.tenChiNhanh, c.diaChi AS diaChiChiNhanh, c.soDienThoai AS hotlineChiNhanh
                FROM XeMay x
                JOIN ChiNhanh c ON x.maChiNhanh = c.maChiNhanh
                WHERE x.maXe = ?
            `).get(id);

            if (!bike) {
                return res.status(404).json({
                    success: false,
                    message: `Không tìm thấy xe với mã: ${id}`
                });
            }

            return res.status(200).json({
                success: true,
                data: bike
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Lấy danh sách 4 chi nhánh Đà Nẵng
    getAllBranches: (req, res) => {
        try {
            const db = getDatabase();
            const branches = db.prepare(`
                SELECT 
                    c.*,
                    COUNT(x.maXe) AS tongSoXe,
                    SUM(CASE WHEN x.trangThai = 'Trống' THEN 1 ELSE 0 END) AS soXeTrong
                FROM ChiNhanh c
                LEFT JOIN XeMay x ON c.maChiNhanh = x.maChiNhanh
                GROUP BY c.maChiNhanh
                ORDER BY c.maChiNhanh ASC
            `).all();

            return res.status(200).json({
                success: true,
                count: branches.length,
                data: branches
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};
