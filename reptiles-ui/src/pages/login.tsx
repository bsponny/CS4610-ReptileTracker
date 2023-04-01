import e from 'express';
import React, { FormEvent } from 'react';
import { DashboardPage } from './Dashboard';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';


export const LoginPage = () => {
    const api = useApi();
    const {token, setToken} = useAuth();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function login() {
        const body = {
            email,
            password
        }
        const user = await api.post("/sessions", body);
        console.log(user);
        console.log(user.session.token);
        if (user){
            window.localStorage.setItem("session-token", user.session.token);
            setToken(user.session.token);
            window.location.reload();
        }
    }

    return (
        <main className="signup">
            <div className="inner">
                <h1>Login</h1>
                <form onSubmit={(e) => login()}>
                    <div className="form-group">
                        <label htmlFor="email">Email*: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="email" placeholder="Email" id="email" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password*:&nbsp; </label>
                        <input type="password" placeholder="Password" id="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="submit" id="submit" />
                    </div>
                </form>
            </div>
        </main>
    );
};