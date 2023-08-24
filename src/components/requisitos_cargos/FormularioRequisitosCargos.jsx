import { useState, useEffect, version, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";
import useDocumentosRequisitos from "../../hooks/useDocumentosRequisitos";


const FormularioRequisitosCargos = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [nombreRequisito, setNombreRequisito] = useState("");
  const [fechaVigencia, setFechaVigencia] = useState("");
  const [emisor, setEmisor] = useState("");
  const [fechaExpedicion, setFechaExpedicion] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [errorSoporteDocumento, setErrorSoporteDocumento] = useState(false);

  const params = useParams();
  const { auth, cargando } = useAuth();

  const { documentos, cargandoDataDocumentos } = useDocumentosRequisitos()


  console.log(documentos)


  useEffect(() => {
    if (params.id) {
      setId(documentos._id);
      setNombreRequisito(documentos.nombreRequisito);
      setFechaVigencia(documentos.fechaVigencia)
      setEmisor(documentos.emisor);
      setFechaExpedicion(documentos.fechaExpedicion)
      setNumeroDocumento(documentos.numeroDocumento)
      setDocumento(documentos.documento)
    }
  }, [documentos]);



  const handleSubmit = async (e) => {
    e.preventDefault();


    await submitFuncional({
      id,
      nombre,
      negocio,
      inputCargos,
      estado,
    });
  };


  const handleSoporteDocumento = (data) => {
    const maxfilesize = 1024 * 1024;

    if (data && data.size > maxfilesize) {
      setErrorSoporteDocumento(true);
      setDocumento(" ");
    } else {
      setErrorSoporteDocumento(false);
      setDocumento(data);
    }
  };



  // const { msg } = alerta;

  if (cargandoDataDocumentos) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado de Requisitos para Cargos
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Requisito{" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="nombreRequisito"
                    name="nombreRequisito"
                    placeholder="Digita el nombre del cargo"
                    className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                    value={nombreRequisito}
                    disabled={true}
                  />
                </div>
              </div>
              {Object.keys(documentos).length !== 0 && documentos.fechaVigencia !== "" ? (
                <div>
                  <label
                    htmlFor="codigo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de vigencia
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="fechaVigencia"
                      name="fechaVigencia"
                      placeholder="Digita la fecha de vigencia"
                      className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                      value={fechaVigencia}
                      required={true}
                      onChange={(e) => setFechaVigencia(e.target.value)}

                    />
                  </div>
                </div>
              ) : null}


              {Object.keys(documentos).length !== 0 && documentos.emisor !== "" ? (
                <div>
                  <label
                    htmlFor="codigo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Emisor
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="emisor"
                      name="emisor"
                      placeholder="Digita el emisor"
                      className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                      value={emisor}
                      required={true}
                      onChange={(e) => setEmisor(e.target.value)}
                    />
                  </div>
                </div>
              ) : null}


              {Object.keys(documentos).length !== 0 && documentos.fechaExpedicion !== "" ? (
                <div>
                  <label
                    htmlFor="fechaExpedicion"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de expedicion
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="fechaExpedicion"
                      name="fechaExpedicion"
                      placeholder="Digita la fecha de expedicion"
                      className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                      value={fechaExpedicion}
                      required={true}
                      onChange={(e) => setFechaExpedicion(e.target.value)}
                    />
                  </div>
                </div>) : null}

              {Object.keys(documentos).length !== 0 && documentos.numeroDocumento !== "" ? (
                <div>
                  <label
                    htmlFor="codigo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número de documento
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      placeholder="Digita el nombre del documento"
                      className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                      value={numeroDocumento}
                      required={true}
                      onChange={(e) => setNumeroDocumento(e.target.value)}
                    />
                  </div>
                </div>) : null}

              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documento
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    id="documento"
                    name="documento"
                    placeholder="Digita el nombre del cargo"
                    className={"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                    accept=".pdf"
                    onChange={(e) => handleSoporteDocumento(e.target.files[0])}
                  />
                </div>
                {errorSoporteDocumento === true && (
                  <span className="text-red-500 text-xs">
                    El tamaño máximo es 1mb
                  </span>
                )}
                <div className="mt-3">
                  {documentos.documento && (
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/${documentos.documento}`}
                      download={documentos.documento}
                      target="_blank"
                      className="underline text-blue-500 pt-5"
                    >
                      Ver documento
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* {msg && <Alert alerta={alerta} />} */}

            <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto pt-10">
              <Link
                to="/requisitos-cargos/listar-requisitos-cargos"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioRequisitosCargos;
