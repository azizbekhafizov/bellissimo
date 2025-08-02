import { useEffect, useState } from "react";

export default function SuggestedProducts() {
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    fetch("/api/suggested-meals.json")
      .then((res) => res.json())
      .then((data) => setSuggested(data));
  }, []);

  return (
    <div className="overflow-x-auto flex gap-4 pb-4">
      {suggested.map((product) => (
        <div
          key={product.id}
          className="min-w-[160px] bg-white p-3 rounded-xl shadow text-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-24 mx-auto mb-2 object-cover"
          />
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-gray-500">{product.price} so'm</p>
        </div>
      ))}
    </div>
  );
}
