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
import RutaProtegida from "./layouts/RutaProtegida";
import Dashboard from "./pages/Dashboard";
import NuevoProyecto from "./pages/NuevoProyecto";
import CurriculumVitae from "./pages/CurriculumVitae";
import EditarCurriculumVitae from "./pages/EditarCurriculumVitae";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
              </Route>
              <Route path="/curriculum" element={<RutaProtegida />}>
                <Route path="crear-curriculum" element={<CurriculumVitae />} />
                <Route
                  path="editar-curriculum/:id"
                  element={<EditarCurriculumVitae />}
                />
              </Route>
              <Route path="/dashboard" element={<RutaProtegida />}>
                <Route index element={<Dashboard />} />
              </Route>
            </Routes>
          </CurriculumProvider>
        </OfertasProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
