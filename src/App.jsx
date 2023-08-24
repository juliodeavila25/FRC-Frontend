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
import { CollaboratorsProvider } from "./context/CollaboratorsProvider";
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
import ListarPostulantes from "./pages/recursos_humanos/ListarPostulantes";
import ListarVersiones from "./components/documents/ListarVersiones";
import ListarCargos from "./pages/cargos/ListarCargos";
import CrearCargo from "./pages/cargos/CrearCargo";
import EditarCargo from "./pages/cargos/EditarCargo";
import BusquedaAvanzada from "./pages/public/BusquedaAvanzada";
import OtrosDocumentos from "./pages/recursos_humanos/OtrosDocumentos";
import CrearOtroDocumento from "./pages/recursos_humanos/otros_documentos/CrearOtroDocumento";
import OfertaIndividual from "./pages/OfertaIndividual";
import { OtrosDocumentosProvider } from "./context/otrosDocumentosProvider";
import EditarOtroDocumento from "./pages/recursos_humanos/otros_documentos/EditarOtroDocumento";
import { DocumentosRequeridosProvider } from "./context/documentosRequeridosProvider";
import { PostulacionesProvider } from "./context/postulacionesProvider";
import ListarPostulante from "./pages/recursos_humanos/ListarPostulante";
import { EstadoPostulacionesProvider } from "./context/estadoPostulacionesProvider";
import { UnidadProvider } from "./context/unidadProvider";
import ListarUnidad from "./pages/unidades_negocio/ListarUnidad";
import EditarUnidad from "./pages/unidades_negocio/EditarUnidad";
import CrearUnidad from "./pages/unidades_negocio/CrearUnidad";
import ListarUnidadFuncional from "./pages/unidades_funcionales/ListarUnidadFuncional";
import CrearUnidadFuncional from "./pages/unidades_funcionales/CrearUnidadFuncional";
import EditarUnidadFuncional from "./pages/unidades_funcionales/EditarUnidadFuncional";
import { FuncionalProvider } from "./context/funcionalProvider";
import ListadoAspirantes from "./components/human_resources/ListadoAspirantes";
import ListarRequisito from "./pages/requisitos/ListarRequisito";
import CrearRequisito from "./pages/requisitos/CrearRequisito";
import { RequisitoProvider } from "./context/requisitoProvider";
import EditarRequisito from "./pages/requisitos/EditarRequisito";
import { DocumentosRequisitosProvider } from "./context/documentosRequisitosProvider";
import ListarRequisitosCargos from "./pages/requisitos_cargos/ListarRequisitosCargos";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DocumentosRequisitosProvider>
          <RequisitoProvider>
            <FuncionalProvider>
              <UnidadProvider>
                <EstadoPostulacionesProvider>
                  <PostulacionesProvider>
                    <OtrosDocumentosProvider>
                      <CargosProvider>
                        <CollaboratorsProvider>
                          <NominaDetalladasProvider>
                            <NominasProvider>
                              <DocumentosProvider>
                                <OfertasProvider>
                                  <CurriculumProvider>
                                    <DocumentosRequeridosProvider>
                                      <Routes>
                                        <Route
                                          path="/"
                                          element={<AuthLayout />}
                                        >
                                          <Route index element={<Login />} />
                                          <Route
                                            path="registrar"
                                            element={<Registrar />}
                                          />
                                          <Route
                                            path="olvide-password"
                                            element={<ForgotPassword />}
                                          />
                                          <Route
                                            path="olvide-password/:token"
                                            element={<NewPassword />}
                                          />
                                          <Route
                                            path="confirmar/:id"
                                            element={<ConfirmAccount />}
                                          />
                                          <Route
                                            path="sin-autorizacion"
                                            element={<Unauthorized />}
                                          />
                                        </Route>

                                        <Route path="/documentos">
                                          <Route
                                            index
                                            element={<BusquedaAvanzada />}
                                          />
                                        </Route>

                                        <Route
                                          path="/dashboard"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "aspirante",
                                                "recursos_humanos",
                                                "colaborador",
                                                "admin",
                                                "gerente",
                                              ]}
                                            />
                                          }
                                        >
                                          <Route
                                            index
                                            element={<Dashboard />}
                                          />
                                        </Route>

                                        <Route
                                          path="/curriculum"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "aspirante",
                                                "colaborador",
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
                                          }
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
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "aspirante",
                                                "colaborador",
                                              ]}
                                            />
                                          }
                                        >
                                          <Route index element={<Ofertas />} />
                                          <Route
                                            path="listar-oferta/:id"
                                            element={<OfertaIndividual />}
                                          />
                                        </Route>

                                        <Route
                                          path="/solicitudes"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={["colaborador"]}
                                            />
                                          }
                                        >
                                          <Route
                                            path="certificado-laboral"
                                            element={<CertificadoLaboral />}
                                          />

                                          <Route
                                            path="certificado-desprendible/:id/:periodo"
                                            element={
                                              <CertificadoDesprendible />
                                            }
                                          />

                                          <Route
                                            path="listado-certificado-desprendible"
                                            element={
                                              <ListarCertificadoDesprendible />
                                            }
                                          />
                                        </Route>

                                        <Route
                                          path="/recursos-humanos"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
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

                                          <Route
                                            path="convocatoria/:id/postulantes/:cargo"
                                            element={<ListarPostulantes />}
                                          />

                                          <Route
                                            path="convocatoria/postulante/:id"
                                            element={<ListarPostulante />}
                                          />
                                        </Route>

                                        <Route
                                          path="/documentos"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
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
                                          ></Route>
                                          <Route
                                            path="editar-documento/:id/listar-versiones"
                                            element={<ListarVersiones />}
                                          />
                                        </Route>
                                        <Route
                                          path="/colaboradores"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
                                          }
                                        >
                                          <Route
                                            index
                                            element={<ListadoColaboradores />}
                                          />

                                          <Route
                                            path="editar-colaborador/:id"
                                            element={<EditarColaborador />}
                                          />

                                          <Route
                                            path="otros-documentos/:id"
                                            element={<OtrosDocumentos />}
                                          />

                                          <Route
                                            path="otros-documentos/:id/crear-documento"
                                            element={<CrearOtroDocumento />}
                                          />

                                          <Route
                                            path="otros-documentos/:id/editar-documento/:id_documento"
                                            element={<EditarOtroDocumento />}
                                          />
                                        </Route>

                                        <Route
                                          path="/aspirantes"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
                                          }
                                        >
                                          <Route
                                            index
                                            element={<ListadoAspirantes />}
                                          />

                                          <Route
                                            path="editar-aspirante/:id"
                                            element={<EditarColaborador />}
                                          />
                                        </Route>

                                        <Route
                                          path="/cargos"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
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
                                          ></Route>
                                        </Route>

                                        <Route
                                          path="/unidades-negocio"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
                                          }
                                        >
                                          <Route
                                            index
                                            path="listar-unidades-negocio"
                                            element={<ListarUnidad />}
                                          />
                                          <Route
                                            path="crear-unidades-negocio"
                                            element={<CrearUnidad />}
                                          />

                                          <Route
                                            path="editar-unidades-negocio/:id"
                                            element={<EditarUnidad />}
                                          ></Route>
                                        </Route>

                                        <Route
                                          path="/unidades-funcionales"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
                                          }
                                        >
                                          <Route
                                            index
                                            path="listar-unidades-funcionales"
                                            element={<ListarUnidadFuncional />}
                                          />
                                          <Route
                                            path="crear-unidades-funcionales"
                                            element={<CrearUnidadFuncional />}
                                          />

                                          <Route
                                            path="editar-unidades-funcionales/:id"
                                            element={<EditarUnidadFuncional />}
                                          ></Route>
                                        </Route>

                                        <Route
                                          path="/requisitos"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "recursos_humanos",
                                                "gerente",
                                              ]}
                                            />
                                          }
                                        >
                                          <Route
                                            index
                                            path="listar-requisitos"
                                            element={<ListarRequisito />}
                                          />
                                          <Route
                                            path="crear-requisitos"
                                            element={<CrearRequisito />}
                                          />

                                          <Route
                                            path="editar-requisito/:id"
                                            element={<EditarRequisito />}
                                          ></Route>
                                        </Route>


                                        <Route
                                          path="/requisitos-cargos"
                                          element={
                                            <RutaProtegida
                                              allowedRoles={[
                                                "aspirante",
                                                "colaborador",
                                              ]}
                                            />
                                          }
                                        >
                                          <Route
                                            index
                                            path="listar-requisitos-cargos"
                                            element={<ListarRequisitosCargos />}
                                          />

                                          <Route
                                            path="editar-requisito-cargo/:id"
                                            element={<EditarRequisito />}
                                          ></Route>
                                        </Route>


                                      </Routes>
                                    </DocumentosRequeridosProvider>
                                  </CurriculumProvider>
                                </OfertasProvider>
                              </DocumentosProvider>
                            </NominasProvider>
                          </NominaDetalladasProvider>
                        </CollaboratorsProvider>
                      </CargosProvider>
                    </OtrosDocumentosProvider>
                  </PostulacionesProvider>
                </EstadoPostulacionesProvider>
              </UnidadProvider>
            </FuncionalProvider>
          </RequisitoProvider>
        </DocumentosRequisitosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
