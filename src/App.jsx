import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";
import { CurriculumProvider } from "./context/CurriculumProvider";
import { OfertasProvider } from "./context/ofertasProvider";
import { DocumentosProvider } from "./context/documentosProvider";
import { NominasProvider } from "./context/nominasProvider";
import { NominaDetalladasProvider } from "./context/nominaDetalladasProvider";
import {CollaboratorsProvider} from "./context/CollaboratorsProvider"
import { CargosProvider } from "./context/cargosProvider";
import RutaProtegida from "./layouts/RutaProtegida";
import Dashboard from "./pages/Dashboard";
import CurriculumVitae from "./pages/CurriculumVitae";
import EditarCurriculumVitae from "./pages/EditarCurriculumVitae";
import Ofertas from "./pages/Ofertas";
import CertificadoLaboral from "./pages/CertificadoLaboral";
import Unauthorized from "./pages/Unauthorized";
import ListarConvocatorias from "./pages/recursos_humanos/ListarConvocatorias";
import CrearConvocatoria from "./pages/recursos_humanos/CrearConvocatoria";
import EditarConvocatoria from "./pages/recursos_humanos/EditarConvocatoria";
import ListarDocumentos from "./pages/documents/ListarDocumentos";
import CrearDocumento from "./pages/documents/CrearDocumento";
import EditarDocumento from "./pages/documents/EditarDocumento";
import CertificadoDesprendible from "./pages/CertificadoDesprendible";
import DataPublic from "./pages/public/DataPublic";
import ListarCertificadoDesprendible from "./pages/ListarCertificadoDesprendible";
import ListadoColaboradores from "./components/human_resources/ListadoColaboradores";
import EditarColaborador from "./pages/recursos_humanos/EditarColaborador";
import ListarVersiones from "./components/documents/ListarVersiones";
import ListarCargos from "./pages/cargos/ListarCargos";
import CrearCargo from "./pages/cargos/CrearCargo";
import EditarCargo from "./pages/cargos/EditarCargo"
import BusquedaAvanzada from "./pages/public/BusquedaAvanzada";
import OtrosDocumentos from "./pages/recursos_humanos/OtrosDocumentos";
import CrearOtroDocumento from "./pages/recursos_humanos/otros_documentos/CrearOtroDocumento";
import { OtrosDocumentosProvider } from "./context/otrosDocumentosProvider";
import EditarOtroDocumento from './pages/recursos_humanos/otros_documentos/EditarOtroDocumento'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OtrosDocumentosProvider>
        <CargosProvider>
          <CollaboratorsProvider>
          <NominaDetalladasProvider>       
              <NominasProvider>
                <DocumentosProvider>
                  <OfertasProvider>
                    <CurriculumProvider>
                      <Routes>
                        <Route path="/" element={<AuthLayout />}>
                          <Route index element={<Login />} />
                          <Route path="registrar" element={<Registrar />} />
                          <Route
                            path="olvide-password"
                            element={<ForgotPassword />}
                          />
                          <Route
                            path="olvide-password/:token"
                            element={<NewPassword />}
                          />
                          <Route path="confirmar/:id" element={<ConfirmAccount />} />
                          <Route path="sin-autorizacion" element={<Unauthorized />} />
                        </Route>

                        <Route path="/documentos">
                          <Route index element={<DataPublic />} />
                           <Route path="busqueda-avanzada" element={<BusquedaAvanzada />} />
                          <Route path="detalles/:id" element={<Unauthorized />} />
                        </Route>

                        <Route
                          path="/dashboard"
                          element={
                            <RutaProtegida
                              allowedRoles={["aspirante", "recursos_humanos", "colaborador", "admin"]}
                            />
                          }
                        >
                          <Route index element={<Dashboard />} />
                        </Route>

                        <Route
                          path="/curriculum"
                          element={<RutaProtegida allowedRoles={["aspirante", "colaborador", "recursos_humanos"]} />}
                        >
                          <Route
                            path="crear-curriculum"
                            element={<CurriculumVitae />}
                          />
                          <Route
                            path="editar-curriculum/:id"
                            element={<EditarCurriculumVitae />}
                          />
                        </Route>

                        <Route
                          path="/ofertas"
                          element={<RutaProtegida allowedRoles={["aspirante", "colaborador"]} />}
                        >
                          <Route index element={<Ofertas />} />
                        </Route>

                        <Route
                          path="/solicitudes"
                          element={
                            <RutaProtegida
                              allowedRoles={["recursos_humanos", "colaborador"]}
                            />
                          }
                        >
                        
                          <Route
                            path="certificado-laboral"
                            element={<CertificadoLaboral />}
                          />

                          <Route
                            path="certificado-desprendible/:id/:periodo"
                            element={<CertificadoDesprendible />}
                          />

                          <Route
                            path="listado-certificado-desprendible"
                            element={<ListarCertificadoDesprendible />}
                          />
                        </Route>

                        <Route
                          path="/recursos-humanos"
                          element={
                            <RutaProtegida allowedRoles={["recursos_humanos"]} />
                          }
                        >
                          <Route
                            index
                            path="listar-convocatorias"
                            element={<ListarConvocatorias />}
                          />
                          <Route
                            path="crear-convocatoria"
                            element={<CrearConvocatoria />}
                          />
                          <Route
                            path="editar-convocatoria/:id"
                            element={<EditarConvocatoria />}
                          />
                        </Route>

                        <Route
                          path="/documentos"
                          element={
                            <RutaProtegida allowedRoles={["recursos_humanos"]} />
                          }
                        >
                          <Route
                            index
                            path="listar-documentos"
                            element={<ListarDocumentos />}
                          />
                          <Route
                            path="crear-documento"
                            element={<CrearDocumento />}
                          />
                          <Route
                            path="editar-documento/:id"
                            element={<EditarDocumento />}
                          >
                          </Route>
                          <Route
                            path="editar-documento/:id/listar-versiones"
                            element={<ListarVersiones />}
                          />
                          
                        </Route>
                        <Route
                          path="/colaboradores"
                          element={
                            <RutaProtegida
                              allowedRoles={["recursos_humanos"]}
                            />
                          }
                        ><Route index element={<ListadoColaboradores />} />
                        
                        <Route
                            path="editar-colaborador/:id"
                            element={<EditarColaborador />}
                          />

                          <Route
                            path="otros-documentos/:id"
                            element={<OtrosDocumentos/>}
                          />

                          <Route
                            path="otros-documentos/:id/crear-documento"
                            element={<CrearOtroDocumento/>}
                          />

                          <Route
                            path="otros-documentos/:id/editar-documento/:id_documento"
                            element={<EditarOtroDocumento/>}
                          />
                        </Route>

                        <Route
                          path="/cargos"
                          element={
                            <RutaProtegida allowedRoles={["recursos_humanos"]} />
                          }
                        >
                          <Route
                            index
                            path="listar-cargos"
                            element={<ListarCargos />}
                          />
                          <Route
                            path="crear-cargo"
                            element={<CrearCargo />}
                          />
                        
                          <Route
                            path="editar-cargo/:id"
                            element={<EditarCargo />}
                          >
                          </Route> 
                        </Route>
                      </Routes>
                    </CurriculumProvider>
                  </OfertasProvider>
                </DocumentosProvider>
              </NominasProvider>
            </NominaDetalladasProvider>       
          </CollaboratorsProvider>
        </CargosProvider>
        </OtrosDocumentosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
