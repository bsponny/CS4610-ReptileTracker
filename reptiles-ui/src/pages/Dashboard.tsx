import React from 'react';
import {useNavigate} from "react-router-dom";

interface DashboardProps {
    setPage: (pageName: string) => void;
    token: any;
}

export const DashboardPage = () => {
    const [name, setName] = React.useState<string>("");
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!window.localStorage.getItem("session-token")){
            navigate("/", {replace: true});
        }
    })

    
    fetch('http://localhost:3000/me/', { credentials: "same-origin"})
    .then(res => res.json())
    .then(res => {
        console.log(res);
    });

    return(
        <main className="dashboard">
            <p>Hi Dashboard!</p>
            <div className="modules-container">
                <div className="card reptiles">
                    <h2>Reptiles</h2>
                </div>
                <div className="card schedule">
                    <h2>Today's Schedule</h2>
                </div>
            </div>
        </main>
    );
};