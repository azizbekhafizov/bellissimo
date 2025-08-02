import { Lock, Phone } from "lucide-react";
import { useState } from "react";

const AuthForm = ({ type = "login", onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isRegister = type === "register";

  return (
    <div
      className=" max-w-[450px] w-full h-[450px] mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-green-400 mb-12
    "
    >
      <h2 className="text-[36px] font-bold text-center text-green-700 mb-6">
        {isRegister ? "Ro'yxatdan o'tish" : "Kirish"}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        className="space-y-4"
      >
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            className="w-full px-4 py-3 border border-green-400 rounded-lg outline-none ring-1 ring-green-500 "
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <div className="relative mt-2">
          <Phone className="absolute left-3 top-3.5 " size={18} />
          <input
            type="tel"
            name="phone"
            placeholder="+998"
            className="w-full pl-10 pr-3 py-3 border-green-400  rounded-lg outline-none ring-1 ring-green-500"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative mt-6">
          <Lock className="absolute left-3 top-3.5 " size={18} />
          <input
            type="password"
            name="password"
            placeholder={
              isRegister ? "Maxfiy kalit (kamida 4 belgi)" : "Parolingiz"
            }
            className="w-full pl-10 pr-3 py-3 border-green-400  rounded-lg outline-none ring-1 ring-green-500"
            value={formData.password}
            onChange={handleChange}
            minLength={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 mt-2"
        >
          {loading
            ? "Yuklanmoqda..."
            : isRegister
            ? "Ro'yxatdan o'tish"
            : "Kirish"}
        </button>
      </form>

      <div className="text-center mt-4">
        {isRegister ? (
          <a
            href="/login"
            className="text-green-600 hover:underline transition duration-500 text-[18px] font-medium mt-4"
          >
            Kirish sahifasiga
          </a>
        ) : (
          <a
            href="/register"
            className="text-green-600 hover:underline transition duration-500 text-[18px] font-medium mt-4"
          >
            Ro’yxatdan o’tish
          </a>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
