import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  Bars4Icon,
  ClockIcon,
  HomeIcon,
  XMarkIcon,
  BriefcaseIcon,
  ArrowPathRoundedSquareIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  UsersIcon,
  TableCellsIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  QueueListIcon,
  WrenchIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

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
    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
  />
</svg>;

import {
  ChevronUpDownIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Header from "./Header";
import Body from "./Body";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useCurriculum from "../../../hooks/useCurriculum";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { auth, obtenerUsuarioAutenticado, usuarioAutenticado } = useAuth();
  const { curriculum, obtenerCurriculum } = useCurriculum();

  useEffect(() => {
    obtenerUsuarioAutenticado();
    obtenerCurriculum(auth._id);
  }, [auth]);

  const navigation_admin = [
    {
      name: "Inicio",
      href: "/dashboard",
      icon: HomeIcon,
      current: location.pathname.includes("/dashboard") ? true : false,
    },
  ];

  const navigation_aspirante = [
    {
      name: "Inicio",
      href: "/dashboard",
      icon: HomeIcon,
      current: location.pathname.includes("/dashboard") ? true : false,
    },
    {
      name: "Mi Hoja de Vida",
      href: "/curriculum/crear-curriculum",
      icon: Bars4Icon,
      current: location.pathname.includes("/curriculum") ? true : false,
    },
  ];

  const navigation_hv_inicial = [
    // {
    //   name: "Sarlaft",
    //   href: "/sarlaft/crear-sarlaft",
    //   icon: BriefcaseIcon,
    //   current: location.pathname.includes("/sarlaft") ? true : false,
    // },
    {
      name: "Listado de Requisitos",
      href: "/requisitos-cargos/listar-requisitos-cargos",
      icon: BriefcaseIcon,
      current: location.pathname.includes("/requisitos-cargos") ? true : false,
    },
    {
      name: "Ofertas de empleo",
      href: "/ofertas",
      icon: BriefcaseIcon,
      current: location.pathname.includes("/ofertas") ? true : false,
    }

  ];

  const navigation_recursos_humanos = [
    {
      name: "Inicio",
      href: "/dashboard",
      icon: HomeIcon,
      current: location.pathname.includes("/dashboard") ? true : false,
    },
    {
      name: "Colaboradores",
      href: "/colaboradores",
      icon: UsersIcon,
      current: location.pathname.includes("/colaboradores") ? true : false,
    },
    {
      name: "Aspirantes",
      href: "/aspirantes",
      icon: UsersIcon,
      current: location.pathname.includes("/aspirantes") ? true : false,
    },
    {
      name: "Requisitos",
      href: "/requisitos/listar-requisitos",
      icon: QueueListIcon,
      current: location.pathname.includes("/requisitos") ? true : false,
    },
    {
      name: "Herramientas",
      href: "/herramientas/listar-herramientas",
      icon: WrenchIcon,
      current: location.pathname.includes("/herramientas") ? true : false,
    },
    {
      name: "Preguntas",
      href: "/preguntas/listar-preguntas",
      icon: QuestionMarkCircleIcon,
      current: location.pathname.includes("/preguntas") ? true : false,
    },
    {
      name: "Cargos",
      href: "/cargos/listar-cargos",
      icon: AcademicCapIcon,
      current: location.pathname.includes("/cargos") ? true : false,
    },
    {
      name: "Unidades de negocio",
      href: "/unidades-negocio/listar-unidades-negocio",
      icon: BuildingOfficeIcon,
      current: location.pathname.includes("/unidades-negocio") ? true : false,
    },
    {
      name: "Unidades funcionales",
      href: "/unidades-funcionales/listar-unidades-funcionales",
      icon: BuildingOffice2Icon,
      current: location.pathname.includes("/unidades-funcionales") ? true : false,
    },

    {
      name: "Ofertas de empleo",
      href: "/recursos-humanos/listar-convocatorias",
      icon: TableCellsIcon,
      current: location.pathname.includes("/recursos-humanos") ? true : false,
    },
    {
      name: "Documentos",
      href: "/documentos/listar-documentos",
      icon: ClipboardDocumentListIcon,
      current: location.pathname.includes("/documentos") ? true : false,
    },

  ];

  const navigation_gerente = [
    {
      name: "Inicio",
      href: "/dashboard",
      icon: HomeIcon,
      current: location.pathname.includes("/dashboard") ? true : false,
    },
    {
      name: "Colaboradores",
      href: "/colaboradores",
      icon: UsersIcon,
      current: location.pathname.includes("/colaboradores") ? true : false,
    },
    {
      name: "Aspirantes",
      href: "/aspirantes",
      icon: UsersIcon,
      current: location.pathname.includes("/aspirantes") ? true : false,
    },
    {
      name: "Requisitos",
      href: "/requisitos/listar-requisitos",
      icon: QueueListIcon,
      current: location.pathname.includes("/requisitos") ? true : false,
    },
    {
      name: "Cargos",
      href: "/cargos/listar-cargos",
      icon: AcademicCapIcon,
      current: location.pathname.includes("/cargos") ? true : false,
    },
    {
      name: "Unidades de negocio",
      href: "/unidades-negocio/listar-unidades-negocio",
      icon: BuildingOfficeIcon,
      current: location.pathname.includes("/unidades-negocio") ? true : false,
    },
    {
      name: "Unidades funcionales",
      href: "/unidades-funcionales/listar-unidades-funcionales",
      icon: BuildingOffice2Icon,
      current: location.pathname.includes("/unidades-funcionales") ? true : false,
    },

    {
      name: "Ofertas de empleo",
      href: "/recursos-humanos/listar-convocatorias",
      icon: TableCellsIcon,
      current: location.pathname.includes("/recursos-humanos") ? true : false,
    },
    {
      name: "Documentos",
      href: "/documentos/listar-documentos",
      icon: ClipboardDocumentListIcon,
      current: location.pathname.includes("/documentos") ? true : false,
    },

  ];

  const solicitudes = [
    {
      name: "Certificado Laboral",
      href: "/solicitudes/certificado-laboral",
      icon: DocumentTextIcon,
      current: location.pathname.includes("/solicitudes") ? true : false,
    },
    {
      name: "Desprendible Nómina",
      href: "/solicitudes/listado-certificado-desprendible",
      icon: DocumentCheckIcon,
      current: location.pathname.includes("/solicitudes") ? true : false,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="px-2">
                    <div className="space-y-1">
                      {auth?.userType[0] === "admin"
                        ? navigation_admin.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))
                        : ""}

                      {auth?.userType[0] === "aspirante" ||
                        auth?.userType[0] === "colaborador"
                        ? navigation_aspirante.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))
                        : ""}

                      {auth?.userType[0] !== "recursos_humanos" && auth?.userType[0] !== "gerente" &&
                        auth?.estado !== "inicial"
                        ? navigation_hv_inicial.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))
                        : ""}

                      {auth?.userType[0] === "gerente" &&
                        navigation_gerente.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}

                      {auth?.userType[0] === "recursos_humanos" &&
                        navigation_recursos_humanos.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                    </div>

                    {Object.keys(usuarioAutenticado).length !== 0 &&
                      usuarioAutenticado &&
                      usuarioAutenticado?.userType[0] === "colaborador" &&
                      usuarioAutenticado?.estado === "completado" &&
                      Array.isArray(curriculum) &&
                      curriculum.length > 0 &&
                      (curriculum[0].empresa === "Fundación Renal de Colombia" || curriculum[0].empresa === "GEIPAS") ? (
                      <div className="mt-8">
                        <h3
                          className="px-3 text-lg font-medium text-gray-500"
                          id="mobile-teams-headline"
                        >
                          Solicitudes
                        </h3>
                        <div
                          className="mt-1 space-y-1"
                          role="group"
                          aria-labelledby="mobile-teams-headline"
                        >
                          {solicitudes.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                                "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? "text-gray-500"
                                    : "text-gray-400 group-hover:text-gray-500",
                                  "mr-3 flex-shrink-0 h-6 w-6"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
        <div className="flex flex-shrink-0 items-center px-6">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500"
            alt="Your Company"
          />
        </div>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
          {/* User account dropdown */}
          <Menu as="div" className="relative inline-block px-3 text-left">
            <div>
              <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="flex w-full items-center justify-between">
                  <span className="flex min-w-0 items-center justify-between space-x-3">
                    <img
                      className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                      src="https://images.unsplash.com/photo-1585960691786-a593e76d3847?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvc3BpdGFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      alt=""
                    />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium text-gray-900">
                        {auth.nombre}
                      </span>
                      <span className="truncate text-sm text-gray-500">
                        {auth.email}
                      </span>
                    </span>
                  </span>
                  {/* <ChevronUpDownIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  /> */}
                </span>
              </Menu.Button>
            </div>
            {/* <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        View profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Notifications
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Get desktop app
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Logout
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition> */}
          </Menu>
          {/* Sidebar Search */}
          {/* <div className="mt-5 px-3">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                aria-hidden="true"
              >
                <MagnifyingGlassIcon
                  className="mr-3 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-8"
                placeholder="Search"
              />
            </div>
          </div> */}
          {/* Navigation */}
          <nav className="mt-10 px-3">
            <div className="space-y-1">
              {auth?.userType[0] === "admin"
                ? navigation_admin.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))
                : ""}

              {auth?.userType[0] === "aspirante" ||
                auth?.userType[0] === "colaborador"
                ? navigation_aspirante.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))
                : ""}

              {auth?.userType[0] !== "recursos_humanos" && auth?.userType[0] !== "gerente" &&
                auth?.estado !== "inicial"
                ? navigation_hv_inicial.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))
                : ""}

              {auth?.userType[0] === "recursos_humanos" &&
                navigation_recursos_humanos.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}

              {auth?.userType[0] === "gerente" &&
                navigation_gerente.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
            </div>
            {Object.keys(usuarioAutenticado).length !== 0 &&
              usuarioAutenticado &&
              usuarioAutenticado?.userType[0] === "colaborador" &&
              usuarioAutenticado?.estado === "completado" &&
              Array.isArray(curriculum) &&
              curriculum.length > 0 &&
              (curriculum[0].empresa === "Fundación Renal de Colombia" || curriculum[0].empresa === "GEIPAS") ? (
              <div className="mt-8">
                {/* Secondary navigation */}
                <h3
                  className="px-3 text-lg font-medium text-blue-500"
                  id="desktop-teams-headline"
                >
                  Solicitudes
                </h3>
                <div
                  className="mt-1 space-y-1"
                  role="group"
                  aria-labelledby="desktop-teams-headline"
                >
                  {solicitudes.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                        "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-3 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </nav>
        </div>
      </div>

      <div className="flex flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1">
              <form className="flex w-full md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <MagnifyingGlassIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search-field"
                    name="search-field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            View profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Notifications
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Get desktop app
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1 bg-white">
          <Header />
          <Body />
        </main>
      </div>
    </>
  );
};

export default Sidebar;
