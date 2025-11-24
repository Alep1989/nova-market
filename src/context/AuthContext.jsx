import { Children, createContext, useContext, useState } from "react";
/* eslint-disable react-refresh/only-export-components */

const AuthContext = createContext();

export const AuthProvider = ({ Ingreso }) => {
    const [user, setUser] = useState(null);

    const login = (nombre) => {
        const role = nombre === 'admin' ? 'admin' : 'user';
        setUser({ nombre, role });
    };
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {Ingreso}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);