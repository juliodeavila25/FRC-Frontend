import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex space-x-2 items-center">
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Ingrese su búsqueda"
        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      ></input>
    </div>
  );
};

export default GlobalFilter;
