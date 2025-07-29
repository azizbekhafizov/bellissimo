import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchAllMealCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/categories.php`);
    const all = res.data.categories.map(c => c.strCategory);
    return all.slice(0, 7);
  } catch (err) {
    console.error("Kategoriya yuklashda xatolik:", err);
    return [];
  }
};

export const fetchMealsByCategory = async (category) => {
  try {
    const res = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
    return (res.data.meals || []).slice(0, 6);
  } catch (err) {
    console.error(`Taomlar yuklashda xatolik (${category}):`, err);
    return [];
  }
};

  export const fetchMealDetails = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
      return res.data.meals?.[0] || null;
    } catch (err) {
      console.error(`Taom detali yuklashda xatolik (${id}):`, err);
      return null;
    }
  };
