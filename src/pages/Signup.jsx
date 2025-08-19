import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const u = await register(form);
      nav(u.role === 'donor' ? '/donor' : '/ngo');
    } catch (e) {
      setErr(e.message || 'Signup failed');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
  <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
              <h3 className="mb-3">Create an account</h3>
              {err && <div className="alert alert-danger">{err}</div>}
              <form onSubmit={submit} className="vstack gap-3">
                <input className="form-control" placeholder="Full name" value={form.name}
                       onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="form-control" placeholder="Email" type="email" value={form.email}
                       onChange={e => setForm({ ...form, email: e.target.value })} required />
                <input className="form-control" placeholder="Password" type="password" value={form.password}
                       onChange={e => setForm({ ...form, password: e.target.value })} required />

                <select className="form-select" value={form.role}
                        onChange={e => setForm({ ...form, role: e.target.value })} required>
                  <option value="">Select Role</option>
                  <option value="donor">Donor</option>
                  <option value="ngo">NGO / Recipient</option>
                </select>

                <button className="btn btn-success">Create Account</button>
              </form>
              <p className="small text-muted mt-3 mb-0">Admin account is system-controlled; not open for signup.</p>
            </div>
          </div>
  );
}
