export const skinTypeQuestions = {
  1: {
    title: "Sau khi rửa mặt 30 phút, da bạn cảm thấy thế nào?",
    multiple: false,
    options: [
      { id: "very_tight", label: "Rất căng và khô", points: { dry: 3, normal: 0, oily: 0, combination: 0 } },
      { id: "slightly_tight", label: "Hơi căng", points: { dry: 1, normal: 2, oily: 0, combination: 1 } },
      { id: "comfortable", label: "Thoải mái", points: { dry: 0, normal: 3, oily: 1, combination: 1 } },
      { id: "oily", label: "Bóng dầu", points: { dry: 0, normal: 0, oily: 3, combination: 2 } }
    ]
  },
  2: {
    title: "Vào giữa ngày, da bạn như thế nào?",
    multiple: false,
    options: [
      { id: "flaky", label: "Khô và bong tróc", points: { dry: 3, normal: 0, oily: 0, combination: 1 } },
      { id: "normal", label: "Bình thường", points: { dry: 0, normal: 3, oily: 0, combination: 1 } },
      { id: "shiny_tzone", label: "Bóng dầu vùng chữ T", points: { dry: 0, normal: 1, oily: 2, combination: 3 } },
      { id: "very_oily", label: "Rất bóng dầu", points: { dry: 0, normal: 0, oily: 3, combination: 1 } }
    ]
  },
  3: {
    title: "Kích thước lỗ chân lông của bạn?",
    multiple: false,
    options: [
      { id: "invisible", label: "Khó nhìn thấy", points: { dry: 3, normal: 1, oily: 0, combination: 1 } },
      { id: "small", label: "Nhỏ", points: { dry: 1, normal: 3, oily: 0, combination: 1 } },
      { id: "medium", label: "Trung bình", points: { dry: 0, normal: 1, oily: 2, combination: 2 } },
      { id: "large", label: "To", points: { dry: 0, normal: 0, oily: 3, combination: 2 } }
    ]
  },
  4: {
    title: "Da bạn có xu hướng?",
    multiple: false,
    options: [
      { id: "sensitive", label: "Dễ kích ứng, đỏ", points: { dry: 2, normal: 1, oily: 0, combination: 1 } },
      { id: "normal", label: "Bình thường", points: { dry: 0, normal: 3, oily: 0, combination: 1 } },
      { id: "acne", label: "Dễ nổi mụn", points: { dry: 0, normal: 0, oily: 3, combination: 2 } },
      { id: "combination", label: "Hỗn hợp", points: { dry: 1, normal: 1, oily: 1, combination: 3 } }
    ]
  }
};

export const skinTypeDescriptions = {
  dry: {
    title: "Da khô",
    description: "Da của bạn thường xuyên cảm thấy căng, có thể bong tróc và thiếu độ ẩm. Bạn nên sử dụng các sản phẩm dưỡng ẩm đậm đặc và tránh các sản phẩm chứa cồn.",
    tips: [
      "Sử dụng sữa rửa mặt dạng kem không chứa sulfate",
      "Dùng toner không cồn",
      "Thêm serum dưỡng ẩm",
      "Dùng kem dưỡng giàu độ ẩm"
    ]
  },
  normal: {
    title: "Da thường",
    description: "Da của bạn khá cân bằng, không quá khô cũng không quá nhờn. Tuy nhiên vẫn cần chăm sóc để duy trì trạng thái này.",
    tips: [
      "Duy trì routine chăm sóc da đều đặn",
      "Sử dụng sản phẩm phù hợp với da",
      "Bảo vệ da khỏi ánh nắng mặt trời",
      "Uống đủ nước mỗi ngày"
    ]
  },
  oily: {
    title: "Da dầu",
    description: "Da của bạn có xu hướng tiết nhiều dầu, đặc biệt là vào giữa ngày. Cần chú ý kiểm soát dầu nhưng không làm khô da.",
    tips: [
      "Sử dụng sữa rửa mặt dạng gel nhẹ nhàng",
      "Dùng toner không cồn để cân bằng độ pH",
      "Chọn kem dưỡng dạng gel hoặc lotion",
      "Đắp mặt nạ đất sét 1-2 lần/tuần"
    ]
  },
  combination: {
    title: "Da hỗn hợp",
    description: "Da của bạn có vùng chữ T (trán, mũi, cằm) tiết dầu trong khi các vùng khác có thể khô. Cần có cách chăm sóc riêng cho từng vùng.",
    tips: [
      "Sử dụng sản phẩm khác nhau cho các vùng da khác nhau",
      "Dùng toner cân bằng độ ẩm",
      "Thoa kem dưỡng mỏng nhẹ vùng chữ T",
      "Dưỡng ẩm nhiều hơn ở vùng má"
    ]
  }
}; 