import React from 'react';

interface DashboardProps {
    setPage: (pageName: string) => void;
    token: any;
}

export const DashboardPage = ({setPage, token}:DashboardProps) => {
    const [name, setName] = React.useState<string>("");

    if(!token) {
        setPage("home");
    }
    
    fetch('http://localhost:3000/me/', { credentials: "same-origin"})
    .then(res => res.json())
    .then(res => {
        console.log(res);
    });

    return(
        <main className="dashboard">
            <p>Hi Dashboard!</p>
        </main>
    );
};