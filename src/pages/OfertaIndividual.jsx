import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useOfertas from "../hooks/useOfertas";
import usePostulaciones from "../hooks/usePostulaciones";
import useAuth from "../hooks/useAuth";
import useCargos from "../hooks/useCargos";
import { BeatLoader } from "react-spinners";
import swal from "sweetalert";
import ModalRequistos from "../components/ModalRequisitos";
import { FcDocument } from "react-icons/fc";
import ListadoRequisitos from "../components/human_resources/ListadoRequisitos"

const OfertaIndividual = () => {
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;

  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [convocatoria, setConvocatoria] = useState("");
  const [fechaInicio, setFechaInicio] = useState(date);
  const [fechaFin, setFechaFin] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [salario, setSalario] = useState("");
  const [auxilio, setAuxilio] = useState("");
  const [bonificaciones, setBonificaciones] = useState("");
  const [perfil, setPerfil] = useState("");
  const [funciones, setFunciones] = useState("");
  const [estadoConvocatoria, setEstadoConvocatoria] = useState("Activa");

  const [idUsuario, setIdUsuario] = useState("");
  const [idOferta, setIdOferta] = useState("");
  const [estadoAplicacionOferta, setEstadoAplicacionOferta] =
    useState("Postulado");

  const [visible, setVisible] = useState(false);
  const [requisitosCargos, setRequisitosCargos] = useState([]);

  const params = useParams();



  const {
    submitOferta,
    mostrarAlerta,
    alerta,
    obtenerOferta,
    oferta,
    cargandoDataCargos
  } = useOfertas();

  const { obtenerCargosForm, cargosForm, cargandoDataForm } = useCargos();

  const { auth, cargando } = useAuth();

  const { nuevaPostulacion, postulaciones } = usePostulaciones();

  useEffect(() => {
    obtenerOferta(params.id);
  }, []);

  useEffect(() => {
    if (params.id) {
      setId(oferta._id);
      setNombre(Array.isArray(cargosForm) && cargosForm.length > 0 && cargosForm?.filter(item => item._id === oferta.nombre)[0]?.nombre);
      setConvocatoria(oferta.convocatoria);
      setCiudad(oferta.ciudad);
      setSalario(oferta.salario);
      setAuxilio(oferta.auxilio);
      setBonificaciones(oferta.bonificaciones);
      setPerfil(oferta.perfil);
      setFunciones(oferta.funciones);
      setFechaInicio(oferta.fechaInicio?.split("T")[0]);
      setFechaFin(oferta.fechaFin?.split("T")[0]);
      setEstadoConvocatoria(oferta.estadoConvocatoria);
      setIdUsuario(auth._id);
      setIdOferta(oferta._id);

      // let cargos = cargosForm.filter((item) => item.nombre === oferta.nombre);

      // setRequisitosCargos(cargos);
    }
  }, [oferta, cargosForm]);




  useEffect(() => {
    let cargos = cargosForm.filter((item) => item.nombre === oferta.nombre);

    setRequisitosCargos(cargos);

    console.log("Holaaaa: ", cargosForm)
  }, [cargosForm])

  useEffect(() => {
    obtenerCargosForm();
  }, [oferta]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    swal({
      title: "Aplicar a oferta",
      text: "¿Estas seguro(a) que deseas aplicar a esta oferta?",
      icon: "info",
      buttons: ["No", "Si"],
    })
      .then((respuesta) => {
        if (respuesta) {
          nuevaPostulacion({
            idUsuario,
            idOferta,
            estadoAplicacionOferta,
          });
          swal({
            text: "Se ha aplicado a esta oferta con éxito",
            icon: "success",
          });
        }
      })
      .then(function () {
        navigate("/ofertas");
      });

    //Pasar los datos hacia el provider
    // await submitOferta({
    //     id,
    //     nombre,
    //     convocatoria,
    //     ciudad,
    //     salario,
    //     auxilio,
    //     bonificaciones,
    //     perfil,
    //     funciones,
    //     fechaInicio,
    //     fechaFin,
    //     estadoConvocatoria
    // });
  };

  const activateModal = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  const setShowModal = () => {
    setVisible(false);
  };

  if (cargandoDataForm) return <BeatLoader color="#36d7b7" />;


  console.log("cargosForm: ", cargandoDataCargos, cargandoDataForm)

  return (
    <>
      {Array.isArray(cargosForm) && cargosForm.length > 0 && visible === true && <ModalRequistos setShowModal={setShowModal} listadoCargos={cargosForm} selectedCargo={nombre} idOferta={id} oferta={oferta} />}
      <div className="sm:mx-auto sm:w-full">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <form className="space-y-6 ">
            <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
              Convocatoria
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="convocatoria"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nro. Convocatoria <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="convocatoria"
                    name="convocatoria"
                    placeholder="Digita tu correo electrónico"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={convocatoria}
                    disabled={true}
                    required="true"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Convocatoria <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="nombre"
                    placeholder="Digita tu nombre completo"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={nombre}
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="fechaInicio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha Inicio <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="fechaInicio"
                    name="fechaInicio"
                    type="date"
                    autoComplete="fechaInicio"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={fechaInicio}
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="fechaFin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha fin <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="fechaFin"
                    name="fechaFin"
                    type="date"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={fechaFin}
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ciudad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ciudad <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="ciudad"
                    name="ciudad"
                    type="text"
                    placeholder="Digita tu numero de documento"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={ciudad}
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="salario"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salario <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="salario"
                    name="salario"
                    type="text"
                    placeholder="Seleccione su fecha de nacimiento"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={salario}
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="auxilio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Auxilio <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="auxilio"
                    name="auxilio"
                    type="text"
                    placeholder="Digite su lugar de nacimiento"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={auxilio}
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="bonificaciones"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bonificaciones <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="bonificaciones"
                    name="bonificaciones"
                    type="text"
                    placeholder="Digite su número de telefono"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={bonificaciones}
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="perfil"
                  className="block text-sm font-medium text-gray-700"
                >
                  Perfil <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="perfil"
                    name="perfil"
                    type="text"
                    placeholder="Digite su correo electrónico"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={perfil}
                    disabled={true}
                    rows="6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="funciones"
                  className="block text-sm font-medium text-gray-700"
                >
                  Funciones <span class="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="funciones"
                    name="funciones"
                    type="funciones"
                    placeholder="Digite su dirección"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={funciones}
                    disabled={true}
                    rows="6"
                  />
                </div>
              </div>
            </div>
            <div className="text-left text-lg text-gray-700 mt-8 font-medium border-b-2 border-corporative-blue inline-flex">
              Listado de documentos requeridos para aplicar a esta oferta
            </div>
            <div className="grid grid-cols-3 gap-6 mb-10">
              {console.log(nombre)}
              {Array.isArray(cargosForm) && cargosForm.length > 0 ? <ListadoRequisitos listadoCargos={cargosForm} selectedCargo={oferta.nombre} /> : null}
            </div>

            <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
              <Link
                to="/ofertas"
                className="flex w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancelar
              </Link>
              {Array.isArray(postulaciones) &&
                postulaciones.filter(
                  (postulacion) => postulacion._id === oferta._id
                ).length === 0 ? (
                <input
                  type="button"
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                  value="Aplicar a oferta"
                  onClick={(e) => activateModal(e)}
                />
              ) : (
                <input
                  type="button"
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                  value="Ya aplicaste a esta oferta"
                  disabled={true}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OfertaIndividual;
