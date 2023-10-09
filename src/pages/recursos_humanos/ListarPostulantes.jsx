import { useEffect, Fragment, useState } from "react";
import useOfertas from "../../hooks/useOfertas";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  FcBusinessContact,
  FcInspection,
  FcAssistant,
  FcCancel,
  FcOk,
  FcBriefcase,
  FcManager,
  FcFile,
} from "react-icons/fc";
import Table from "../../components/table/Table";
import ModalPostulaciones from "../../components/ModalPostulaciones";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const ListarPostulantes = () => {
  const [open, setOpen] = useState(0);
  const [curriculums, setCurriculums] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataCurriculum, setDataCurriculum] = useState("");
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const navigate = useNavigate();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const params = useParams();
  const { obtenerPostulantesPorOferta, postulantes } = useOfertas();



  useEffect(() => {
    obtenerPostulantesPorOferta(params.id);
  }, []);

  useEffect(() => {
    if (Array.isArray(postulantes) && postulantes.length > 0) {
      let newArrays = [];
      postulantes.map((el, index) => {
        const postulante = postulantes.filter(
          (item) => item.creador === el.creador
        );
        console.log("postulante:", postulante[index]);
        newArrays.push(Object.assign({}, ...postulante));
      });

      let newArraysUnique = [
        ...new Map(newArrays.map((item) => [item._id, item])).values(),
      ];
      setCurriculums(newArraysUnique);
    } else {
      setCurriculums([]);
    }
  }, [postulantes]);

  const [headers, setHeaders] = useState([
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    { Header: "Documento", accessor: "numeroDocumento" },
    { Header: "Titulo", accessor: "titulo" },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={() =>
              navigate(
                `/recursos-humanos/convocatoria/postulante/${originalRow._id}`
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={(e) => activateModal(e, originalRow)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor "
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ]);

  const [generalHeaders, seteGneralHeaders] = useState([
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    { Header: "Documento", accessor: "numeroDocumento" },
    { Header: "Titulo", accessor: "titulo" },
    { Header: "Etapa", accessor: "estadoAplicacionOferta" },
    {
      Header: " ",
      accessor: (originalRow, rowIndex) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={() =>
              navigate(
                `/recursos-humanos/convocatoria/postulante/${originalRow._id}`
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          <button
            className="text-blue-500 hover:text-blue-900"
            onClick={(e) => activateModal(e, originalRow)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor "
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ]);

  console.log(curriculums);

  const activateModal = (e, data) => {
    e.preventDefault();
    setVisible(true);
    setDataCurriculum(data);
  };

  const setShowModal = () => {
    setVisible(false);
  };

  return (
    <Fragment>
      {visible === true && (
        <ModalPostulaciones setShowModal={setShowModal} data={dataCurriculum} />
      )}
      <div className="px-4 sm:px-6 lg:px-10 mt-5 mb-5 ">
        <div className="mt-8 flex flex-col">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Listado de postulantes
              </h1>
              <div className="flex space-x-1 items-center">
                <FcBriefcase className="text-lg" />
                <p className="font-semibold text-gray-900 italic">
                  Cargo:{" "}
                  <span className="font-light capitalize">{params.cargo}</span>
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to="/recursos-humanos/listar-convocatorias"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
              >
                Regresar
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-10">
        <div className="flex justify-between bg-gray-100 rounded-t-lg">
          <button
            className={
              toggleState === 1
                ? "border-indigo-500 text-indigo-600 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
            }
            onClick={() => toggleTab(1)}
          >
            Listado por etapas
          </button>
          <button
            className={
              toggleState === 2
                ? "border-indigo-500 text-indigo-600 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
            }
            onClick={() => toggleTab(2)}
          >
            Listado General
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <div className="w-11/12 mx-auto ">
              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(1)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcBusinessContact className="text-lg" />
                    <p>
                      Postulado (
                      <span>
                        {Array.isArray(curriculums) && curriculums.length > 0
                          ? curriculums.filter(
                            (curriculum) =>
                              curriculum.estadoAplicacionOferta ===
                              "Postulado"
                          ).length
                          : 0}
                      </span>
                      )
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {Array.isArray(curriculums) &&
                    curriculums.length > 0 &&
                    curriculums.filter(
                      (curriculum) =>
                        curriculum.estadoAplicacionOferta === "Postulado"
                    ).length > 0 ? (
                    <>
                      <Table
                        data={curriculums.filter(
                          (curriculum) =>
                            curriculum.estadoAplicacionOferta === "Postulado"
                        )}
                        columns={headers}
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
                            No existen postulantes Postulado.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(2)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcInspection className="text-lg" />
                    <p>
                      {" "}
                      Preseleccionado (
                      <span>
                        {Array.isArray(curriculums) && curriculums.length > 0
                          ? curriculums.filter(
                            (curriculum) =>
                              curriculum.estadoAplicacionOferta ===
                              "Preseleccionado"
                          ).length
                          : 0}
                      </span>
                      )
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {Array.isArray(curriculums) &&
                    curriculums.length > 0 &&
                    curriculums.filter(
                      (curriculum) =>
                        curriculum.estadoAplicacionOferta === "Preseleccionado"
                    ).length > 0 ? (
                    <>
                      <Table
                        data={curriculums.filter(
                          (curriculum) =>
                            curriculum.estadoAplicacionOferta ===
                            "Preseleccionado"
                        )}
                        columns={headers}
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
                            No existen postulantes preseleccionados.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(3)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcAssistant className="text-lg" />
                    <p>
                      {" "}
                      En entrevista (
                      <span>
                        {Array.isArray(curriculums) && curriculums.length > 0
                          ? curriculums.filter(
                            (curriculum) =>
                              curriculum.estadoAplicacionOferta ===
                              "En entrevista"
                          ).length
                          : 0}
                      </span>
                      )
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {Array.isArray(curriculums) &&
                    curriculums.length > 0 &&
                    curriculums.filter(
                      (curriculum) =>
                        curriculum.estadoAplicacionOferta ===
                        "En entrevista"
                    ).length > 0 ? (
                    <>
                      <Table
                        data={curriculums.filter(
                          (curriculum) =>
                            curriculum.estadoAplicacionOferta ===
                            "En entrevista"
                        )}
                        columns={headers}
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
                            No existen postulantes con entrevistas realizadas.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </AccordionBody>
              </Accordion>

              <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(4)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcManager className="text-lg" />
                    <p>
                      Exámenes Ocupacionales (
                      <span>
                        {Array.isArray(curriculums) && curriculums.length > 0
                          ? curriculums.filter(
                            (curriculum) =>
                              curriculum.estadoAplicacionOferta ===
                              "Exámenes Ocupacionales"
                          ).length
                          : 0}
                      </span>
                      )
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {Array.isArray(curriculums) &&
                    curriculums.length > 0 &&
                    curriculums.filter(
                      (curriculum) =>
                        curriculum.estadoAplicacionOferta ===
                        "Exámenes Ocupacionales"
                    ).length > 0 ? (
                    <>
                      <Table
                        data={curriculums.filter(
                          (curriculum) =>
                            curriculum.estadoAplicacionOferta ===
                            "Exámenes Ocupacionales"
                        )}
                        columns={headers}
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
                            No existen postulantes en exámenes medicos.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </AccordionBody>
              </Accordion>


              <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(5)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcOk className="text-lg" />
                    <p>
                      Contratado (
                      <span>
                        {Array.isArray(curriculums) && curriculums.length > 0
                          ? curriculums.filter(
                            (curriculum) =>
                              curriculum.estadoAplicacionOferta ===
                              "Contratado"
                          ).length
                          : 0}
                      </span>
                      )
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {Array.isArray(curriculums) &&
                    curriculums.length > 0 &&
                    curriculums.filter(
                      (curriculum) =>
                        curriculum.estadoAplicacionOferta === "Contratado"
                    ).length > 0 ? (
                    <>
                      <Table
                        data={curriculums.filter(
                          (curriculum) =>
                            curriculum.estadoAplicacionOferta === "Contratado"
                        )}
                        columns={headers}
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
                            No existen postulantes contratados.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </AccordionBody>
              </Accordion>

              <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(6)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcFile className="text-lg" />
                    <p>
                      Afiliaciones (
                      <span>
                        {Array.isArray(curriculums) && curriculums.length > 0
                          ? curriculums.filter(
                            (curriculum) =>
                              curriculum.estadoAplicacionOferta ===
                              "Afiliaciones"
                          ).length
                          : 0}
                      </span>
                      )
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {Array.isArray(curriculums) &&
                    curriculums.length > 0 &&
                    curriculums.filter(
                      (curriculum) =>
                        curriculum.estadoAplicacionOferta === "Afiliaciones"
                    ).length > 0 ? (
                    <>
                      <Table
                        data={curriculums.filter(
                          (curriculum) =>
                            curriculum.estadoAplicacionOferta === "Afiliaciones"
                        )}
                        columns={headers}
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
                            No existen postulantes en afiliaciones.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </AccordionBody>
              </Accordion>


              <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
                <AccordionHeader
                  className="text-base font-semibold text-gray-900"
                  onClick={() => handleOpen(7)}
                >
                  <div className="flex space-x-3 items-center">
                    <FcCancel className="text-lg" />
                    <p>
                      No continúa (
                      <span>
                        {Array.isArray(curriculums) && curriculums.length > 0
                          ? curriculums.filter(
                            (curriculum) =>
                              curriculum.estadoAplicacionOferta ===
                              "No continúa"
                          ).length
                          : 0}
                      </span>
                      )
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {Array.isArray(curriculums) &&
                    curriculums.length > 0 &&
                    curriculums.filter(
                      (curriculum) =>
                        curriculum.estadoAplicacionOferta === "No continúa"
                    ).length > 0 ? (
                    <>
                      <Table
                        data={curriculums.filter(
                          (curriculum) =>
                            curriculum.estadoAplicacionOferta === "No continúa"
                        )}
                        columns={headers}
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
                            No existen postulantes que no continúan.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </AccordionBody>
              </Accordion>
            </div>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            {Array.isArray(curriculums) && curriculums.length > 0 ? (
              <>
                <Table data={curriculums} columns={generalHeaders} />
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
                      No existen postulantes Postulado.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListarPostulantes;
