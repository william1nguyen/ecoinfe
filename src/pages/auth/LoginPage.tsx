import "./Main.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { UserLoginInfo } from "../../type";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

export const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn }: any = useContext(LoginContext);
  const [, setCookie] = useCookies(["access-token", "isLoggedIn"]);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const url = import.meta.env.VITE_BASE_URL + "/users/login";
    const data: UserLoginInfo = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const response = await axios({
      method: "POST",
      url: url,
      data: data,
    });

    if (response.status === 200) {
      const { access_token } = response.data;
      setCookie("access-token", access_token, { path: "/", secure: true });
      setCookie("isLoggedIn", true, { path: "/", secure: true });
      toast.success("Logged In!");
      setIsLoggedIn(true);
      navigate("/");
      window.location.reload();
    }
  };

  if (isLoggedIn) {
    navigate("/");
    return <></>;
  }

  return (
    <div className="auth-page">
      <div className="form">
        <form id="login-form" className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="email" name="email" required />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
          <button id="login">login</button>
          <p className="message">
            Not registered?
            <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};
