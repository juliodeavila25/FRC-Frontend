import { useEffect, Fragment, useState } from "react";
import useOfertas from "../hooks/useOfertas";
import useAuth from "../hooks/useAuth";
import Admin from "../components/dashboard/Admin";
import ModalFillCurriculum from "../components/ModalFillCurriculum";
import { XCircleIcon } from "@heroicons/react/20/solid";
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

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
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

const projects = [
  {
    id: 1,
    title: "GraphQL API",
    initials: "GA",
    team: "Engineering",
    members: [
      {
        name: "Dries Vincent",
        handle: "driesvincent",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        handle: "courtneyhenry",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        handle: "tomcook",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
    totalMembers: 12,
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-pink-600",
  },
  // More projects...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [open, setOpen] = useState(0);
  const { ofertas } = useOfertas();
  const { auth, obtenerUsuarioAutenticado, usuarioAutenticado } = useAuth();

  //console.log(auth?.userType[0]);

  //console.log(ofertas);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    obtenerUsuarioAutenticado();
  }, [auth]);

  console.log(usuarioAutenticado);

  return (
    <>
      {auth?.userType[0] === "admin" ? <Admin /> : null}
      {Object.keys(usuarioAutenticado).length !== 0 &&
      usuarioAutenticado &&
      usuarioAutenticado?.userType[0] === "colaborador" &&
      usuarioAutenticado?.estado === "por_completar" ? (
        <ModalFillCurriculum />
      ) : null}

      {Object.keys(usuarioAutenticado).length !== 0 &&
      usuarioAutenticado &&
      usuarioAutenticado?.userType[0] === "aspirante" &&
      usuarioAutenticado?.estado === "inicial_completado" ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Pendiente: Administrador debe validar la información digitada
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc space-y-1 pl-5">
                  <li>
                    {" "}
                    Para descargar{" "}
                    <span className="font-bold">
                      Certificado laboral y Desprendibles de Nominas{" "}
                    </span>{" "}
                    es necesario actualizar todos los datos de la hoja de vida
                    (Seguridad Social, Información Financiera y Documentos
                    Requeridos ), una vez seas validado(a) por el administrador.{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
              Espere pronto novedades en esta sección.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="w-11/12 mx-auto pt-2">
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(1)}
            >
              <div className="flex space-x-3 items-center">
                <FcBusinessContact className="text-lg" />
                <p>Turno 01/08/2023 - UCI</p>
              </div>
            </AccordionHeader>
            <AccordionBody className=" h-screen">
              <object
                data="http://africau.edu/images/default/sample.pdf"
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href="http://africau.edu/images/default/sample.pdf">
                    to the PDF!
                  </a>
                </p>
              </object>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader
              className="text-base font-semibold text-gray-900"
              onClick={() => handleOpen(2)}
            >
              <div className="flex space-x-3 items-center">
                <FcAssistant className="text-lg" />
                <p>Turno 01/08/2023 - Intermedio</p>
              </div>
            </AccordionHeader>
            <AccordionBody className=" h-screen">
              <object
                data="http://africau.edu/images/default/sample.pdf"
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href="http://africau.edu/images/default/sample.pdf">
                    to the PDF!
                  </a>
                </p>
              </object>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </>
  );
}
