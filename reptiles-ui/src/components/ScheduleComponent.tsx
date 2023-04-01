import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';

type Schedule = {
    id: number;
    type: string;
    description: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    reptileId: number;
    userId: number;
}

export const ScheduleComponent = () => {
    const api = useApi();

    const [today, setToday] = useState<string>("");
    const [schedule, setSchedule] = useState<Schedule[]>([]);
    useEffect(() => {
        setTodaysDayName();
     }, []);

    const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const setTodaysDayName = () => {
        const todayDate = (new Date()).getDay();
        setToday(WEEK_DAYS[todayDate]);
        console.log(today);
    }

    async function getSchedule() {
        const user = await api.get("/me");
        const userId = user.user.id;
        const url = `/userSchedule/${userId}`;
        const result = await api.get(url);
        setSchedule(result.schedule)
    }
    getSchedule();
    console.log(schedule);

    return (
        <div className="schedule-component">
            <p>Today is: {today}</p>
            <div>
                {
                    schedule.map((item) => (
                        <p key={item.id}>
                            Type: {item.type}<br />
                            Description: {item.description}<br />
                            {item.monday && <span>Monday<br /></span>}
                            {item.tuesday && <span>Tuesday<br /></span>}
                            {item.wednesday && <span>Wednesday<br /></span>}
                            {item.thursday && <span>Thursday<br /></span>}
                            {item.friday && <span>Friday<br /></span>}
                            {item.saturday && <span>Saturday<br /></span>}
                            {item.sunday && <span>Sunday<br /></span>}
                        </p>
                    ))}
            </div>
        </div>
    );
}