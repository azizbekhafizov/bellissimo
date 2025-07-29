import React, { useState } from "react";
import uzbFlag from "../../public/assets/images/uzb.svg";
import rusFlag from "../../public/assets/images/rus.svg";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();

  const currentLang = i18n.language;
  const isUz = currentLang === "uz";

  const handleChangeLang = (lang) => {
    setLoading(true);
    setTimeout(() => {
      i18n.changeLanguage(lang);
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Language trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-[18px] font-normal gap-1.5"
      >
        <img
          src={isUz ? uzbFlag : rusFlag}
          alt={isUz ? "Uz" : "Ru"}
          className="w-[25px] h-[25px] object-contain"
        />
        {isUz ? "Uz" : "Ru"}
        <ChevronDown size={14} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[110%] right-0 bg-white shadow-lg border rounded-md z-50">
          <div
            onClick={() => handleChangeLang("uz")}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
          >
            <img src={uzbFlag} className="w-5 h-5" /> O‘zbekcha
          </div>
          <div
            onClick={() => handleChangeLang("ru")}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
          >
            <img src={rusFlag} className="w-5 h-5" /> Русский
          </div>
        </div>
      )}

      {/* Loading modal */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg text-2xl font-bold shadow-lg">
            Loading...
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
