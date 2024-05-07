import "./Main.css";
import axios from "axios";
import { useState } from "react";
import { UserSignupInfo } from "../../type";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const SignupPage = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const url = import.meta.env.VITE_API_ROOT + "/users/signup";
    const data: UserSignupInfo = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      passwordConfirm: event.target.password_confirm.value,
    };

    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: data,
      });

      if (response.status === 201) {
        setIsSignedUp(true);
        toast.success("Successfully Registered!");
      }
    } catch (error) {
      toast.error("Something bad happend!");
    }
  };

  if (isSignedUp) {
    navigate("/login");
    return <></>;
  }

  return (
    <div className="auth-page">
      <div className="form">
        <form
          id="signup-form"
          className="register-form"
          onSubmit={handleSubmit}
        >
          <input type="text" placeholder="username" name="username" required />
          <input
            type="text"
            placeholder="email address"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
          <input
            type="password"
            placeholder="password confirm"
            name="password_confirm"
            required
          />
          <button id="signup">create</button>
          <p className="message">
            Already registered?
            <a href="/login"> Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};
