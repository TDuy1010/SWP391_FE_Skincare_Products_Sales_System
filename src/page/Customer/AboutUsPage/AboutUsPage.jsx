import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import img1 from '../../../assets/img/hero-photo.png';
import aboutImg2 from '../../../assets/img/product-1.png';
import aboutImg3 from '../../../assets/img/trial-image.png';
import teamImg1 from '../../../assets/img/photo-1573496359142-b8d87734a5a2.png';
import teamImg2 from '../../../assets/img/photo-1580489944761-15a19d654956.png';
import teamImg3 from '../../../assets/img/photo-1541647376583-8934aaf3448a.png';
import labImg from '../../../assets/img/photo-1581093450021-4a7360e9a6b5.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner Full Width */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={img1} 
            alt="Chăm sóc da tự nhiên" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-5xl font-light mb-6">Nghệ Thuật Làm Đẹp Tự Nhiên</h1>
              <p className="text-xl mb-8 leading-relaxed">
                Khám phá sự hòa quyện hoàn hảo giữa thiên nhiên và khoa học trong bộ sưu tập chăm sóc da cao cấp của chúng tôi.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center bg-white text-black px-8 py-4 transition-all hover:bg-opacity-90"
              >
                <span className="mr-4">Khám Phá Sản Phẩm</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span 
              variants={fadeInUp}
              className="uppercase tracking-widest text-gray-500 mb-4"
            >
              Câu Chuyện Của Chúng Tôi
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-light mb-8"
            >
              Được chế tác với đam mê từ năm 2010
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              Hành trình của chúng tôi bắt đầu với một niềm tin đơn giản: chăm sóc da cần phải hiệu quả, tự nhiên và mang lại niềm vui khi sử dụng. Được thành lập vào năm 2010, Skyn Beauty đã phát triển từ một phòng thí nghiệm nhỏ thành một thương hiệu đáng tin cậy trong lĩnh vực chăm sóc da tự nhiên, mà không bao giờ từ bỏ những giá trị cốt lõi.
            </motion.p>
            <motion.p 
              variants={fadeInUp} 
              className="text-gray-600 text-lg leading-relaxed"
            >
              Chúng tôi nghiên cứu tỉ mỉ các thành phần từ thực vật và phòng thí nghiệm để đảm bảo cả sự an toàn và hiệu quả đã được chứng minh. Các công thức của chúng tôi được chế tạo với trọng tâm vào hiệu quả và trải nghiệm cảm giác thư giãn.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="order-2 md:order-1">
              <h3 className="text-2xl font-light mb-6">Triết Lý Của Chúng Tôi</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tại Skyn Beauty, chúng tôi tin rằng vẻ đẹp thực sự đến từ sự cân bằng. Cân bằng giữa thiên nhiên và khoa học. Cân bằng giữa hiệu quả và cảm giác thư giãn. Cân bằng giữa chăm sóc bản thân và chăm sóc hành tinh.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Mỗi sản phẩm chúng tôi tạo ra đều thể hiện triết lý này, tạo ra sản phẩm chăm sóc da mang lại kết quả rõ ràng đồng thời mang lại niềm vui khi sử dụng hàng ngày.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center border border-black px-8 py-4 hover:bg-black hover:text-white transition-all"
              >
                <span className="mr-4">Khám Phá Sản Phẩm</span>
                <FaArrowRight />
              </Link>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="order-1 md:order-2 aspect-square overflow-hidden"
            >
              <img 
                src={aboutImg2} 
                alt="Sản Phẩm Của Chúng Tôi" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeInUp}
              className="uppercase tracking-widest text-gray-500 mb-4 block"
            >
              Giá Trị Của Chúng Tôi
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-light mb-6"
            >
              Những Điều Định Hướng Chúng Tôi
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-gray-600 text-lg"
            >
              Mọi quyết định chúng tôi đưa ra đều được định hướng bởi những giá trị cốt lõi, đảm bảo rằng chúng tôi luôn trung thành với sứ mệnh tạo ra sản phẩm chăm sóc da đặc biệt.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-[#E8E6E1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Thành Phần Tự Nhiên</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi tin vào sức mạnh của thiên nhiên. Các sản phẩm của chúng tôi sử dụng chiết xuất thực vật và các thành phần tự nhiên đã được chứng minh hiệu quả qua nhiều thế kỷ sử dụng và nghiên cứu hiện đại.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-[#E8E6E1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Đổi Mới Khoa Học</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi nâng cao quà tặng của thiên nhiên với khoa học tiên tiến. Đội ngũ phòng thí nghiệm của chúng tôi làm việc không mệt mỏi để tạo ra các công thức mang lại kết quả rõ rệt thông qua công nghệ đổi mới.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-[#E8E6E1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Bền Vững</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi cam kết giảm thiểu tác động đến môi trường. Từ nguồn nguyên liệu có trách nhiệm đến bao bì thân thiện với môi trường, tính bền vững là trọng tâm trong mọi hoạt động của chúng tôi.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lab & Innovation Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div 
              variants={fadeInUp}
              className="aspect-square overflow-hidden"
            >
              <img 
                src={labImg} 
                alt="Phòng Thí Nghiệm Của Chúng Tôi" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <span className="uppercase tracking-widest text-gray-500 mb-4 block">Nghiên Cứu & Đổi Mới</span>
              <h3 className="text-3xl font-light mb-6">Chăm Sóc Da Tự Nhiên Công Nghệ Cao</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Phòng thí nghiệm hiện đại của chúng tôi là nơi khoa học và thiên nhiên kết hợp với nhau. Đội ngũ nhà hóa học mỹ phẩm và nhà thực vật học của chúng tôi làm việc cộng tác để tạo ra các công thức vượt qua giới hạn của chăm sóc da tự nhiên.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Chúng tôi xây dựng các công thức trên những nguyên liệu thô quý giá nhất của thiên nhiên, được tinh chế với công nghệ hiện đại để đảm bảo kết quả tốt nhất cho làn da của bạn. Mỗi sản phẩm đều trải qua quá trình kiểm tra nghiêm ngặt để đảm bảo an toàn, hiệu quả và trải nghiệm cảm giác thư giãn.
              </p>
              {/* <Link 
                to="/shop" 
                className="inline-flex items-center border border-black px-8 py-4 hover:bg-black hover:text-white transition-all"
              >
                <span className="mr-4">Khám Phá Công Nghệ Của Chúng Tôi</span>
                <FaArrowRight />
              </Link> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span variants={fadeInUp} className="block text-3xl font-light italic mb-8">
              "Các công thức của chúng tôi bắt nguồn từ những nguyên liệu thô quý giá nhất của thiên nhiên, được tăng cường với công nghệ hiện đại để đảm bảo kết quả tối ưu cho làn da của bạn."
            </motion.span>
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="w-20 h-1 bg-black"></div>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-6 text-gray-600 uppercase tracking-widest">
              TS. Sarah Chen, Trưởng Phòng Nghiên Cứu & Phát Triển
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="uppercase tracking-widest text-gray-500 mb-4 block">
              Đội Ngũ Của Chúng Tôi
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6">
              Những Gương Mặt Đứng Sau Skyn Beauty
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-gray-600 text-lg">
              Đội ngũ đam mê của chúng tôi kết hợp chuyên môn về thực vật học, da liễu và hóa học mỹ phẩm để tạo ra các sản phẩm mang lại kết quả thực tế.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src={teamImg1} 
                  alt="Thành Viên Đội Ngũ" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Emma Johnson</h3>
              <p className="text-gray-500 mb-4">Nhà Sáng Lập & CEO</p>
              <p className="text-gray-600 max-w-sm mx-auto">
                Với hơn 15 năm trong ngành làm đẹp, tầm nhìn của Emma thúc đẩy cam kết của chúng tôi đối với sản phẩm chăm sóc da đặc biệt.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src={teamImg2} 
                  alt="Thành Viên Đội Ngũ" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">TS. Sarah Chen</h3>
              <p className="text-gray-500 mb-4">Trưởng Phòng Nghiên Cứu</p>
              <p className="text-gray-600 max-w-sm mx-auto">
                Với bằng tiến sĩ Hóa Sinh, Sarah dẫn dắt đội ngũ nghiên cứu của chúng tôi trong việc phát triển các công thức đổi mới.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src={teamImg3} 
                  alt="Thành Viên Đội Ngũ" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Michael Nguyễn</h3>
              <p className="text-gray-500 mb-4">Giám Đốc Phát Triển Bền Vững</p>
              <p className="text-gray-600 max-w-sm mx-auto">
                Michael đảm bảo hoạt động và thành phần của chúng tôi đáp ứng các tiêu chuẩn cao nhất về trách nhiệm môi trường.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: `url(${aboutImg3})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center text-white"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6">
              Trải Nghiệm Sự Khác Biệt
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg mb-8">
              Tham gia cùng hàng ngàn khách hàng hài lòng đã thay đổi làn da của họ với các sản phẩm tự nhiên, được hỗ trợ bởi khoa học của chúng tôi.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link 
                to="/shop" 
                className="inline-flex items-center bg-white text-black px-10 py-4 hover:bg-opacity-90 transition-all"
              >
                <span className="mr-4">Mua Sắm Bộ Sưu Tập</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;