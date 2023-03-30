import { useEffect, useState } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(window.localStorage.getItem("session-token") || "");

    useEffect(() => {
        window.localStorage.setItem("session-token", token);
    }, [token]);
    return {token, setToken};
}