import { useEffect, useState } from 'react'
import usePostulaciones from '../hooks/usePostulaciones';
import useOfertas from "../hooks/useOfertas";
import useAuth from "../hooks/useAuth";
import ModalFillCurriculum from "../components/ModalFillCurriculum";
import Table from "../components/table/Table";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import swal from 'sweetalert'
import moment from 'moment'

const Ofertas = () => {

  const { ofertas, cargandoData } = useOfertas();
  const { auth, obtenerUsuarioAutenticado, usuarioAutenticado } = useAuth();
  const navigate = useNavigate();

  const { nuevaPostulacion, postulaciones, cargandoDataCargos, postulacionesFiltradas } = usePostulaciones();

  console.log(postulacionesFiltradas)

  useEffect(() => {
    obtenerUsuarioAutenticado()
  }, [auth])

  useEffect(() => {
    setHeaders([
      {
        Header: "Nro. Convocatoria",
        accessor: "convocatoria",
      },
      { Header: "Cargo", accessor: "nombre" },
      { Header: "Ciudad", accessor: "ciudad" },
      {
        Header: "Fecha de inicio",
        accessor: "fechaInicio",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: "Fecha de finalización",
        accessor: "fechaFin",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: " ",
        accessor: (originalRow, rowIndex) => (
          <div className='flex items-center space-x-2'>
            <div>
              <button
                className="text-blue-500 hover:text-blue-900"
                onClick={() =>
                  navigate(`/ofertas/listar-oferta/${originalRow._id}`)
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <div>
              {Array.isArray(postulaciones) && postulaciones.filter(postulacion => postulacion._id === originalRow._id).length === 0 ? (

                <button
                  className={"text-blue-500 hover:text-blue-900  "}
                  onClick={() => aplicarOferta(originalRow._id)}

                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor " className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </button>
              ) : null}

            </div>
          </div>
        ),
      }
    ])
  }, [postulaciones])

  useEffect(() => {
    setHeadersOferta([
      {
        Header: "Nro. Convocatoria",
        accessor: "convocatoria",
      },
      { Header: "Cargo", accessor: "nombre" },
      { Header: "Ciudad", accessor: "ciudad" },
      {
        Header: "Fecha de postulación",
        accessor: "createdAt",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },

      {
        Header: "Estado",
        accessor: (originalRow, rowIndex) => (
          <div>
            {Array.isArray(postulacionesFiltradas) && postulacionesFiltradas.filter(postulacion => postulacion.idOferta === originalRow._id).map(item => { return <p key={item.id}>{item.estadoAplicacionOferta}</p> })}
          </div>
        ),
      },
      {
        Header: " ",
        accessor: (originalRow, rowIndex) => (
          <div className='flex items-center space-x-2'>
            <div>
              <button
                className="text-blue-500 hover:text-blue-900"
                onClick={() =>
                  navigate(`/ofertas/listar-oferta/${originalRow._id}`)
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        ),
      }
    ])
  }, [postulaciones])




  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };




  const aplicarOferta = (data) => {

    let idUsuario = auth._id
    let idOferta = data
    let estadoAplicacionOferta = "Postulado"


    swal({
      title: "Aplicar a oferta",
      text: "¿Estas seguro(a) que deseas aplicar a esta oferta?",
      icon: "info",
      buttons: ["No", "Si"]
    }).then(respuesta => {
      if (respuesta) {

        nuevaPostulacion({
          idUsuario,
          idOferta,
          estadoAplicacionOferta
        })
        swal({
          text: "Se ha aplicado a esta oferta con éxito",
          icon: "success"
        })
      }
    }).then(function () {
      navigate("/ofertas");
    })

  }

  const [headers, setHeaders] = useState([]);
  const [headersOferta, setHeadersOferta] = useState([]);


  if (cargandoDataCargos && cargandoData) return <BeatLoader color="#36d7b7" />;

  return (
    <>
      {Object.keys(usuarioAutenticado).length !== 0 && usuarioAutenticado && usuarioAutenticado?.userType[0] === "colaborador" && usuarioAutenticado?.estado === "por_completar" ? (
        <ModalFillCurriculum />
      ) : null}
      <div className="w-11/12 mx-auto mt-10 ">
        <div className="flex justify-around bg-gray-100 rounded-t-lg">
          <button
            className={toggleState === 1 ? 'border-indigo-500 text-indigo-600 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'}
            onClick={() => toggleTab(1)}
          >
            Listado de ofertas
            
          </button>
          <button
            className={toggleState === 2 ? 'border-indigo-500 text-indigo-600 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'}
            onClick={() => toggleTab(2)}
          >
            Ofertas aplicadas
          </button>
        </div>

        <div className="content-tabs ">
          <div
            className={toggleState === 1 ? "content  active-content" : "content"}
          >
             {Array.isArray(ofertas) && ofertas.length > 0 && ofertas.filter(oferta => oferta.estadoConvocatoria === "Activa").length > 0 ? (
              <>
                <Table
                  data={ofertas.filter(oferta => oferta.estadoConvocatoria === "Activa")}
                  columns={headers}
                  title="Ofertas"
                  titleButton="Nueva oferta de empleo"
                  href={"/recursos-humanos/crear-convocatoria"}
                />
              </>
            ) : (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex ">
                    <p className="text-sm text-blue-700">
                    No existen ofertas activas.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={toggleState === 2 ? "content  active-content" : "content"}
          >
           {Array.isArray(postulaciones) && postulaciones.length > 0 ? (
              <>
                <Table
                  data={postulaciones}
                  columns={headersOferta}
                  title="Ofertas"
                  titleButton="Nueva oferta de empleo"
                  href={"/recursos-humanos/crear-convocatoria"}
                />
              </>
            ) : (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex ">
                    <p className="text-sm text-blue-700">
                    No has aplicado a ninguna oferta.
                    
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )

};

export default Ofertas;
