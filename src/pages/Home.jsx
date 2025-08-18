import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, login, logout } = useAuth();

  return (
    <div className="py-5">
      <h2>Home</h2>
      <p>{user ? `Welcome, ${user.name}` : 'Not logged in'}</p>

      {!user ? (
        <button
          className="btn btn-success"
          onClick={() => login({ name: 'Test User', role: 'donor' }, 'test-token')}
        >
          Simulate Login
        </button>
      ) : (
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}
