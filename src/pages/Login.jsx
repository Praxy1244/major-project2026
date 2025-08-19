import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const u = await login(form.email, form.password);
      if (u.role === 'donor') nav('/donor');
      else if (u.role === 'ngo') nav('/ngo');
      else nav('/admin');
    } catch (e) {
      setErr(e.message || 'Login failed');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
  <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
              <h3 className="mb-3">Welcome back</h3>
              <p className="text-muted small">Admin? Use <code>admin@scdp.com</code> / <code>admin123</code></p>
              {err && <div className="alert alert-danger">{err}</div>}
              <form onSubmit={submit} className="vstack gap-3">
                <input className="form-control" placeholder="Email" type="email"
                       value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                <input className="form-control" placeholder="Password" type="password"
                       value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button className="btn btn-primary">Login</button>
              </form>
              <p className="small text-muted mt-3 mb-0">Tip: open different browsers to login as donor/ngo/admin simultaneously.</p>
            </div>
          </div>
  );
}
