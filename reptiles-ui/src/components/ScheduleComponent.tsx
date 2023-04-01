import { useState, useEffect } from 'react';

export const ScheduleComponent = () => {
    const [today, setToday] = useState<string>("");
    useEffect(() => {
        setTodaysDayName();
     }, []);

    const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const setTodaysDayName = () => {
        const todayDate = (new Date()).getDay();
        setToday(WEEK_DAYS[todayDate]);
        console.log(today);
    }
    return (
        <div className="schedule-component">
            <p>Today is: {today}</p>
        </div>
    )
}
