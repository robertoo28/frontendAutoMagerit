import axios from 'axios';
export const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3900/api/user/login', {
        email,
        password,
      });
      console.log(response.data);
      return true;
      // Aquí puedes almacenar el token en localStorage o manejarlo como prefieras
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  export const cargarUsuarios = async () => {
    try {
        const response = await axios.get('http://localhost:3900/api/user/mostrarUsuarios');
        console.log(response.data);
        return response.data; // Devuelve los datos recibidos desde la API
    } catch (error) {
        console.error('Error al cargar usuarios', error);
        return []; // Devuelve un array vacío en caso de error
    }
};
  