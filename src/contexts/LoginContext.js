import React, { useContext, createContext, useState } from 'react'
//import { AuthContext } from "../contexts/AuthContext";


export let LoginContext = createContext({
    email: "",
    
})

export const LoginContextProvider = (props) => {
    const [email, setEmail] = useState("")

    const emailHandler = (email) => {
        setEmail(email)
    }


    return (
        <LoginContext.Provider value={{
            email: emailHandler,
        }}
        >
            {props.children}
        </LoginContext.Provider>
    )
}

export const useLoginContextProvider = () => useContext(LoginContext)