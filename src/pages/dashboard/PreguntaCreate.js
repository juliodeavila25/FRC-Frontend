import { useEffect, useContext } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/_dashboard/pregunta/UserNewForm';
import preguntaContext from '../../contexts/Pregunta/preguntaContext';
// ----------------------------------------------------------------------

export default function UserCreate() {

  //Preguntas
  const PreguntaContext = useContext(preguntaContext);
  const { obtenerPreguntaOne, pregunta } = PreguntaContext;
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams(); 
  // const { userList } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  // const currentUser = userList.find((user) => paramCase(user.name) === name);
 /*
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);*/

  useEffect(() => {
    if(isEdit){
      obtenerPreguntaOne(id);
    }
  }, []);
  //console.log(pregunta);
  return (
    <Page title="Pregunta: Crear una nueva pregunta | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Crear una nueva pregunta' : 'Editar pregunta'}
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Pregunta', href: PATH_DASHBOARD.user.root },
            { name: !isEdit ? 'Nuevo pregunta' : name }
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={pregunta} />
      </Container>
    </Page>
  );
}
