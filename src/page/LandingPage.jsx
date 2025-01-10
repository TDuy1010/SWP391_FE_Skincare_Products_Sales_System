import React from "react";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";
import { Carousel } from "antd";
import imgProduct from '../assets/product-ex.jpg';

const LangdingPage = () => {
  return (
    <div className="flex flex-col">
      <HeaderComponent />
      {/* HeroSection  */}
      <Carousel autoplay>
        <div>
          <h3 className="h-[500px] text-white font-bold text-center bg-black">
            Test
          </h3>
        </div>
        <div>
          <h3 className="h-[500px] text-white font-bold text-center bg-black">
            Test
          </h3>
        </div>
        <div>
          <h3 className="h-[500px] text-white font-bold text-center bg-black">
            Test
          </h3>
        </div>
        <div>
          <h3 className="h-[500px] text-white font-bold text-center bg-black">
            Test
          </h3>
        </div>
      </Carousel>
      {/* Product's Content  */}
      <div className="flex items-center justify-center bg-gray-50 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl">
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
            <button className="mt-6 flex items-center gap-2 text-black font-medium bg-transparent border-2 outline-1 border-gray-200  hover:border-gray-400 transition max-w-[140px] px-2">
              <span>Read More</span>
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
      {/* List Product  */}
      <div>
      <p>Parsley Seed Skin Care</p>
      <h2>Supreme Skin Fortification</h2>
      <p>Discover our potent antioxidiant-rich Parsley Seed Skin Care, perfect for all skin types.</p>
      <div className="flex justify-center m-4">
      <div className="grid grid-cols-4 gap-4 max-w-7xl">
        <div className="cursor-pointer hover:bg-black">
        <img
              src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1721749856-1721299452-allies-of-skin-peptides-firming-daily-treatment-6698f1b735c1e.png?crop=0.625xw:0.785xh;0.191xw,0.215xh&resize=980:*"
              alt="Skincare product"
            />
        </div>
        <div className="cursor-pointer hover:bg-black">
        <img
              src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1721749856-1721299452-allies-of-skin-peptides-firming-daily-treatment-6698f1b735c1e.png?crop=0.625xw:0.785xh;0.191xw,0.215xh&resize=980:*"
              alt="Skincare product"
            />
        </div>
        <div className="cursor-pointer hover:bg-stone-200">
        <img
              src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1721749856-1721299452-allies-of-skin-peptides-firming-daily-treatment-6698f1b735c1e.png?crop=0.625xw:0.785xh;0.191xw,0.215xh&resize=980:*"
              alt="Skincare product"
              className="w-full"
            />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ullam totam at quisquam aliquam quo, excepturi nisi sequi doloribus iure voluptatum nam commodi facere assumenda placeat consequuntur ab explicabo tempore.</p>
        </div>
        <div className="cursor-pointer hover:bg-black">
        <img
              src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1721749856-1721299452-allies-of-skin-peptides-firming-daily-treatment-6698f1b735c1e.png?crop=0.625xw:0.785xh;0.191xw,0.215xh&resize=980:*"
              alt="Skincare product"
            />
        </div>
      </div>
      </div>
      </div>
      {/* Footer  */}
      <FooterComponent />
    </div>
  );
};

export default LangdingPage;