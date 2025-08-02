import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection";
import ProductDetailsModal from "../components/PizzaDetails";

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div>
      <HeroSection />
      <ProductSection onProductClick={setSelectedProductId} />
      <ProductDetailsModal
        id={selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />
    </div>
  );
}
