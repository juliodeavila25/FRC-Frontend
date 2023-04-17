import { useState, useEffect, version } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useCargos from "../../hooks/useCargos";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";



const FormularioNuevoCargo = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [inputCargos, setInputCargos] = useState([
     { nombre_requisito: "", estado_requisito:"Activo" },
   ]);



  const params = useParams();
  const {
    submitCargo,
    mostrarAlerta,
    alerta,
    cargo,
    cargandoData,
  } = useCargos();

  const { auth, cargando } = useAuth();

  console.log(cargo)
  useEffect(() => {
    if (params.id) {
      setId(cargo._id);
      setNombre(cargo.nombre);
      setInputCargos(cargo.inputCargos);
     
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nombre, inputCargos)
    await submitCargo({
        id,
        nombre,
        inputCargos
    })
    
   
    // setNombre("");
    // setDescripcion("");
    // setFechaEntrega("");
    // setCliente("");
  };


  
 const handleaddclick = () => {
    setInputCargos([
      ...inputCargos,
       { nombre_requisito: "", estado_requisito:"Activo" },
    ]);
  };
  //Cuentas Extranjero
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputCargos];
    list[index][name] = value;
    setInputCargos(list);
  };

  const handleremove = (index) => {
    const list = [...inputCargos];
    list.splice(index, 1);
    setInputCargos(list);
  };


  const { msg } = alerta;

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">        
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Cargos
          </div>
          <div className="grid grid-cols-1 gap-6 ">
                <div>
                    <label
                        htmlFor="codigo"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nombre cargo <span className="text-red-700">*</span>
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        id="codigo"
                        name="codigo"
                        placeholder="Digita el código"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required={true}
                        />
                    </div>
                </div>

                <div>
                    {inputCargos &&
                    Array.isArray(inputCargos) &&
                    inputCargos.map((item, i) => {
                        return (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5"
                        >
                            <div className="">
                            <label className="block text-sm font-medium text-gray-700">
                                Nombre requisito
                            </label>
                            <input
                                type="text"
                                className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Ingresar nombre del requisito"
                                id="nombre_requisito"
                                name="nombre_requisito"
                                value={item.nombre_requisito}
                                onChange={(e) => handleinputchange(e, i)}
                                required={true}
                                disabled={Array.isArray(cargo.inputCargos) && i >= cargo.inputCargos?.length  || params.id === undefined && inputCargos.length >= 1 ? false : true}
                            />
                            </div>
                            <div className="">
                            <label className="block text-sm font-medium text-gray-700">
                                Estado requisito
                            </label>
                            <select
                                id="estado_requisito"
                                name="estado_requisito"
                                placeholder="Digita tu correo electrónico"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                onChange={(e) => handleinputchange(e, i)}
                                value={item.estado_requisito}
                                >
                                <option value="Activo">
                                    Activo
                                </option>
                                <option value="Inactivo">
                                Inactivo
                                </option>
                                
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-6 ">
                           
                            {Array.isArray(cargo.inputCargos) && i >= cargo.inputCargos?.length  || params.id === undefined && inputCargos.length !== 1 ? (
                                <button
                                className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => handleremove(i)}
                                >
                                Remover
                                </button>
                            ) : null}


                            {inputCargos.length - 1 === i && (
                                <button
                                className="h-8 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                onClick={handleaddclick}
                                >
                                Agregar
                                </button>
                            )}
                            </div>
                        </div>
                        );
                    })}
          </div>
            
          
       
        </div>  

            {msg && <Alert alerta={alerta} />}

          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
            <Link
              to="/cargos/listar-cargos"
              className="flex w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              value="Guardar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioNuevoCargo;
