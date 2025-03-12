export const skinTypeQuestions = {
  1: {
    title: "Làn da của bạn cảm thấy thế nào sau 30 phút rửa mặt?",
    multiple: false,
    options: [
      { id: "very_tight", label: "Rất căng và khô", points: { dry: 3, normal: 0, oily: 0, combination: 0 } },
      { id: "slightly_tight", label: "Hơi căng", points: { dry: 1, normal: 2, oily: 0, combination: 1 } },
      { id: "comfortable", label: "Thoải mái", points: { dry: 0, normal: 3, oily: 1, combination: 1 } },
      { id: "oily", label: "Dầu nhờn", points: { dry: 0, normal: 0, oily: 3, combination: 2 } }
    ]
  },
  2: {
    title: "Làn da của bạn trông như thế nào vào giữa trưa?",
    multiple: false,
    options: [
      { id: "flaky", label: "Khô và có vảy", points: { dry: 3, normal: 0, oily: 0, combination: 1 } },
      { id: "normal", label: "Bình thường", points: { dry: 0, normal: 3, oily: 0, combination: 1 } },
      { id: "shiny_tzone", label: "Bóng nhờn vùng chữ T", points: { dry: 0, normal: 1, oily: 2, combination: 3 } },
      { id: "very_oily", label: "Rất dầu", points: { dry: 0, normal: 0, oily: 3, combination: 1 } }
    ]
  },
  3: {
    title: "Kích thước lỗ chân lông của bạn thế nào?",
    multiple: false,
    options: [
      { id: "invisible", label: "Hầu như không nhìn thấy", points: { dry: 3, normal: 1, oily: 0, combination: 1 } },
      { id: "small", label: "Nhỏ", points: { dry: 1, normal: 3, oily: 0, combination: 1 } },
      { id: "medium", label: "Trung bình", points: { dry: 0, normal: 1, oily: 2, combination: 2 } },
      { id: "large", label: "Lớn", points: { dry: 0, normal: 0, oily: 3, combination: 2 } }
    ]
  },
  4: {
    title: "Xu hướng da của bạn là gì?",
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
    title: "Da Khô",
    description: "Làn da của bạn thường cảm thấy căng, có thể có vảy và thiếu độ ẩm. Bạn nên sử dụng các sản phẩm dưỡng ẩm đậm đặc và tránh các sản phẩm có chứa cồn.",
    tips: [
      "Sử dụng sữa rửa mặt không chứa sulfate dạng kem",
      "Sử dụng toner không cồn",
      "Thêm serum dưỡng ẩm",
      "Sử dụng kem dưỡng ẩm đậm đặc"
    ]
  },
  normal: {
    title: "Da Thường",
    description: "Làn da của bạn cân bằng tốt, không quá khô cũng không quá nhờn. Tuy nhiên, vẫn cần chăm sóc để duy trì tình trạng này.",
    tips: [
      "Duy trì quy trình chăm sóc da thường xuyên",
      "Sử dụng sản phẩm phù hợp với da",
      "Bảo vệ khỏi tác hại ánh nắng mặt trời",
      "Giữ đủ nước mỗi ngày"
    ]
  },
  oily: {
    title: "Da Dầu",
    description: "Làn da của bạn có xu hướng tiết dầu quá mức, đặc biệt là vào giữa ngày. Tập trung kiểm soát dầu mà không làm khô da quá mức.",
    tips: [
      "Sử dụng sữa rửa mặt dạng gel nhẹ nhàng",
      "Dùng toner không cồn để cân bằng độ pH",
      "Chọn kem dưỡng ẩm dạng gel hoặc dạng sữa",
      "Sử dụng mặt nạ đất sét 1-2 lần/tuần"
    ]
  },
  combination: {
    title: "Da Hỗn Hợp",
    description: "Vùng chữ T (trán, mũi, cằm) của bạn dầu trong khi các khu vực khác có thể khô. Các khu vực khác nhau cần cách chăm sóc khác nhau.",
    tips: [
      "Sử dụng sản phẩm khác nhau cho từng vùng da",
      "Sử dụng toner cân bằng",
      "Thoa kem dưỡng ẩm nhẹ lên vùng chữ T",
      "Dưỡng ẩm nhiều hơn cho vùng má"
    ]
  }
};