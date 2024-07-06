import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

export default function Guest({ children }: { children: React.ReactNode }) {
  return getCurrentUser() ? <Navigate to="/" /> : children;
}
