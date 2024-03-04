import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export const useCallAPI = () => {
    // State variables
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    // Configuration for axios
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    // Function to handle API response
    const handleResponse = useCallback((data) => {
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    }, []);

    // Function to make API calls
    const callAPI = useCallback(async (url, method, data) => {
        setLoading(true);
        try {
            const response = await axios[method](url, data, config);
            handleResponse(response.data);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [handleResponse]);

    // Function to handle login or register API calls
    const callLoginOrRegisterAPI = useCallback(async (url, data) => {
        await callAPI(url, "post", data);
    }, [callAPI]);

    // Effect hook to clear error after 3.5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setError("");
        }, 3500);
        return () => clearTimeout(timer);
    }, [error]);

    // Return values for the custom hook
    return {
        loading,
        error,
        userInfo,
        callLoginPostAPI: useCallback(
            (email, password) => callLoginOrRegisterAPI('/api/users/login', { email, password }),
            [callLoginOrRegisterAPI]
        ),
        callRegisterPostAPI: useCallback(
            (name, email, password, pic) => callLoginOrRegisterAPI('/api/users', { name, email, password, pic }),
            [callLoginOrRegisterAPI]
        ),
    };
};
