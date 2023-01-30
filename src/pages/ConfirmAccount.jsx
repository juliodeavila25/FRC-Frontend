import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Modal from "../components/Modal";

const ConfirmAccount = () => {
  const [modal, setModal] = useState({});
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setModal({
          msg: "Cuenta Verificada",
          subtitle: data.msg,
          error: false,
        });
      } catch (error) {
        setModal({
          msg: "Cuenta no verificada",
          subtitle: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmarCuenta();
  }, []);

  const { msg } = modal;

  return <>{msg && <Modal modal={modal} />}</>;
};

export default ConfirmAccount;
