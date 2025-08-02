"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  ClipboardList,
  Pizza,
  ChevronDown,
  X,
  LogIn,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const regions = [
  "tashkent",
  "andijan",
  "fargona",
  "namangan",
  "samarkand",
  "bukhara",
  "navoiy",
  "xorazm",
  "qashqadaryo",
  "surxondaryo",
  "jizzax",
  "sirdaryo",
];

const MobileMenu = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "uz");
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("tashkent");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLangChange = (lang) => {
    if (lang === language) return;
    setLoading(true);
    setTimeout(() => {
      i18n.changeLanguage(lang);
      setLanguage(lang);
      setLoading(false);
    }, 1000);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <div className="text-xl font-semibold text-[#007C5B] animate-pulse">
            Loading...
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed top-0 left-0 w-[320px] h-full bg-white z-50 p-5 rounded-tr-2xl rounded-br-2xl shadow-xl flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-4 right-[-45px] text-gray-500 bg-white rounded-full w-[36px] h-[36px] flex justify-center items-center"
        >
          <X size={22} />
        </button>

        <div>
          <div className="mb-5 relative">
            <button
              onClick={toggleDropdown}
              className="w-full flex items-center justify-between px-4 py-3 rounded-full border border-gray-200 shadow-sm text-left font-medium text-[16px] text-gray-900"
            >
              {t(`cities.${selectedRegion}`)}
              <ChevronDown size={18} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute z-10 mt-2 w-full bg-white rounded-lg border shadow max-h-[200px] overflow-y-auto"
                >
                  {regions.map((region) => (
                    <li
                      key={region}
                      onClick={() => handleSelectRegion(region)}
                      className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                    >
                      {t(`cities.${region}`)}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <div className="mb-5 rounded-xl bg-gray-50 shadow px-4 py-6 flex items-center gap-3 text-gray-900 font-medium cursor-pointer">
            <LogIn size={24} className="stroke-gray-500" />
            {t("login")}
          </div>

          <div className="rounded-xl bg-gray-50 shadow px-4 py-5 flex flex-col gap-4">
            <div className="flex items-center gap-3 py-3">
              <Pizza size={20} className="stroke-gray-500" />
              {t("menu")}
            </div>
            <div className="border-t" />
            <div className="flex items-center gap-3 py-3">
              <MapPin size={20} className="stroke-gray-500" />
              {t("restaurants")}
            </div>
          </div>

          <button className="w-full mt-5 py-3 bg-gray-100 text-gray-600 font-semibold rounded-full flex items-center justify-center gap-2 shadow">
            <Phone size={18} className="stroke-gray-500" />
            {t("call_uss")}
          </button>
        </div>

        <div className="relative top-[-120px]">
          <p className="text-sm text-gray-500 mb-2">{t("language")}</p>
          <div className="flex border bg-gray-100 p-1 rounded-full shadow-inner">
            <button
              onClick={() => handleLangChange("uz")}
              className={`flex-1 py-1 text-sm rounded-full transition ${
                language === "uz"
                  ? "bg-white shadow font-semibold text-black"
                  : "text-gray-500"
              }`}
            >
              O‘zbek
            </button>
            <button
              onClick={() => handleLangChange("ru")}
              className={`flex-1 py-1 text-sm rounded-full transition ${
                language === "ru"
                  ? "bg-white shadow font-semibold text-black"
                  : "text-gray-500"
              }`}
            >
              Русский
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
