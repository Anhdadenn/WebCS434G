// backend/src/routes/authRoutes.js
// Định tuyến API xác thực người dùng
import { authController } from '../controllers/authController.js';

export function registerAuthRoutes(router) {
    router.post('/api/auth/login', authController.login);
    router.get('/api/auth/profile', authController.getProfile);
}
