import e from 'express';
import React, { FormEvent } from 'react';
import { DashboardPage } from './Dashboard';

class LoginUser {
    email: string;
    password: string;

    constructor(email: string, password:string) {

        this.email = email;
        this.password = password;
    }
}
export const LoginPage = () => {
    const [emailInput, setEmailInput] = React.useState<string>("");
    const [passwordInput, setPasswordInput] = React.useState<string>("");


    const clickSubmit = (event: FormEvent) => {
        event.preventDefault();
        let myBody = new LoginUser(emailInput, passwordInput);
        fetch('http://localhost:3000/sessions', {
                method: 'post',
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify(myBody) 
            }
        )
        .then(results => {
            if(results.status >= 400) {
                throw new Error("Server responds with error!");
            }
            return results.json();
        })
        .then(results => {
            // set Page and set Token
            window.location.reload();
        });
    };

    return (
        <main className="signup">
            <div className="inner">
                <h1>Login</h1>
                <form onSubmit={(e) => clickSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="email">Email*: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="email" placeholder="Email" id="email" onChange={e => setEmailInput(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password*:&nbsp; </label>
                        <input type="password" placeholder="Password" id="password" onChange={e => setPasswordInput(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="submit" id="submit" />
                    </div>
                </form>
            </div>
        </main>
    );
};