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
import UserNewForm from '../../components/_dashboard/espacio/UserNewForm';
import espacioContext from '../../contexts/Espacio/espacioContext';
// ----------------------------------------------------------------------

export default function UserCreate() {

  //Espacios
  const EspacioContext = useContext(espacioContext);
  const { obtenerEspacioOne, espacio } = EspacioContext;
  
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
      obtenerEspacioOne(id);
    }
  }, []);
  //console.log(espacio);
  return (
    <Page title="Espacio: Crear un nuevo espacio | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Crear un nuevo espacio' : 'Editar espacio'}
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Espacio', href: PATH_DASHBOARD.user.root },
            { name: !isEdit ? 'Nuevo espacio' : name }
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={espacio} />
      </Container>
    </Page>
  );
}
