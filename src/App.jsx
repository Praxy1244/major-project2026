import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DonorDashboard from './pages/DonorDashboard';
import NGODashboard from './pages/NGODashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowed={['donor']} />}>
              <Route path="/donor" element={<DonorDashboard />} />
            </Route>

            <Route element={<RoleRoute allowed={['ngo']} />}>
              <Route path="/ngo" element={<NGODashboard />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}
