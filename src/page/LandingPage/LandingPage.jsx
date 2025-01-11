import { Carousel } from "antd";
import { products } from "./ProductList";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import img1 from "../../assets/img/hero-photo.png";

const LangdingPage = () => {
  return (
    <div className="flex flex-col">
      {/* HeroSection  */}
      <Carousel autoplay>
        <div>
          <h3 className="h-[500px] text-white font-bold text-center bg-black">
            <img
              className="w-full h-full"
              src="https://media.hcdn.vn/hsk/1732069393web.jpg"
            />
          </h3>
        </div>
        <div>
          <h3 className="h-[500px] text-white font-bold text-center bg-black">
            <img
              className="w-full h-full"
              src="https://www.larocheposay.vn/-/media/project/loreal/brand-sites/lrp/apac/vn/simple-page/landing-page/spotscan-plus/entry-points/lrpspotscansitecoredesktopbanner1440x450pxzoe.jpg"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3 className="h-[500px] text-white font-bold text-center bg-black">
            <img
              className="h-full w-full"
              src="https://jda.com.vn/wp-content/uploads/2024/12/J27L-J64-J115-web-copy-1-1400x455.jpg"
              alt=""
            />
          </h3>
        </div>
        {/* <div>
          <h3 className="h-[500px] text-white font-bold text-center bg-black">
            <img src="" alt="" />
          </h3>
        </div> */}
      </Carousel>
      {/* Product's Content  */}
      <div className="flex items-center justify-center p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-8xl">
          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/210803094851-best-skincare-products-over-40-dr-loretta.jpg?q=w_1600,h_902,x_0,y_0,c_fill"
              alt="Skincare product"
              className="rounded-md"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500 uppercase">Skin Care</p>
            <h2 className="text-3xl font-semibold text-gray-800 mt-2">
              Potent Solutions for Demanding Skin
            </h2>
            <p className="text-gray-600 mt-4">
              Discover products tailored for mature skin and urban lifestyles,
              offering daily hydration and the added advantage of powerful
              vitamins and antioxidants.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center text-black hover:opacity-75 transition-opacity"
            >
              <div className="border border-black px-8 py-4 flex items-center justify-between min-w-[180px] mt-4">
                <span className="text-gray-700">Read more</span>
                <FaArrowRight className="ml-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* List Product  */}
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-2">
          Supreme Skin Fortification
        </h1>
        <p className="text-gray-500 mb-6">
          Discover our potent antioxidant-rich Parsley Seed Skin Care, perfect
          for all skin types.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <div className="mt-8">
          <a
            href="/all-products"
            className="text-sm font-medium underline hover:text-black"
          >
            All Products →
          </a>
        </div>
      </div>
          {/* Hero Section  */}
      <div className="relative min-h-[420px] max-h-[480px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://oakessentials.com/cdn/shop/files/mobile-plp-hero-skincare.jpg')", // Thay URL này bằng link hình ảnh của bạn
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative flex flex-col items-start pt-12 max-w-4xl ml-12 mt-4 px-6 text-white">
        <p className="text-sm uppercase tracking-wide mb-4">Revitalize Your Body</p>
        <h1 className="text-4xl font-semibold mb-6">
          Effective Ingredients for Visible Results
        </h1>
        <p className="text-lg mb-8 leading-relaxed">
          Our body products are rich in highly effective ingredients, achieve
          visible results, firm the skin and leave it feeling soft and supple.
          Fine textures that are quickly absorbed, non-greasy and in no way
          inferior to facial care. It's time to give our body the same attention
          as our face.
        </p>
        <button className="bg-transparent border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-black transition">
          Discover More
        </button>
      </div>
    </div>
      {/* About Us Section  */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-2 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl font-light mb-6">Our Story</h1>
            <p className="text-gray-600 mb-6">
              Our line features meticulous skin, face and body care
              formulations, crafted with both efficacy and sensory delight in
              focus.
            </p>
            <p className="text-gray-600 mb-8">
              We are dedicated to creating top-quality skin, face and body care
              products. We extensively research plant-based and lab-made
              ingredients to ensure both safety and proven effectiveness. As our
              distinctive stores, knowledgeable consultants are eager to
              introduce you to the lineup range and assist with your choices.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center text-black hover:opacity-75 transition-opacity"
            >
              <div className="border border-black px-8 py-4 flex items-center justify-between min-w-[300px]">
                <span className="text-gray-700">Our approach to products</span>
                <FaArrowRight className="ml-4" />
              </div>
            </Link>
          </div>
          <div>
            <img
              src={img1}
              alt="Skincare Application"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LangdingPage;
