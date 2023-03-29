import React from 'react';

export const SignupPage = () => {
    const [firstNameInput, setFirstNameInput] = React.useState<string>("");
    const [lastNameInput, setLastNameInput] = React.useState<string>("");
    const [emailInput, setEmailInput] = React.useState<string>("");
    const [passwordInput, setPasswordInput] = React.useState<string>("");


    return (
        <main className="signup">
            <div className="inner">
                <h1>Sign up</h1>
                <form>
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