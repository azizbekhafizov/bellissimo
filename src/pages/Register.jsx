import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (formData) => {
    const userData = {
      name: formData.name,
      phone: formData.phone,
      image: `${window.location.origin}/assets/images/uset.svg`,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(new Event("userChanged"));

    navigate("/");
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default Register;
