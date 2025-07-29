// Header.jsx

"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CircleDollarSign, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import halal from "../../public/assets/images/halal.webp";
import uzb from "../../public/assets/images/uzb.svg";
import ru from "../../public/assets/images/rus.svg";
import phone from "../../public/assets/images/phone.svg";
import logo from '../../public/assets/images/logo_new.svg'
const defaultAvatar = "/assets/images/uset.svg";

import LocationSelector from "../components/LocationSelector";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("uz");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    loadUser();

    window.addEventListener("userChanged", loadUser);
    return () => {
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  const handleLanguageChange = (lang) => {
    if (lang === language) return;
    setLoading(true);
    setTimeout(() => {
      setLanguage(lang);
      i18n.changeLanguage(lang);
      setDropdownOpen(false);
      setLoading(false);
    }, 1000);
  };

  const currentFlag = language === "uz" ? uzb : ru;
  const currentLabel = language === "uz" ? "Uz" : "Ru";

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
          <div className="text-xl font-semibold text-[#007C5B] animate-pulse">
            Loading...
          </div>
        </div>
      )}

      <header className="w-full mx-auto md:w-[90%] lg:w-[80%] 2xl:w-[75%] bg-white border-b border-[#f4f4f4] font-sans relative z-30">
        {/* Top Bar */}
        <div className="hidden sm:flex justify-between items-center px-6 pt-4 text-[18px] font-medium">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#006f4c] font-extrabold">
              <img src={phone} alt="Phone" className="w-[24px] h-[24px]" />
              1174
            </div>
            <a href="#" className="text-[#828282] hover:text-black transition">
              {t("about_us")}
            </a>
            <a href="#" className="text-[#828282] hover:text-black transition">
              {t("vacancies")}
            </a>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5"
            >
              <img
                src={currentFlag}
                alt={currentLabel}
                className="w-[25px] h-[25px]"
              />
              {currentLabel}
              <ChevronDown size={14} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-[160px] bg-white border rounded shadow z-10">
                <button
                  onClick={() => handleLanguageChange("uz")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                >
                  <img src={uzb} className="w-[20px] h-[20px]" alt="Uzbek" />
                  O'zbek tili
                </button>
                <button
                  onClick={() => handleLanguageChange("ru")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                >
                  <img src={ru} className="w-[20px] h-[20px]" alt="Russian" />
                  Русский язык
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between sm:px-6 sm:pt-8">
            <a className="decoration-0" href="/"><img className="hidden sm:block" src={logo} alt="" /></a>
          {/* Location & Delivery Info */}
          <div className="hidden sm:flex items-center gap-6">
            <LocationSelector />
            <div className="hidden lg:flex items-center">
              <div className="w-[44px] h-[44px] bg-[#F4F4F4] rounded-[10px] flex items-center justify-center text-[#222] text-[15px] font-normal">
                24/7
              </div>
              <div className="ml-2 text-[11px] text-[#828282] leading-tight">
                <div>{t("free_delivery")}</div>
                <div>{t("available_now")}</div>
              </div>
            </div>
          </div>

          {/* Logo, Bonus, User */}
          <div className="w-full sm:w-max flex items-center justify-between gap-6">
            <img
              src={halal}
              alt="halal"
              className="hidden md:block w-[50px] h-[50px] object-contain"
            />

            <ul className="p-2 bg-[#007C5B] sm:bg-white flex justify-between sm:justify-center gap-3 w-full">
              <div className="flex items-center gap-1 pl-5">
                <CircleDollarSign className="text-[#FFBE00] w-[32px] h-[32px]" />
                <p className="text-white sm:text-black font-semibold text-[20px]">
                  0
                </p>
              </div>
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="px-7 py-2 rounded-full bg-white sm:bg-[#007C5B] hover:bg-[#006047] text-black sm:text-white text-[16px] font-semibold transition"
                >
                  {t("login")}
                </button>
              ) : (
                <div
                  onClick={() => navigate("/profile")} // ✅ shu yerda to'g'rilandi
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={user.image || defaultAvatar}
                    alt="user"
                    className="w-[36px] h-[36px] rounded-full border border-green-600 object-cover"
                  />
                  <span className="text-black sm:text-[#007C5B] font-semibold text-[16px]">
                    {user.name}
                  </span>
                </div>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
