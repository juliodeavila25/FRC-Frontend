import { useState, useEffect, version } from "react";
import { useParams, Link } from "react-router-dom";
import useDocumentos from "../../hooks/useDocumentos";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";

const FormularioNuevoDocumento = () => {
  const [id, setId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [proceso, setProceso] = useState("");
  const [servicio, setServicio] = useState("");
  const [tipo, setTipo] = useState("");
  const [implementacion, setImplementacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fuente, setFuente] = useState("");
  const [link, setLink] = useState("");
  const [inputVersiones, setInputVersiones] = useState([
    { version: 1, url: " ", observaciones:"", estado:"Vigente" },
  ]);

  const params = useParams();

 

  const {
    submitDocumento,
    mostrarAlerta,
    alerta,
    obtenerDocumento,
    documento,
    cargandoData,
  } = useDocumentos();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    if (params.id) {
      setId(documento._id);
      setTitulo(documento.titulo);
      setCodigo(documento.codigo);
      setProceso(documento.proceso);
      setServicio(documento.servicio);
      setTipo(documento.tipo);
      setImplementacion(documento.implementacion);
      setDescripcion(documento.descripcion);
      setEspecialidad(documento.especialidad);
      setResponsable(documento.responsable);
      setFuente(documento.fuente);
      setLink(documento.link);
      setInputVersiones(documento.inputVersiones);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        titulo,
        codigo,
        proceso,
        servicio,
        tipo,
        implementacion,
        descripcion,
        especialidad,
        responsable,
        fuente,
        link,
      ].includes("")
    ) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //Pasar los datos hacia el provider
    await submitDocumento({
      id,
      titulo,
      codigo,
      proceso,
      servicio,
      tipo,
      implementacion,
      descripcion,
      especialidad,
      responsable,
      fuente,
      link,
      inputVersiones
    });
    // setNombre("");
    // setDescripcion("");
    // setFechaEntrega("");
    // setCliente("");
  };

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputVersiones];
    list[index][name] = value;
    setInputVersiones(list);
  };

  const handleremove = (e, index) => {
    e.preventDefault();
    const list = [...inputVersiones];
    list.splice(index, 1);
    for (let i = 0; i < list.length; i++) {
      if(i === list.length -1){
        list[i].estado = "Vigente"
      }
      list[i].version = i +1 

    }
    setInputVersiones(list);
  };

  const handleaddclick = (index) => {
     const list = [...inputVersiones];
     console.log(list.length)
     for (let i = 0; i < list.length; i++) {
      list[i].estado = "Obsoleto"
    }
    setInputVersiones([
      ...list,
      { version: index +2, estado:"Vigente" },
    ]);
  };


  const { msg } = alerta;

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        {msg && <Alert alerta={alerta} />}
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Documentos y Formatos
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="codigo"
                className="block text-sm font-medium text-gray-700"
              >
                Código/Versión <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  placeholder="Digita el código"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="proceso"
                className="block text-sm font-medium text-gray-700"
              >
                Proceso<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="proceso"
                  name="proceso"
                  type="text"
                  autoComplete="proceso"
                  placeholder="Digita el proceso"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={proceso}
                  onChange={(e) => setProceso(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="titulo"
                className="block text-sm font-medium text-gray-700"
              >
                Titulo<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  placeholder="Digita el tiulo"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="servicio"
                className="block text-sm font-medium text-gray-700"
              >
                Servicio<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="servicio"
                  name="servicio"
                  type="text"
                  placeholder="Digite el servicio"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tipo"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="tipo"
                  name="tipo"
                  type="text"
                  placeholder="Digite el tipo"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="implementacion"
                className="block text-sm font-medium text-gray-700"
              >
                Implementacion<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="implementacion"
                  name="implementacion"
                  type="text"
                  placeholder="Digite la implementacion"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={implementacion}
                  onChange={(e) => setImplementacion(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  placeholder="Digite descripción"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows="6"
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="especialidad"
                className="block text-sm font-medium text-gray-700"
              >
                Especialidad<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="especialidad"
                  name="especialidad"
                  type="text"
                  placeholder="Digite la especialidad"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="responsable"
                className="block text-sm font-medium text-gray-700"
              >
                Responsable<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="responsable"
                  name="responsable"
                  type="text"
                  placeholder="Digite el responsable"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fuente"
                className="block text-sm font-medium text-gray-700"
              >
                Fuente<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="fuente"
                  name="fuente"
                  type="text"
                  placeholder="Digite la fuente"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={fuente}
                  onChange={(e) => setFuente(e.target.value)}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700"
              >
                URL<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="link"
                  name="link"
                  type="text"
                  placeholder="Digite la url"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required={true}
                />
              </div>
            </div>
          </div>

           <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Versiones
          </div>

          <div>
            {Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? 
              <>
              {console.log("AQui estoy")}
               {inputVersiones &&
              Array.isArray(inputVersiones) &&  
              inputVersiones.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5"
                  >
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Versión
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
                        placeholder="Ingresar version"
                        id="version"
                        name="version"
                        value={item.version}
                        onChange={(e) => handleinputchange(e, i)}
                        disabled={true }
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Link
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
                        placeholder="Ingresar url"
                        id="url"
                        name="url"
                        value={item.url}
                        onChange={(e) => handleinputchange(e, i)}
                        disabled={Array.isArray(documento.inputVersiones) && i === documento.inputVersiones.length || i > documento.inputVersiones.length ? false : true }
                      />
                    </div>
                     <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Observaciones
                      </label>
                      <textarea
                        id="observaciones"
                        name="observaciones"
                        type="text"
                        placeholder="Digite observaciones"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={item.observaciones}
                        onChange={(e) => handleinputchange(e, i)}
                        rows="3"
                        disabled={Array.isArray(documento.inputVersiones) && i === documento.inputVersiones.length || i > documento.inputVersiones.length ? false : true }
                      />
                    </div> 
                     <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Estado
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
                        id="estado"
                        name="estado"
                        value={item.estado}
                        onChange={(e) => handleinputchange(e, i)}
                        disabled={true}
                        
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 ">                      
                      {Array.isArray(documento.inputVersiones) && i === documento.inputVersiones.length || i > documento.inputVersiones.length ? (
                        <button
                          className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={(e) => handleremove(e, i)}
                        >
                          Remover
                        </button>
                      ): null}
                      {inputVersiones.length - 1 === i && (
                        <button
                          className="h-8 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                          onClick={()=>handleaddclick(i)}
                        >
                          Agregar
                        </button>
                      )}
                    </div>
                  </div>
                );
              } )}
              </> :
              <>
               {inputVersiones &&
              Array.isArray(inputVersiones) &&  
              inputVersiones.map((item, i) => {
              
                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5"
                  >
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Versión
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
                        placeholder="Ingresar version"
                        id="version"
                        name="version"
                        value={item.version}
                        onChange={(e) => handleinputchange(e, i)}
                        disabled={true }
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Link
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
                        placeholder="Ingresar url"
                        id="url"
                        name="url"
                        value={item.url}
                        onChange={(e) => handleinputchange(e, i)}
                        
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Observaciones
                      </label>
                      <textarea
                        id="observaciones"
                        name="observaciones"
                        type="text"
                        placeholder="Digite observaciones"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={item.observaciones}
                        onChange={(e) => handleinputchange(e, i)}
                        rows="3"
                      />
                    </div> 
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Estado
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
                        disabled={true}
                        id="estado"
                        name="estado"
                        value={item.estado}
                        onChange={(e) => handleinputchange(e, i)}
                        
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 ">
                     
                      {inputVersiones.length !== 1 && (
                        <button
                          className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={(e) => handleremove(e, i)}
                        >
                          Remover
                        </button>
                      )}
                      {inputVersiones.length - 1 === i && (
                        <button
                          className="h-8 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                          onClick={()=>handleaddclick(i)}
                        >
                          Agregar
                        </button>
                      )}
                    </div>
                  </div>
                );
              } )}
              </>
          }
           
          </div>

          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
            <Link
              to="/documentos/listar-documentos"
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

export default FormularioNuevoDocumento;
