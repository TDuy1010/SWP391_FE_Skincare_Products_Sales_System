import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getCart } from "../../../service/cart/cart";

const Total = ({ buttonText, onNext }) => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await getCart();
      if (!response.error) {
        setCartData(response.result);
      }
    };
    fetchCartData();
  }, []);

  const handleNext = () => {
    if (cartData) {
      onNext(cartData.cartId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-lg font-bold mb-4 text-[#17183B]">Subtotal</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <p>Total Amount</p>
          <p>
            {cartData
              ? `${cartData.totalPrice.toLocaleString("vi-VN")}đ`
              : "Loading..."}
          </p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Discount</p>
          <p>0đ</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Promo Code Used</p>
          <p>0đ</p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-semibold text-[#17183B]">
        <p>Total</p>
        <p>
          {cartData
            ? `${cartData.totalPrice.toLocaleString("vi-VN")}đ`
            : "Loading..."}
        </p>
      </div>
      <p className="text-sm text-gray-500 mt-2 flex justify-between">
        Estimated delivery date{" "}
        <span className="font-semibold">February 01, 2025</span>
      </p>
      <div className="mt-4">
        <button
          className="w-full font-semibold bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-500"
          onClick={handleNext}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

Total.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Total;
