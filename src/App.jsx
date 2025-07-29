import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./components/PizzaDetails";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Cart from "./components/Cart";
import Login from "./pages/Login"; // ➕ Qo‘shildi
import Register from "./pages/Register"; // ➕ Qo‘shildi
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} /> {/* ✅ */}
        <Route path="/register" element={<Register />} /> {/* ✅ */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
