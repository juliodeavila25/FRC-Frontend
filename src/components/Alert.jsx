import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
const Alert = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "border-red-400 bg-red-50"
          : "border-green-400 bg-green-50 "
      } border-l-4 p-4 mb-5`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className={`${
              alerta.error ? "text-red-400" : "text-green-400  "
            } h-5 w-5`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p
            className={`${
              alerta.error ? "text-red-700" : "text-green-700 "
            } text-sm`}
          >
            {alerta.msg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
