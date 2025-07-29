import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (err) {
      return [];
    }
  });

  const [toast, setToast] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);

  // 🔁 LocalStorage ga yozish
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Mahsulotni savatchaga qo‘shish
  const addToCart = (item) => {
    const exists = cart.find((i) => i.idMeal === item.idMeal);
    if (!exists) {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      setToast(`${item.strMeal} qo‘shildi ✅`);
      setCartVisible(true);
    } else {
      setToast(`${item.strMeal} allaqachon qo‘shilgan ❗`);
    }

    setTimeout(() => setToast(null), 3000);
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.idMeal !== id);
    setCart(updated);
  };

  const toggleCart = () => {
    setCartVisible((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cartCount: cart.length,
        cartVisible,
        toggleCart,
        setShowCart: setCartVisible,
        toast,
        setToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
