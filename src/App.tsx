import { Navigate, Route, Routes } from 'react-router'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import DoctorHomePage from './pages/DoctorHomePage'
import DoctorProfilePage from './pages/DoctorProfilePage'
import DoctorSettingsPage from './pages/DoctorSettingsPage'
import DoctorRegistrationPage from './pages/DoctorRegistrationPage'
import DoctorRegistrationPendingPage from './pages/DoctorRegistrationPendingPage'
import DoctorValidationPage from './pages/DoctorValidationPage'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PatientHomePage from './pages/PatientHomePage'
import PatientRegistrationPage from './pages/PatientRegistrationPage'
import PasswordRecoveryPage from './pages/PasswordRecoveryPage'
import PasswordRecoverySentPage from './pages/PasswordRecoverySentPage'
import VerificationPage from './pages/VerificationPage'
import SchedulePage from './pages/SchedulePage'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro-paciente" element={<PatientRegistrationPage />} />
      <Route path="/registro/verificar" element={<VerificationPage />} />
      <Route path="/recuperar-contrasena" element={<PasswordRecoveryPage />} />
      <Route path="/recuperar-contrasena/enviado" element={<PasswordRecoverySentPage />} />
      <Route path="/registro-doctor" element={<DoctorRegistrationPage />} />
      <Route path="/registro-doctor/pendiente" element={<DoctorRegistrationPendingPage />} />
      <Route path="/administracion/validaciones" element={<DoctorValidationPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/paciente" element={<PatientHomePage />} />
      <Route path="/doctores/:id" element={<DoctorProfilePage />} />
      <Route path="/reserva/:id" element={<BookingPage />} />
      <Route path="/confirmacion" element={<ConfirmationPage />} />
      <Route path="/doctor" element={<DoctorHomePage />} />
      <Route path="/doctor/perfil" element={<DoctorSettingsPage />} />
      <Route path="/doctor/horarios" element={<SchedulePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
