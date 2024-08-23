import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";


interface IAuthContext { 
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);


interface IAuthProvider {
    children: ReactNode;
}

const AuthProvider: FC<IAuthProvider> = ({children}) => {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem('token') ? localStorage.getItem('token') : null
    );


    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
        else {
            localStorage.removeItem('token');
        }
    },[token])

    const values = {
        token,
        setToken
    }

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    )
}


const useAuthData =() => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw Error('Use hook within the provider')
    }

    return context;
}


export {
    useAuthData,
    AuthProvider
}