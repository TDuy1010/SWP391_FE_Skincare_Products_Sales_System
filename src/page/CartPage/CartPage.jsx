import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import img1 from '../../assets/img/product-1.png';

const CartPage = () => {
  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 1
  });

  const cartItems = [
    {
      id: 'item1',
      name: 'Reverence Aromatique Hand Balm',
      volume: '75 ml',
      price: 25,
      image: img1
    },
    {
      id: 'item2',
      name: 'Classic Skin Care Kit',
      volume: '300 ml',
      price: 85,
      image: img1
    }
  ];

  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * quantities[item.id]);
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-normal text-center mb-4">Cart</h1>
      
      <p className="text-center text-gray-600 text-sm mb-12">
        Purchase one more item of the sale products and receive<br />
        free shipping! *Automatically applied on the next page
      </p>

      {/* Cart Table */}
      <div className="mb-8">
        <div className="grid grid-cols-4 border-b pb-4 mb-4">
          <div className="text-sm text-gray-600">CART</div>
          <div className="text-sm text-gray-600">PRICE</div>
          <div className="text-sm text-gray-600">QUANTITY</div>
          <div className="text-sm text-gray-600 text-right">SUB-TOTAL</div>
        </div>

        {cartItems.map((item) => (
          <div key={item.id} className="grid grid-cols-4 items-center py-4 border-b">
            <div className="flex items-center gap-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.volume}</p>
              </div>
            </div>
            <div className="text-sm">${item.price}</div>
            <div className="relative w-24">
              <div className="border flex items-center justify-between px-3 py-2 cursor-pointer">
                <span>{quantities[item.id]}</span>
                <IoIosArrowDown />
              </div>
            </div>
            <div className="text-right">${item.price * quantities[item.id]}</div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="flex flex-col items-end gap-4">
        <div className="flex justify-between w-full max-w-xs">
          <span className="text-lg">Total</span>
          <span className="text-lg">${calculateSubTotal()}</span>
        </div>
        <p className="text-sm text-gray-500">
          Shipping Fee will be calculated at the time of purchase
        </p>
        <button className="bg-gray-900 text-white px-8 py-3 w-full max-w-xs hover:bg-gray-500 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;