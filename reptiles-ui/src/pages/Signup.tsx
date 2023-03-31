import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { useApi } from '../hooks/useApi';

export const SignupPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const api = useApi();
    const setToken = useContext(AuthContext);

    async function signUp() {
        const body = {
            firstName,
            lastName,
            email,
            password
        }

        const resultBody = await api.post("/users", body);
        console.log(resultBody);
        if (resultBody){
            setToken(resultBody.user.sessions[0].token);
        }
    }

    return (
        <main className="signup">
            <div className="inner">
                <h1>Sign up</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name*: </label>
                        <input type="text" placeholder="First Name" id="firstName" onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name*: </label>
                        <input type="text" placeholder="Last Name" id="lastName" onChange={e => setLastName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email*: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="email" placeholder="Email" id="email" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password*:&nbsp; </label>
                        <input type="password" placeholder="Password" id="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={signUp}>Sign Up</button>
                    </div>
                </form>
            </div>
        </main>
    );
};