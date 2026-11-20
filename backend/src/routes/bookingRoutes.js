// backend/src/routes/bookingRoutes.js
// Định tuyến API đơn đặt thuê xe máy, eKYC và thanh toán VietQR
import { bookingController } from '../controllers/bookingController.js';

export function registerBookingRoutes(router) {
    router.post('/api/bookings', bookingController.createBooking);
    router.get('/api/bookings/:id', bookingController.getBookingById);
    router.post('/api/bookings/verify-ekyc', bookingController.verifyEkyc);
    router.post('/api/payments/vietqr/confirm', bookingController.confirmVietQrPayment);
}
