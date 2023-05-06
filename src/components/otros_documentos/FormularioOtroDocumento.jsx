import { useState, useEffect, version } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useOtrosDocumentos from "../../hooks/useOtrosDocumentos.jsx";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";



const FormularioOtroDocumento = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const[errorDocumento, setErrorDocumento]= useState(false)
  const [nombreDocumento, setNombreDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  



  const params = useParams();
  const {
    submitOtrosDocumentos,
    otroDocumento,
    alerta,
    mostrarAlerta,
    cargandoDocumento
   
  } = useOtrosDocumentos();

  const { auth, cargando } = useAuth();

  useEffect(() => {
    if (params.id) {
      setId(otroDocumento._id);
      setNombreDocumento(otroDocumento.nombreDocumento);
      setDocumento(otroDocumento.documento);
      setObservaciones(otroDocumento.observaciones)
     
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_trabajador = localStorage.getItem("id_trabajador");
    const formData = new FormData();
    formData.append("id", id )
    formData.append("id_trabajador", id_trabajador);
    formData.append("nombreDocumento", nombreDocumento);
    formData.append("documento", documento);
    formData.append("observaciones", observaciones);
    
    await submitOtrosDocumentos(formData, id);
    
    
  };
  

   const handleDocumento = (data) => {
    const maxfilesize = (1024 * 1024) / 2;

    if (data && data.size > maxfilesize) {
      setErrorDocumento(true);
      setDocumento(" ");
    } else {
      setErrorDocumento(false);
      setDocumento(data);
    }
  };
 

  const { msg } = alerta;

   if (cargandoDocumento ) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">        
        <form className="space-y-6 " onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado de Documentos
          </div>
          <div className="grid grid-cols-3 gap-6 ">
              <div>
                  <label
                      htmlFor="nombreDocumento"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Nombre documento <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                      <input
                      type="text"
                      id="nombreDocumento"
                      name="nombreDocumento"
                      placeholder="Digita el nombre del documento"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={nombreDocumento}
                      onChange={(e) => setNombreDocumento(e.target.value)}
                      required={true}
                      />
                  </div>
              </div>

              <div>
                  <label
                      htmlFor="documento"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Documento <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                      <input
                      type="file"
                      id="documento"
                      name="documento"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                     
                      onChange={(e) => handleDocumento(e.target.files[0])}
                      required={otroDocumento.documento ? false : true}
                      accept=".pdf"
                      />
                  </div>
                  {errorDocumento === true && (
                    <span className="text-red-500 text-xs">
                      El tamaño máximo es 500kb
                    </span>
                  )}
                  <div className="mt-3">
                {otroDocumento.documento && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${
                      otroDocumento.documento
                    }`}
                    download={otroDocumento.documento}
                    target="_blank"
                    className="underline text-blue-500 pt-5"
                  >
                    Descargar Documento
                  </a>
                )}
              </div>
              </div>

              <div>
                <label
                  htmlFor="observaciones"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Obsevaciones
                </label>
                <div className="mt-1">
                <textarea
                  id="observaciones"
                  name="observaciones"
                  type="text"
                  placeholder=""
                  rows="2"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
                </div>
              </div>
       
        </div>  

          {msg && <Alert alerta={alerta} />}

          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
            <button
              onClick={()=>history.back()}
              className="flex w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
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

export default FormularioOtroDocumento;
