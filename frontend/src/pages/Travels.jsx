import { useAuth } from "../context/useAuth";

export default function Travels() {
  const { logout } = useAuth();

  return (
    <>
      <h2>Travels</h2>
      <button onClick={logout}>Logout</button>
    </>
  );
}
