import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

export default function Protected({ children }: { children: React.ReactNode }) {
  return getCurrentUser() ? children : <Navigate to="/log-in" />;
}
