"use client";

import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const { t } = useTranslation();
  const { cart, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.idMeal] = 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => {
      const updated = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: updated };
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const qty = quantities[item.idMeal] || 1;
      return total + (item.price || 20000) * qty;
    }, 0);
  };

  return (
    <div className="w-full px-4 py-8 bg-[#f9f9f9] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <ShoppingCart size={28} /> {t("cart")}
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-lg">{t("emptyCart")}</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.idMeal}
                  className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white rounded-2xl shadow-md"
                >
                  <img
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    className="w-full sm:w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="font-semibold text-lg text-gray-800 mb-1">
                      {item.strMeal}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {t("price")}: {(item.price || 20000).toLocaleString()}{" "}
                      so‘m
                    </p>

                    <div className="flex justify-center sm:justify-start items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.idMeal, -1)}
                        className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium text-base">
                        {quantities[item.idMeal] || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.idMeal, 1)}
                        className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <p className="font-semibold text-base text-gray-800">
                      {(
                        (quantities[item.idMeal] || 1) * (item.price || 20000)
                      ).toLocaleString()}{" "}
                      so‘m
                    </p>
                    <button
                      onClick={() => removeFromCart(item.idMeal)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md h-fit sticky top-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {t("totalSummary")}
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between text-base">
                  <span>{t("total")}:</span>
                  <span className="font-semibold">
                    {getTotal().toLocaleString()} so‘m
                  </span>
                </div>
              </div>
              <button className="w-full bg-red-600 text-white py-3 rounded-xl mt-6 hover:bg-red-700 transition text-base font-semibold">
                {t("checkout")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
