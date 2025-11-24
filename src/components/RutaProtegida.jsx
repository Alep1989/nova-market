import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaProtegida({ Ingreso, onlyAdmin = false }) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/" replace />
    if (onlyAdmin && user.role !== 'admin') return <Navigate to="/" replace />

    return Ingreso;
}

export default RutaProtegida;