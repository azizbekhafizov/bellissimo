import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMealDetails } from "../data/api";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// Lucide iconlar
import {
  ArrowLeft,
  ShoppingCart,
  Undo2,
  CircleDollarSign,
  MapPin,
  Tag,
} from "lucide-react";

export default function ProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const { addToCart, setShowCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchMealDetails(id).then(setMeal);
    }
  }, [id]);

  if (!meal) return null;

  const handleAddToCart = () => {
    addToCart(meal);
    toast.success(t("addedToCart", { meal: meal.strMeal }));
    setShowCart(true);
    navigate("/");
  };

  const price = Math.floor(25000 + Math.random() * 35000);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-red-600 hover:text-red-700 hover:underline transition text-sm"
      >
        <ArrowLeft size={18} /> {t("back")}
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Chap - Rasm */}
        <div className="w-full md:w-[400px]">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-[300px] object-cover rounded-2xl shadow-md"
          />

          {/* Mobil uchun rasm ostidagi info */}
          <div className="md:hidden mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-green-600" />
              <span>
                <strong>{t("category")}:</strong> {meal.strCategory}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-600" />
              <span>
                <strong>{t("origin")}:</strong> {meal.strArea}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CircleDollarSign size={16} className="text-green-600" />
              <span>
                <strong>{t("price")}:</strong>{" "}
                {price.toLocaleString()} so‘m
              </span>
            </div>
          </div>
        </div>

        {/* O‘ng - Info */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {meal.strMeal}
          </h1>

          {/* Katta ekran uchun info */}
          <div className="hidden md:flex gap-8 text-sm text-gray-700 mb-4">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-green-600" />
              <span>{meal.strCategory}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-green-600" />
              <span>{meal.strArea}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleDollarSign size={18} className="text-green-600" />
              <span>{price.toLocaleString()} so‘m</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
            {meal.strInstructions
              ? meal.strInstructions.slice(0, 500) + "..."
              : t("noInstructions")}
          </p>

          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            🧂 {t("ingredients")}:
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
            {Array.from({ length: 20 }).map((_, i) => {
              const ing = meal[`strIngredient${i + 1}`];
              const measure = meal[`strMeasure${i + 1}`];
              return ing && ing.trim() ? (
                <li key={i}>
                  <span className="font-medium">{ing}</span> – {measure}
                </li>
              ) : null;
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition text-sm md:text-base font-semibold"
            >
              <ShoppingCart size={18} /> {t("addToCart")}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100 transition text-sm md:text-base font-semibold"
            >
              <Undo2 size={18} /> {t("back")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
