import { createContext, useContext, useState } from 'react';
import { getCart } from '../service/cart/cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartItemCount = (items) => {
    // Tính tổng số lượng từ tất cả các sản phẩm
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalQuantity);
  };

  const refreshCart = async () => {
    try {
      const response = await getCart();
      if (!response.error && response.result) {
        updateCartItemCount(response.result.items);
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItemCount, updateCartItemCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
}; 