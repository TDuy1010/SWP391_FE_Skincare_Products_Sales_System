export const questions = {
    1: {
      title: "Loại da của bạn?",
      multiple: false,
      options: [
        { id: 'dry', label: 'Da khô' },
        { id: 'oily', label: 'Da dầu' },
        { id: 'combination', label: 'Da hỗn hợp' },
        { id: 'normal', label: 'Da thường' },
        { id: 'sensitive', label: 'Da nhạy cảm' }
      ]
    },
    2: {
      title: "Vấn đề da bạn đang gặp phải?",
      multiple: true,
      options: [
        { id: 'acne', label: 'Mụn' },
        { id: 'dark_spots', label: 'Thâm nám' },
        { id: 'wrinkles', label: 'Nếp nhăn' },
        { id: 'sensitive', label: 'Da xỉn màu' },
        { id: 'large_pores', label: 'Lỗ chân lông to' }
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
      title: "Bạn muốn một routine như thế nào?",
      options: [
        { id: 'basic', label: 'Cơ bản (3 bước)' },
        { id: 'moderate', label: 'Trung bình (5 bước)' },
        { id: 'advanced', label: 'Nâng cao (7 bước)' }
      ]
    }
  };