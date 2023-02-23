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
import RutaProtegida from "./layouts/RutaProtegida";
import Dashboard from "./pages/Dashboard";
import NuevoProyecto from "./pages/NuevoProyecto";
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
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <NominasProvider>
        <DocumentosProvider>
            <OfertasProvider>
              <CurriculumProvider>
                <Routes>
                  <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="registrar" element={<Registrar />} />
                    <Route path="olvide-password" element={<ForgotPassword />} />
                    <Route
                      path="olvide-password/:token"
                      element={<NewPassword />}
                    />
                    <Route path="confirmar/:id" element={<ConfirmAccount />} />
                    <Route path="sin-autorizacion" element={<Unauthorized />} />
                  </Route>

                  <Route
                    path="/dashboard"
                    element={
                      <RutaProtegida
                        allowedRoles={["aspirante", "recursos_humanos"]}
                      />
                    }
                  >
                    <Route index element={<Dashboard />} />
                  </Route>

                  <Route
                    path="/curriculum"
                    element={<RutaProtegida allowedRoles={["aspirante"]} />}
                  >
                    <Route path="crear-curriculum" element={<CurriculumVitae />} />
                    <Route
                      path="editar-curriculum/:id"
                      element={<EditarCurriculumVitae />}
                    />
                  </Route>

                  <Route
                    path="/ofertas"
                    element={<RutaProtegida allowedRoles={["aspirante"]} />}
                  >
                    <Route index element={<Ofertas />} />
                  </Route>

                  <Route
                    path="/solicitudes"
                    element={
                      <RutaProtegida
                        allowedRoles={["aspirante", "recursos_humanos"]}
                      />
                    }
                  >
                    <Route
                      path="certificado-laboral"
                      element={<CertificadoLaboral />}
                    />

                    <Route
                      path="certificado-desprendible"
                      element={<CertificadoDesprendible />}
                    />
                  </Route>

                  <Route
                    path="/recursos-humanos"
                    element={<RutaProtegida allowedRoles={["recursos_humanos"]} />}
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
                    element={<RutaProtegida allowedRoles={["recursos_humanos"]} />}
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
                    />
                  </Route>
                </Routes>
              </CurriculumProvider>
            </OfertasProvider>
          </DocumentosProvider>
        </NominasProvider>  
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
