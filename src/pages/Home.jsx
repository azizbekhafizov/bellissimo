import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection";
import ProductDetailsModal from "../components/PizzaDetails";

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div>
      <HeroSection />

      {/* Mahsulotlar qismi: modalni ochish uchun handler yuboramiz */}
      <ProductSection onProductClick={setSelectedProductId} />

      {/* Modal: mahsulotga bosilganda ochiladi */}
      <ProductDetailsModal
        id={selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />
    </div>
  );
}
