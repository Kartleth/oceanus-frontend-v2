const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchData = async (): Promise<any> => {
  try {
    const response = await fetch(`${backendUrl}/api/endpoint`, {
      method: 'GET',
      credentials: 'include', // Si necesitas enviar cookies
    });
    const data = await response.json();
    console.log("Datos del backend:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};