// backend/src/routes/bikeRoutes.js
// Định tuyến API danh mục xe máy & Chi nhánh Đà Nẵng
import { bikeController } from '../controllers/bikeController.js';

export function registerBikeRoutes(router) {
    router.get('/api/bikes', bikeController.getAllBikes);
    router.get('/api/bikes/:id', bikeController.getBikeById);
    router.get('/api/branches', bikeController.getAllBranches);
}
