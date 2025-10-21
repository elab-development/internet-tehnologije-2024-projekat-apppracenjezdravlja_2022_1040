
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function LogoutButton() {
  const nav = useNavigate();
  function logout() {
    localStorage.removeItem("access_token");
    nav("/login");
  }
  return <Button onClick={logout}>Logout</Button>;
}