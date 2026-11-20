// Dữ liệu hợp đồng, khách thuê và tài khoản thanh toán VietQR
export const MOCK_BOOKING_DATA = {
  orderId: '#DON-2026-01',
  createdDate: '14/11/2026',
  storageMethod: 'Bản sao lưu trữ điện tử Cloud Vault',
  status: 'pending_deposit', // 'pending_deposit' | 'paid' | 'cancelled'
  
  customer: {
    name: 'Trần Văn Sơn Nam',
    phone: '0905123456',
    messengerTag: 'Zalo/Viber',
    cccd: '048204001234',
    cccdType: 'Chip C06',
    license: 'Hạng A1 (Vô thời hạn)',
    hotelAddress: 'Khách sạn Mường Thanh Grand Đà Nẵng (962 Ngô Quyền, Sơn Trà)',
    kycLevel: 'Đã định danh cấp 2',
    isKycVerified: true,
    documents: [
      {
        id: 'doc-front',
        title: 'CCCD Mặt trước',
        verifiedTag: 'VERIFIED AI OCR ✓',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'doc-back',
        title: 'CCCD Mặt sau',
        verifiedTag: 'VERIFIED AI OCR ✓',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'doc-license',
        title: 'GPLX Hạng A1',
        verifiedTag: 'VERIFIED AI OCR ✓',
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },

  rentalSchedule: {
    startDate: '15/11/2026',
    startTime: '08:00',
    endDate: '17/11/2026',
    endTime: '08:00',
    totalDays: 2,
    totalHours: 48,
    pickupLocation: 'Sảnh đến T1 - Sân bay Đà Nẵng'
  },

  paymentBank: {
    bankName: 'MB Bank (Quân Đội)',
    accountNumber: '99051234568',
    accountHolder: 'CONG TY CP SMARTBIKE DANANG',
    transferContent: 'COCDON202601',
    qrBanner: 'MB BANK 24/7',
    approvalTime: 'Tự động duyệt 30s'
  }
};
