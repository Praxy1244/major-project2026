import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoleRoute from './components/RoleRoute';


import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DonorDashboard from './pages/DonorDashboard';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/donor"
          element={
            <RoleRoute allowed={['donor']}>
              <DonorDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/ngo"
          element={
            <RoleRoute allowed={['ngo']}>
              <NGODashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleRoute allowed={['admin']}>
              <AdminDashboard />
            </RoleRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
