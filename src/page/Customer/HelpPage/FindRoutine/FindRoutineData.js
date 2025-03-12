export const questions = {
  1: {
    title: "Loại da của bạn là gì?",
    multiple: false,
    options: [
      { id: 'dry', label: 'Da Khô' },
      { id: 'oily', label: 'Da Dầu' },
      { id: 'combination', label: 'Da Hỗn Hợp' },
      { id: 'normal', label: 'Da Thường' },
      { id: 'sensitive', label: 'Da Nhạy Cảm' }
    ]
  },
  2: {
    title: "Bạn có những vấn đề da nào?",
    multiple: true,
    options: [
      { id: 'acne', label: 'Mụn' },
      { id: 'dark_spots', label: 'Đốm Sậm Màu' },
      { id: 'wrinkles', label: 'Nếp Nhăn' },
      { id: 'sensitive', label: 'Da Xỉn Màu' },
      { id: 'large_pores', label: 'Lỗ Chân Lông To' }
    ]
  },
  3: {
    title: "Độ tuổi của bạn?",
    options: [
      { id: 'under20', label: 'Dưới 20' },
      { id: '20-25', label: '20-25' },
      { id: '26-30', label: '26-30' },
      { id: '31-40', label: '31-40' },
      { id: 'over40', label: 'Trên 40' }
    ]
  },
  4: {
    title: "Bạn thích quy trình chăm sóc da kiểu nào?",
    options: [
      { id: 'basic', label: 'Cơ bản (3 bước)' },
      { id: 'moderate', label: 'Trung bình (5 bước)' },
      { id: 'advanced', label: 'Nâng cao (7 bước)' }
    ]
  }
};

export const routineSteps = {
basic: [
  { step: 1, name: 'Sữa Rửa Mặt', description: 'Làm sạch da của bạn', product: 'Sữa rửa mặt dạng gel hoặc sữa nhẹ nhàng' },
  { step: 2, name: 'Kem Dưỡng Ẩm', description: 'Cung cấp độ ẩm cho da', product: 'Kem dưỡng ẩm phù hợp với loại da' },
  { step: 3, name: 'Kem Chống Nắng', description: 'Bảo vệ khỏi tác hại ánh nắng', product: 'Kem chống nắng SPF 30 trở lên' }
],
moderate: [
  { step: 1, name: 'Sữa Rửa Mặt', description: 'Làm sạch da của bạn', product: 'Sữa rửa mặt phù hợp với loại da' },
  { step: 2, name: 'Toner', description: 'Cân bằng độ pH', product: 'Toner không cồn hoặc toner cấp ẩm' },
  { step: 3, name: 'Serum', description: 'Điều trị các vấn đề da', product: 'Serum mục tiêu như vitamin C, niacinamide hoặc hyaluronic acid' },
  { step: 4, name: 'Kem Dưỡng Ẩm', description: 'Cung cấp độ ẩm cho da', product: 'Kem dưỡng ẩm phù hợp với loại da' },
  { step: 5, name: 'Kem Chống Nắng', description: 'Bảo vệ khỏi tác hại ánh nắng', product: 'Kem chống nắng SPF 30 trở lên, dùng lại mỗi 2 giờ' }
],
advanced: [
  { step: 1, name: 'Tẩy Trang', description: 'Loại bỏ trang điểm và bụi bẩn', product: 'Dầu tẩy trang hoặc nước tẩy trang hai lớp' },
  { step: 2, name: 'Sữa Rửa Mặt', description: 'Làm sạch da của bạn', product: 'Sữa rửa mặt phù hợp với loại da' },
  { step: 3, name: 'Toner', description: 'Cân bằng độ pH', product: 'Toner không cồn hoặc toner cấp ẩm' },
  { step: 4, name: 'Tinh Chất Dưỡng', description: 'Cấp ẩm và phục hồi', product: 'Tinh chất dưỡng giàu dưỡng chất' },
  { step: 5, name: 'Serum', description: 'Điều trị các vấn đề da', product: 'Serum mục tiêu cho các vấn đề cụ thể' },
  { step: 6, name: 'Kem Dưỡng Ẩm', description: 'Cung cấp độ ẩm cho da', product: 'Kem dưỡng ẩm phù hợp với loại da' },
  { step: 7, name: 'Kem Chống Nắng', description: 'Bảo vệ khỏi tác hại ánh nắng', product: 'Kem chống nắng SPF 50 với cả UVA và UVB' }
]
};