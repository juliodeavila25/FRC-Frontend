import { useState, useEffect, version, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useCargos from "../../hooks/useCargos";
import Alert from "../Alert";
import useAuth from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";



const FormularioNuevoCargo = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [inputCargos, setInputCargos] = useState([
     { nombre_requisito: "Bachiller", vigencia:false, estado_requisito:"Activo" },
   ]);

  /* Error en el campo nombre del cargo*/
  const inputRef = useRef(null);
  const[errorNombre, setErrorNombre] = useState(false)


  const params = useParams();
  const {
    submitCargo,
    mostrarAlerta,
    alerta,
    cargo,
    cargandoDataCargos,
  } = useCargos();

  const { auth, cargando } = useAuth();

 
  useEffect(() => {
    if (params.id) {
      setId(cargo._id);
      setNombre(cargo.nombre);
      setInputCargos(cargo.inputCargos);
     
    }
  }, [cargo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(nombre === ""){
      inputRef.current.focus()
      setErrorNombre(true)
      return;
    }else{
      setErrorNombre(false)
    }

   
 

    await submitCargo({
        id,
        nombre,
        inputCargos
    })
    
   
  
  };


  
 const handleaddclick = () => {
    setInputCargos([
      ...inputCargos,
       { nombre_requisito: "Bachiller", vigencia:false, estado_requisito:"Activo" },
    ]);
  };

  const handleinputchange = (e, index) => {
    const { name, value, checked } = e.target;
    const list = [...inputCargos];
    if(e.target.type === "checkbox"){
        list[index][name] = checked;
    }else{
      list[index][name] = value;
    }
    setInputCargos(list);
  };

  const handleremove = (index) => {
    const list = [...inputCargos];
    list.splice(index, 1);
    setInputCargos(list);
  };


  const { msg } = alerta;

  if (cargandoDataCargos ) return <BeatLoader color="#36d7b7" />;

  return (
    <div className=" sm:mx-auto sm:w-full">
      <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">        
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div className="text-left text-xl text-gray-700 mt-8 font-bold border-b-4 border-corporative-blue inline-flex">
            Listado Maestro de Cargos
          </div>
          <div className="grid grid-cols-1 gap-6 ">
                <div>
                    <label
                        htmlFor="codigo"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nombre cargo <span className="text-red-700">*</span>
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        id="codigo"
                        name="codigo"
                        placeholder="Digita el nombre del cargo"
                        className={errorNombre === false ? 
                            "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            : 
                            "block w-full appearance-none rounded-md border border-red-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none  sm:text-sm"}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        ref={inputRef}
                        />
                        {errorNombre === true && <span className="text-red-500 text-xs">Digite la información requerida</span>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
                  <p className="font-medium p5">
                    Perfil de Riesgo
                  </p>
                  <br></br>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="electrico"
                      name="electrico"
                      value="electrico"
                      //checked={electrico}
                      //onChange={handleChangeElectrico}
                      //disabled={true}
                    />
                    <label htmlFor="electrico">Eléctrico</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="locativo"
                      name="locativo"
                      value="locativo"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="locativo">Locativo</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="mecanico"
                      name="mecanico"
                      value="mecanico"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="mecanico">Mecánico</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="biologico"
                      name="biologico"
                      value="biologico"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="biologico">Biológico</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="psicosocial"
                      name="psicosocial"
                      value="psicosocial"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="psicosocial">Psicosocial</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="carga_fisica"
                      name="carga_fisica"
                      value="carga_fisica"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="carga_fisica">Carga Fisica</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="quimicos"
                      name="quimicos"
                      value="quimicos"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="quimicos">Químicos</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="fisico"
                      name="fisico"
                      value="fisico"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="fisico">Físico</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="movilidad"
                      name="movilidad"
                      value="movilidad"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="movilidad">Movilidad</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="publico"
                      name="publico"
                      value="publico"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="publico">Publico</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="tareas_alto_riesgo"
                      name="tareas_alto_riesgo"
                      value="tareas_alto_riesgo"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="tareas_alto_riesgo">Tareas de Alto Riesgo</label>
                  </div>
                  <div className="flex space-x-4 items-center  pl-4">
                    <input
                      type="checkbox"
                      id="tecnologico"
                      name="tecnologico"
                      value="tecnologico"
                      //checked={prestamos}
                      //onChange={handleChangePrestamos}
                      //disabled={true}
                    />
                    <label htmlFor="tecnologico">Tecnológico</label>
                  </div>
                </div>
                <div>
                    {inputCargos &&
                    Array.isArray(inputCargos) &&
                    inputCargos.map((item, i) => {
                        return (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5 "
                        >
                            <div className="">
                            <label className="block text-sm font-medium text-gray-700">
                                Nombre requisito
                            </label>
                            <select
                              id="nombre_requisito"
                              name="nombre_requisito"
                              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              onChange={(e) => handleinputchange(e, i)}
                              value={item.nombre_requisito}
                              required={true}
                              disabled={Array.isArray(cargo.inputCargos) && i >= cargo.inputCargos?.length  || params.id === undefined && inputCargos.length >= 1 ? false : true}
                           
                            >
                              <option value="elegir" disabled className="text-gray-400" >
                                --Selecciona un tipo de documento--
                              </option>
                              <option value="Bachiller" >
                                 Bachiller
                              </option>
                              <option value="Titulo: Aux o Tec En Auxiliar De Enfermeria">
                                Titulo: Aux o Tec En Auxiliar De Enfermeria
                              </option>
                              <option value="Titulo: Medicina Gral">Titulo: Medicina Gral</option>
                              <option value="Titulo: Profesional De Enfermeria">Titulo: Profesional De Enfermeria</option>
                              <option value="Titulo: Instrumentador Quirurgico">Titulo: Instrumentador Quirurgico</option>
                              <option value="Titulo: Tecnologo En Imagenes Diagnostica">Titulo: Tecnologo En Imagenes Diagnostica</option>
                              <option value="Titulo: Bacteriologo">Titulo: Bacteriologo</option>
                              <option value="Titulo: Regencia De Farmacia">Titulo: Regencia De Farmacia</option>
                              <option value="Titulo: Fisioterapeuta">Titulo: Fisioterapeuta</option>
                              <option value="Titulo: Quimico Farmaceutico">Titulo: Quimico Farmaceutico</option>
                              <option value="Tarjeta Profesional">Tarjeta Profesional</option>
                              <option value="Rethus">Rethus</option>
                              <option value="Certificado Rcp ( Bls- Acls) Basico">Certificado Rcp ( Bls- Acls) Basico</option>
                              <option value="Certificado De Curso De Violencia Sexual">Certificado De Curso De Violencia Sexual</option>
                              <option value="Certificado De Curso Gestion Del Duelo">Certificado De Curso Gestion Del Duelo</option>
                              <option value="Certificado De Curso Agente Quimicos">Certificado De Curso Agente Quimicos</option>
                              <option value="Certificado De Curso Aiepi Clinico">Certificado De Curso Aiepi Clinico</option>
                              <option value="Certificado De Curso De Aimi">Certificado De Curso De Aimi</option>
                              <option value="Certificado De Toma De Muestra">Certificado De Toma De Muestra</option>
                              <option value="Certificado De Equivalencia De Medicamentos">Certificado De Equivalencia De Medicamentos</option>
                              <option value="Certificado Rcp ( Bls- Acls) ">Certificado Rcp ( Bls- Acls)</option>
                              <option value="Diplomado En Uci: Opcional">Diplomado En Uci: Opcional</option>
                              <option value="Certificado Rcp ( Bls- Acls) Avanzado">Certificado Rcp ( Bls- Acls) Avanzado</option>
                              <option value="Certificado De Equivalencia De Medicamento">Certificado De Equivalencia De Medicamento</option>
                              <option value="Actualizacion Y Manejo Del Fisoterapeutica En Cuidados Criticos">Actualizacion Y Manejo Del Fisoterapeutica En Cuidados Criticos</option>
                              <option value="Carnet De Radio Protección">Carnet De Radio Protección</option>

                            </select>
                             
                            </div>
                            <div className="flex space-x-4 items-center pl-4">
                              <input
                                type="checkbox"
                                id="vigencia"
                                name="vigencia"
                                value={item.vigencia}
                                checked={item.vigencia}
                                onChange={(e) => handleinputchange(e, i)}
                              />
                              <label htmlFor="vigencia">¿Tiene fecha de vigencia?</label>
                            </div>
                            <div className="">
                            <label className="block text-sm font-medium text-gray-700">
                                Estado requisito
                            </label>
                            <select
                                id="estado_requisito"
                                name="estado_requisito"
                                placeholder="Digita tu correo electrónico"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                onChange={(e) => handleinputchange(e, i)}
                                value={item.estado_requisito}
                                required={true}
                                >
                                <option value="Activo">
                                    Activo
                                </option>
                                <option value="Inactivo">
                                Inactivo
                                </option>
                                
                                </select>
                            </div>
                            <div>
                              <label
                                htmlFor="descripcionIngresos"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Descripción del requisito
                              </label>                              
                              <div>
                                <textarea
                                  id="descripcionIngresos"
                                  name="descripcionIngresos"
                                  type="text"
                                  placeholder=""
                                  rows="3"
                                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                // value={descripcionIngresos}
                                // onChange={(e) => setDescripcionIngresos(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-6 ">
                           
                            {Array.isArray(cargo.inputCargos) && i >= cargo.inputCargos?.length  || params.id === undefined && inputCargos.length !== 1 ? (
                                <button
                                className="h-8 flex items-center w-full justify-center rounded-md border-2 border-red-400 bg-transparent py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => handleremove(i)}
                                >
                                Remover
                                </button>
                            ) : null}


                            {inputCargos.length - 1 === i && (
                                <button
                                className="h-8 flex items-center w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                onClick={handleaddclick}
                                >
                                Agregar
                                </button>
                            )}
                            </div>
                        </div>
                        );
                    })}
          </div>
          <div>
            <label
              htmlFor="descripcionIngresos"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción de la necesidad del cargo
            </label> 
            <div className="">
              <textarea
                id="descripcionIngresos"
                name="descripcionIngresos"
                type="text"
                placeholder=""
                rows="3"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                // value={descripcionIngresos}
                // onChange={(e) => setDescripcionIngresos(e.target.value)}
                />
            </div>
          </div>
       
        </div>  

            {msg && <Alert alerta={alerta} />}

          <div className="grid grid-cols-2 gap-6 w-3/5 mx-auto">
            <Link
              to="/cargos/listar-cargos"
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
        </form>
      </div>
    </div>
  );
};

export default FormularioNuevoCargo;
