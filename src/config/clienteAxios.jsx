import axios from "axios";

console.log(import.meta.env.MODE)
const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default clienteAxios;
