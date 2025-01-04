import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirige a login si no hay token
    }
  }, [token, navigate]); // Solo se ejecuta cuando el token cambia

  if (!token) {
    return null; // No renderiza el contenido mientras redirige
  }

  return <Outlet />; // Renderiza el contenido si está autenticado
};

export default ProtectedRoute;
