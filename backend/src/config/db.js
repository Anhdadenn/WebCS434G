// backend/src/config/db.js
// Quản lý kết nối cơ sở dữ liệu SQLite cho hệ thống SmartBike Rental
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../../../database/smartbike.db');

let dbInstance = null;

export function getDatabase() {
    if (!dbInstance) {
        dbInstance = new DatabaseSync(dbPath);
        // Bật hỗ trợ Foreign Key ràng buộc toàn vẹn
        dbInstance.exec('PRAGMA foreign_keys = ON;');
        console.log('📦 [Database] Đã kết nối thành công tới SQLite DB:', dbPath);
    }
    return dbInstance;
}

export function closeDatabase() {
    if (dbInstance) {
        dbInstance.close();
        dbInstance = null;
        console.log('📦 [Database] Đã ngắt kết nối SQLite DB.');
    }
}
