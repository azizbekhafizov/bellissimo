import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.phone === data.phone &&
      savedUser.password === data.password
    ) {
      navigate("/");
    } else {
      alert("Telefon raqam yoki parol noto'g'ri");
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
