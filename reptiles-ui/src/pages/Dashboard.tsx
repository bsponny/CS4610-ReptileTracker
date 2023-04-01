import React from 'react';
import {useNavigate} from "react-router-dom";
import { ReptileComponent } from "../components/ReptileComponent"
import { ScheduleComponent } from '../components/ScheduleComponent';
import { useApi } from '../hooks/useApi';

export const DashboardPage = () => {
    const api = useApi();
    const [name, setName] = React.useState<string>("");
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!window.localStorage.getItem("session-token")){
            navigate("/", {replace: true});
        }
    const fetchMe = api.get('/me');
    fetchMe.then(res => {
        setName(res.user.firstName);
    });
    }, []);

    
    

    return(
        <main className="dashboard">
            <p>Welcome to your Dashboard, {name}!</p>
            <div className="modules-container">
                <div className="card reptiles">
                    <h2 onClick={() => console.log("to Reptile Page.")} className="reptiles-link">Reptiles ↗</h2>
                    <ReptileComponent />
                </div>
                <div className="card schedule">
                    <h2>Today's Schedule</h2>
                    <ScheduleComponent />
                </div>
            </div>
        </main>
    );
};