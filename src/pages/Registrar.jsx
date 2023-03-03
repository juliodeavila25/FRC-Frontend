import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const Registrar = () => {
  const [active, setActive] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState("Cedula");
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repassword) {
      setAlerta({
        msg: "Las contraseñas no son iguales",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, se requieren minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    //Crear el usuario en la API
    try {
      const { data } = await clienteAxios.post("/usuarios", {
        nombre,
        password,
        email,
        tipoDocumento,
        documento,
      });
      console.log(data);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTipoDocumento("Cedula");
      setDocumento("");
      setNombre("");
      setEmail("");
      setPassword("");
      setRepassword("");
      setTimeout(() => {
        setAlerta({});
        navigate("/");
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Ingresa los datos para crear tu cuenta
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            {msg && <Alert alerta={alerta} />}

            <form className="space-y-6 " onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="tipoDocumento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo de Documento
                </label>
                <div className="mt-1">
                  <select
                    id="tipoDocumento"
                    name="tipoDocumento"
                    placeholder="Seleccione su tipo de documento"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      const selectedTipoDocumento = e.target.value;
                      setTipoDocumento(selectedTipoDocumento);
                    }}
                    value={tipoDocumento}
                    disabled={active}
                  >
                    <option value="Cedula">Cedula</option>
                    <option value="Cedula de Extranjeria">
                      Cedula de Extranjeria
                    </option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="documento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documento de Identidad
                </label>
                <div className="mt-1">
                  <input
                    id="documento"
                    name="documento"
                    type="text"
                    autoComplete="documento"
                    placeholder="Digita tu documento"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre completo
                </label>
                <div className="mt-1">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="nombre"
                    placeholder="Digita tu nombre completo"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo electrónico
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Digita tu correo electrónico"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="re-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Repetir contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="re-password"
                    name="re-password"
                    type="password"
                    placeholder="Repetir tu contraseña"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Link
                  to="/"
                  className="flex w-full justify-center rounded-md border border border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Regresar
                </Link>
                <input
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  value="Crear cuenta"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registrar;
