"use client";
import { useState, useEffect, useRef } from "react";
import { MapPin, ChevronDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const regionKeys = [
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

export default function LocationSelector() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("tashkent");
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <div className="w-[44px] h-[44px] flex justify-center items-center bg-[#F4F4F4] rounded-[10px] text-[#007C5B] ">
        <MapPin size={22} />
      </div>
      <div
        onClick={() => setIsOpen(true)}
        className="items-center px-2 py-[2px] rounded text-[#007C5B] cursor-pointer ml-[-20px]"
      >
        <p className="text-[#828282]">{t("select_city")}</p>
        <div className="flex items-center">
          <div className="text-[16px] font-bold mt-[-3px]">
            {t(`cities.${selected}`)}
          </div>
          <ChevronDown size={14} className="ml-1" />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[5px] bg-black/40 transition-opacity duration-300">
          {isLoading ? (
            <div className="bg-white p-4 rounded-lg shadow-md animate-pulse text-center">
              <span className="text-[#007C5B] font-semibold">
                {t("loading")}
              </span>
            </div>
          ) : (
            <div
              ref={modalRef}
              className="bg-white rounded-lg w-[300px] max-w-full shadow-lg p-4 relative animate-fade-in"
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>

              <h2 className="text-lg font-semibold mb-3 text-center">
                {t("select_city")}
              </h2>

              <ul className="space-y-2">
                {regionKeys.map((region) => (
                  <li
                    key={region}
                    onClick={() => {
                      setSelected(region);
                      setIsOpen(false);
                    }}
                    className="p-2 rounded hover:bg-[#F5F5F5] cursor-pointer text-center"
                  >
                    {t(`cities.${region}`)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
