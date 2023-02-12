import useAuth from "../../../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <>
      <div className="border-b border-gray-200 px-4 py-4 flex items-center sjustify-between sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg  leading-6 text-gray-700 truncate w-4/5"></h1>
        </div>
        <div className=" flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="sm:order-0 order-1 ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-0"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
