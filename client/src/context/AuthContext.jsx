import {createContext, useState, useContext} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = (props) =>{
    const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const value = {
        user,
        setUser,
        loading,
        setLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}