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
import UserNewForm from '../../components/_dashboard/caracteristica/UserNewForm';
import caracteristicaContext from '../../contexts/Caracteristica/caracteristicaContext';
// ----------------------------------------------------------------------

export default function UserCreate() {

  //Caracteristicas
  const CaracteristicaContext = useContext(caracteristicaContext);
  const { obtenerCaracteristicaOne, caracteristica } = CaracteristicaContext;
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
      obtenerCaracteristicaOne(id);
    }
  }, []);
  //console.log(caracteristica);
  return (
    <Page title="Caracteristica: Crear una nueva caracteristica | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Crear una nueva caracteristica' : 'Editar caracteristica'}
          links={[
            { name: 'Inicio', href: PATH_DASHBOARD.root },
            { name: 'Caracteristica', href: PATH_DASHBOARD.user.root },
            { name: !isEdit ? 'Nuevo caracteristica' : name }
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={caracteristica} />
      </Container>
    </Page>
  );
}
