import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import Reducers from "./Reducers";



let userInfoFromStorage
let initialState
if (typeof window !== 'undefined') {
    userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    console.log(userInfoFromStorage);

    initialState = {
        user: userInfoFromStorage,
        error: null,
        loading: true
    }
}


export const GlobalContext = createContext(initialState)

export const GlobalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(Reducers, initialState);
    const login = async ({ email, password }) => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/login', {
                email,
                password
            })
            console.log(res.data)
            dispatch({
                type: "LOGIN_SUCCESSFUL",
                payload: res.data
            })
            localStorage.setItem("userInfo", JSON.stringify(res.data));
        } catch (error) {
            console.log(error)
            dispatch({
                type: "LOGIN_FAILED",
                payload: error
            })
        }

    }

    const register = async ({ name, email, password }) => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/register', {
                name, email, password
            })

            dispatch({
                type: "REGISTER_SUCCESSFUL",
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: "REGISTER_FAILED",
                payload: error,
            });
        }
    }

    const logout = () => {
        localStorage.removeItem("userInfo");
        dispatch({
            type: "LOGOUT",
        });
    }
    return (
        <GlobalContext.Provider
            value={{
                user: state && state.user,
                error: state && state.error,
                loading: state && state.loading,
                login,
                logout,
                register
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}