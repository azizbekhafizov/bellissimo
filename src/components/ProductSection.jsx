"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllMealCategories,
  fetchMealsByCategory,
  fetchMealDetails,
} from "../data/api";
import { useCart } from "../contexts/CartContext";
import { Menu, ShoppingCart } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { RiMenu2Fill } from "react-icons/ri";

const ProductSection = () => {
  const [mode, setMode] = useState("delivery");
  const [categories, setCategories] = useState([]);
  const [mealsByCategory, setMealsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const { cartCount, toast } = useCart();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const cats = await fetchAllMealCategories();
      const validCats = [];
      const mealsData = {};

      for (const cat of cats) {
        try {
          const meals = await fetchMealsByCategory(cat);
          if (!meals || meals.length === 0) continue;

          const detailedMeals = await Promise.all(
            meals.map((m) => fetchMealDetails(m.idMeal))
          );
          const filtered = detailedMeals.filter(Boolean).slice(0, 7);

          if (filtered.length > 0) {
            validCats.push(cat);
            mealsData[cat] = filtered;
          }
        } catch (err) {
          console.error(`Xatolik kategoriya uchun: ${cat}`, err);
        }
      }

      setCategories(validCats);
      setMealsByCategory(mealsData);
      setLoading(false);
    };

    load();
  }, []);

  // 👉 Window width 640 dan katta bo'lsa menyuni avtomatik yopish
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative w-full mx-auto md:w-[85%] lg:w-[80%] 2xl:w-[75%] px-4 py-6">
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <RiMenu2Fill
          size={20}
          className="cursor-pointer block sm:hidden"
          onClick={() => setMenuOpen(true)}
        />

        <div className="flex border justify-between rounded-full overflow-hidden shadow-sm">
          <button
            onClick={() => setMode("delivery")}
            className={`px-3 sm:px-6 py-2 font-semibold transition ${
              mode === "delivery"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Yetkazib berish
          </button>
          <button
            onClick={() => setMode("pickup")}
            className={`px-3 sm:px-6 py-2 font-semibold transition ${
              mode === "pickup"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Olib ketish
          </button>
        </div>

        <div className="relative block sm:hidden">
          <ShoppingCart onClick={() => navigate("/cart")} />
          <p className="absolute top-[-10px] right-[-10px] h-4 w-4 bg-red-500 flex justify-center items-center rounded-full text-white text-[12px]">
            {cartCount}
          </p>
        </div>

        <div className="flex-1 min-w-[220px]">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded flex items-center justify-between">
            <span>
              {mode === "delivery"
                ? "Yetkazib berish manzilini tanlang"
                : "Filialni tanlang"}
            </span>
            <button className="text-red-500">✎</button>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-white py-2">
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 sm:gap-3 lg:gap-4 px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    document
                      .getElementById(cat)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="whitespace-nowrap px-3 py-2 text-sm md:text-base rounded-full bg-gray-100 hover:bg-black hover:text-white transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="shrink-0 pr-2">
            <button
              onClick={() => navigate("/cart")}
              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm md:text-base sm:block hidden whitespace-nowrap"
            >
              Savatcha | {cartCount}
            </button>
          </div>
        </div>
      </div>

      {categories.map((cat) => (
        <section key={cat} id={cat} className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {(mealsByCategory[cat] || []).map((meal) => (
              <div
                key={meal.idMeal}
                onClick={() => navigate(`/product/${meal.idMeal}`)}
                className="w-full max-w-[285px] mx-auto h-[380px] cursor-pointer bg-white rounded-3xl shadow hover:shadow-xl transition-all flex flex-col items-center"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-[190px] rounded-t-3xl object-cover"
                />
                <h3 className="text-lg font-bold mt-4 text-center px-2">
                  {meal.strMeal.length > 20
                    ? meal.strMeal.slice(0, 16) + "..."
                    : meal.strMeal}
                </h3>
                <p className="text-sm text-gray-500 mt-1 text-center px-3 line-clamp-3">
                  {meal.strInstructions
                    ? meal.strInstructions.slice(0, 100) + "..."
                    : "Tavsif mavjud emas."}
                </p>
                <div className="mt-4 text-[15px] font-semibold bg-gray-100 px-5 py-2 rounded-full">
                  {meal.price
                    ? `${meal.price}`
                    : `${(
                        Math.floor(Math.random() * 40000) + 60000
                      ).toLocaleString("uz-UZ")} so‘mdan`}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-in">
          {toast}
        </div>
      )}
    </main>
  );
};

export default ProductSection;
