import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const customer = useSelector((state) => state.customer.customer);

  if (!customer) {
    return <Navigate to="/" replace />;
  }

  return children;
}
