import React, { FormEvent } from 'react';

class SignUpUser {
    FirstName: string;
    LastName: string;
    email: string;
    password: string;

    constructor(firstName: string, lastName: string, email: string, password:string) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.email = email;
        this.password = password;
    }
}

export const SignupPage = () => {
    const [firstNameInput, setFirstNameInput] = React.useState<string>("");
    const [lastNameInput, setLastNameInput] = React.useState<string>("");
    const [emailInput, setEmailInput] = React.useState<string>("");
    const [passwordInput, setPasswordInput] = React.useState<string>("");

    const clickSubmit = (event: FormEvent) => {
        event.preventDefault();
        let myBody = new SignUpUser(firstNameInput, lastNameInput, emailInput, passwordInput);
        fetch('http://localhost:3000/users', {
                method: 'post',
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify(myBody) 
            }
        )
        .then(results => results.json())
        .then(results => {
            console.log(results);
        });
    };

    return (
        <main className="signup">
            <div className="inner">
                <h1>Sign up</h1>
                <form onSubmit={(e) => clickSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name*: </label>
                        <input type="text" placeholder="First Name" id="firstName" onChange={e => setFirstNameInput(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name*: </label>
                        <input type="text" placeholder="Last Name" id="lastName" onChange={e => setLastNameInput(e.target.value)} required />
                    </div>
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