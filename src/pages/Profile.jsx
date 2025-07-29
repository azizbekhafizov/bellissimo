// src/pages/Profile.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("info");
  const navigate = useNavigate();

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    console.log("User data:", parsedUser); // 👈 shu yerda tekshir
    setUser(parsedUser);
  } else {
    navigate("/login");
  }
}, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  if (!user) return null;

  const userName = user.name || "Foydalanuvchi";
  const userPhone = user.phone || "998xxxxxxxxx";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Profil</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Chap panel */}
        <div className="md:w-1/3 w-full bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[50px] h-[50px] rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xl font-semibold">
              {userName[0].toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-lg">{userName}</p>
              <p className="text-gray-500 text-sm">{userPhone}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setActiveSection("info")}
              className={`w-full text-left py-3 px-4 rounded-lg text-sm font-medium ${
                activeSection === "info"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Shaxsiy ma'lumotlar
            </button>
            <button
              onClick={() => setActiveSection("address")}
              className={`w-full text-left py-3 px-4 rounded-lg text-sm font-medium ${
                activeSection === "address"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Mening manzilim
            </button>
            <button
              onClick={() => setActiveSection("orders")}
              className={`w-full text-left py-3 px-4 rounded-lg text-sm font-medium ${
                activeSection === "orders"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Mening buyurtmalarim
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-100 py-3 px-4 rounded-lg text-sm font-medium text-red-600 hover:bg-red-200"
            >
              Chiqish
            </button>
          </div>
        </div>

        {/* O‘ng panel - kontent */}
        <div className="md:w-2/3 w-full bg-white p-6 rounded-xl shadow-md border border-gray-200">
          {activeSection === "info" && (
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Shaxsiy ma'lumotlar
              </h2>
              <div className="space-y-4">
                <p>
                  <span className="font-medium">Ism:</span> {userName}
                </p>
                <p>
                  <span className="font-medium">Telefon:</span> {userPhone}
                </p>
              </div>
            </div>
          )}

          {activeSection === "address" && (
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Mening manzilim
              </h2>
              <p className="text-sm text-gray-500 italic">
                Hozircha manzil ma'lumotlari mavjud emas.
              </p>
            </div>
          )}

          {activeSection === "orders" && (
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Buyurtmalar tarixi
              </h2>
              <p className="text-sm text-gray-500 italic">
                Siz hali hech qanday buyurtma bermagansiz.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
