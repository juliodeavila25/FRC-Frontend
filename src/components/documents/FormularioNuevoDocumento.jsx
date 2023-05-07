import { useState, useEffect, version } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useDocumentos from "../../hooks/useDocumentos";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import { TagsInput } from "react-tag-input-component";



const FormularioNuevoDocumento = () => {
  const navigate = useNavigate();
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
  const[numeroVersion, setNumeroVersion] = useState(1)
  const[urlMostrar, setUrlMostrar] = useState("")
  const[observacionesMostrar, setObservacionesMostrar] = useState("")
  const[estadoMostrar, setEstadoMostrar] = useState("")
  const[url, setUrl] = useState("")
  const[observaciones, setObservaciones] = useState("")
  const[estado, setEstado] = useState("Vigente")
  const[numeroVersionMostrar, setNumeroVersionMostrar]= useState("")
  const[selectedTag, setSelectedTag] = useState([]);
  const[unidadFuncional ,setUnidadFuncional]= useState("")
  // const [inputVersiones, setInputVersiones] = useState([
  //   { version: 1, url: " ", observaciones:"", estado:"Vigente" },
  // ]);

  // const [inputTest, setInputTest] = useState([
  //   { numero: ""},
  // ]);

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
      console.log(documento)
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
      setSelectedTag(documento.selectedTag)
      setUnidadFuncional(documento.unidadFuncional)
      setNumeroVersionMostrar(Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? documento.inputVersiones[documento.inputVersiones.length - 1].version : "")
      setUrlMostrar(Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? documento.inputVersiones[documento.inputVersiones.length - 1].url : "")
      setObservacionesMostrar(Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? documento.inputVersiones[documento.inputVersiones.length - 1].observaciones : "")
      setEstadoMostrar(Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? documento.inputVersiones[documento.inputVersiones.length - 1].estado : "")
      setNumeroVersion(Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? documento.inputVersiones.length + 1  : 1)
      //setInputVersiones(documento.inputVersiones);
      //setInputTest(documento.inputTest)
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
        selectedTag,
        unidadFuncional
      ].includes("")
    ) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (
      [
        version,
        url,
        observaciones,
        estado,
        unidadFuncional
      ].includes("")
    ){
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
      selectedTag,
      unidadFuncional
      //inputVersiones,
     // inputTest
    });

    }else{
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
      unidadFuncional,
      selectedTag,
      numeroVersion, 
      url,
      observaciones, 
      estado
      });
    }
    
   
    // setNombre("");
    // setDescripcion("");
    // setFechaEntrega("");
    // setCliente("");
  };


  
  // const handleinputchange = (e, index) => {
  //   console.log("Hola")
  //   const { name, value } = e.target;
  //   const list = [...inputTest];
  //   list[index][name] = value;
  //   setInputTest(list);
  // };

  // const handleremove = (e, index) => {
  //   e.preventDefault();
  //   const list = [...inputVersiones];
  //   list.splice(index, 1);
  //   for (let i = 0; i < list.length; i++) {
  //     if(i === list.length -1){
  //       list[i].estado = "Vigente"
  //     }
  //     list[i].version = i +1 

  //   }
  //   setInputVersiones(list);
  // };

  // const handleaddclick = (index) => {
  //    const list = [...inputVersiones];
  //    console.log(list.length)
  //    for (let i = 0; i < list.length; i++) {
  //     list[i].estado = "Obsoleto"
  //   }
  //   setInputVersiones([
  //      { version: index +2, estado:"Vigente" },
  //     ...list
  //   ]);
  // };

  const addFields = () =>{
    document.getElementById("formVersion").classList.remove("hidden")
    document.getElementById("formVersionOld").classList.add("hidden")
  }


  const { msg } = alerta;

  if (cargandoData) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        
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
                Código<span className="text-red-700">*</span>
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
             {/* <div>
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
            </div> */}
            <div>
              <label
                htmlFor="proceso"
                className="block text-sm font-medium text-gray-700"
              >
                Proceso <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="proceso"
                  name="proceso"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setProceso(selectedDocumentType);
                  }}
                  value={proceso}
                >
                  <option value="Atención en Salud">
                   Atención en Salud  
                  </option>
                  <option value="Apoyo Administrativo y Operativo">
                    Apoyo Administrativo y Operativo
                  </option>
                  <option value="Mejoramiento Continuo">
                    Mejoramiento Continuo
                  </option>
                  <option value="Direccionamiento Estrategico">Direccionamiento Estrategico</option>
                </select>
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
            {/* 
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
                  */}
            <div>
              <label
                htmlFor="tipo"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="tipo"
                  name="tipo"
                  placeholder="Selecciona el tipo"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedDocumentType = e.target.value;

                    setTipo(selectedDocumentType);
                  }}
                  value={tipo}
                >
                  <option value="Documento">
                    Documento 
                  </option>
                  <option value="Formato">
                    Formato  
                  </option>
                </select>
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
                  {/* 
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
*/}
            <div>
              <label
                htmlFor="fuente"
                className="block text-sm font-medium text-gray-700"
              >
                Fuente <span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="fuente"
                  name="fuente"
                  placeholder="Selecciona el fuente"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedDocumentType = e.target.value;
                    setFuente(selectedDocumentType);
                  }}
                  value={fuente}
                >
                  <option value="Documento interno">
                    Documento interno  
                  </option>
                  <option value="Documento Externo">
                    Documento Externo   
                  </option>
                </select>
              </div>
            </div>

            {/* <div>
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
            </div> */}
            <div>
               <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags<span className="text-red-700">*</span>
              </label>
            <TagsInput
              value={selectedTag}
              onChange={setSelectedTag}
              name="tag"
              placeHolder="Ingrese tags"
              
            />
            <em className="text-xs italic">Presiona enter para agregar un nuevo tag</em>
            </div>

            <div className="">
              <label
                htmlFor="unidad_funcional"
                className="block text-sm font-medium text-gray-700"
              >
                Unidad Funcional<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="unidad_funcional"
                  name="unidad_funcional"
                  type="text"
                  placeholder="Digite la unidad funcional"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={unidadFuncional}
                  onChange={(e) => setUnidadFuncional(e.target.value)}
                  required={true}
                />
              </div>
            </div>
          </div>
          
         <div  id="formVersionOld" className={Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? "block" : "hidden"}>     
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
              Versión vigente
            </div>
           {Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? 
           <> 
           <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 mt-3">
              <div>
                <label
                  htmlFor="numero"
                  className="block text-sm font-medium text-gray-700"
                >
                  Versión
                </label>
              <div className="mt-1">
                <input
                  id="numero"
                  name="numero"
                  type="text"
                  placeholder="Digite la version"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={numeroVersionMostrar}
                  disabled={true}
                />
              </div>
            </div>
            
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Url<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="url"
                  name="url"
                  type="text"
                  placeholder="Digite la url"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={urlMostrar}
                  required={false}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="observaciones"
                className="block text-sm font-medium text-gray-700"
              >
                Observaciones<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="observaciones"
                  name="observaciones"                 
                  rows={3}
                  placeholder="Digite las observaciones"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={observacionesMostrar}
                  required={false}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="estado"
                className="block text-sm font-medium text-gray-700"
              >
                Estado<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="estado"
                  name="estado"
                  type="estado"                  
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={estadoMostrar}
                  disabled={true}                
                />
              </div>
            </div>
           </div>
           <div className="grid grid-cols-2 gap-6 w-2/5 mt-3">
             <Link
              to={`/documentos/editar-documento/${documento._id}/listar-versiones`}
              className="flex w-full justify-center rounded-md border-2 border-blue-400 bg-blue-500 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Listado de Versiones
            </Link>
           
           
            <a
              className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              onClick={() =>addFields()}
            >
              Agregar nueva versión
            </a>
          </div>
          
          </>
             
         : null
            }
          </div> 
          <div id="formVersion" className={Array.isArray(documento.inputVersiones) && documento.inputVersiones.length > 0 ? "hidden" : "block"}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">Nueva versión</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 mt-3">
              <div>
              <label
                htmlFor="numero"
                className="block text-sm font-medium text-gray-700"
              >
                Versión<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="numero"
                  name="numero"
                  type="text"
                  placeholder="Digite la version"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={numeroVersion}
                  onChange={(e) => setNumeroVersion(e.target.value)}
                  required={false}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Url<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="url"
                  name="url"
                  type="text"
                  placeholder="Digite la url"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required={false}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="observaciones"
                className="block text-sm font-medium text-gray-700"
              >
                Observaciones<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="observaciones"
                  name="observaciones"                 
                  rows={3}
                  placeholder="Digite las observaciones"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  required={false}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="estado"
                className="block text-sm font-medium text-gray-700"
              >
                Estado<span className="text-red-700">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="estado"
                  name="estado"
                  type="estado"                  
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>  
          

          {msg && <Alert alerta={alerta} />}
       

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
