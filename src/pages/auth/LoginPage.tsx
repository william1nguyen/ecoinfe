import "./Main.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState } from "react";
import { UserLoginInfo } from "../../type";

export const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [, setCookie, ] = useCookies(['access-token']);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const url = import.meta.env.VITE_BASE_URL + '/users/login';
        const data: UserLoginInfo = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        const response = await axios({
            method: "POST",
            url: url,
            data: data
        });

        if (response.status === 200) {
            const { access_token } = response.data;
            setCookie(
                'access-token', access_token,
                { path: '/', secure: true, }
            );
            setIsLoggedIn(true);

            window.location.href = "/";
        }
    };

    return isLoggedIn ? <Redirect to="/" /> : (
        <div className="auth-page">
            <div className="form">
                <form id="login-form" className="login-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="email" name="email" required/>
                <input type="password" placeholder="password" name="password" required/>
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