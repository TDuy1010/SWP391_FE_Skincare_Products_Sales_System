import React, { useState } from "react";
import { Minus, Plus, Heart, ChevronDown } from "lucide-react";
import imgProduct from "../../assets/Rectangle 3.png";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(imgProduct);
  const [openSection, setOpenSection] = useState(null);
  const thumbnailImages = [imgProduct, imgProduct, imgProduct, imgProduct];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="relative">
        <div className="w-full min-h-80 max-h-80 flex items-center justify-center overflow-hidden">
          {mainImage ? (
            <img
              src={mainImage}
              alt="Acne Treatment Mask"
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-gray-500">No Image Available</span>
          )}
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {thumbnailImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 cursor-pointer border hover:border-gray-500"
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>

        {/* Overview Section */}
        <div className="mt-4 border-t pt-2">
          {[
            "Product Overview",
            "How To Use",
            "Add To Glance",
            "Ingredients",
            "Other Details",
          ].map((section, index) => (
            <div key={index} className="border-b py-2">
              <button
                className="w-full flex justify-between items-center text-left font-semibold py-1"
                onClick={() => toggleSection(section)}
              >
                {section}
                <ChevronDown size={16} />
              </button>
              {openSection === section && (
                <p className="text-gray-600 text-sm mt-1">
                  Details about {section}.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div>
        <h1 className="text-4xl font-semibold">Lorem Ipsum Dolor</h1>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-gray-500 line-through text-lg">Rs. 275</span>
          <span className="text-red-600 text-2xl font-bold">Rs. 262</span>
        </div>
        <p className="mt-2 text-gray-600">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
        </p>
        <div className="text-md text-gray-500 mt-2">Vendor: Skin White</div>
        <div className="text-md text-gray-500">SKU: 8964002548705</div>
        <div className="text-md text-green-600 mt-1">
          Availability: In Stock
        </div>
        <div className="text-md text-gray-500">Tags: </div>
        <div className="text-md text-gray-500">Size: </div>

        {/* Quantity and Cart */}
        <div className="border-t pt-6">
          <div className="flex flex-col space-y-2 max-w-96">
            <div className="flex items-center space-x-4 w-full">
              <div className="flex items-center border px-4 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={16} />
                </button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button className="bg-red-500 text-white px-6 py-2 flex-1">
                ADD TO CART
              </button>
              <button className="p-2 border">
                <Heart size={20} />
              </button>
            </div>
            <div className="w-full">
              <button className="bg-red-500 text-white px-6 py-2 w-full">
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>

        {/* Delivery & Returns */}
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold">Delivery & Returns</h3>
          <p className="text-gray-600 text-md mt-1">
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
