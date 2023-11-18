import { configRouter } from "@/configs/router";
import { User } from "@/type";
import { Navigate, useLocation } from "react-router-dom";
interface Props {
  children: JSX.Element;
  requiredRole?: string | null;
  user: User | null;
}

export default function RequireAuth({ children, requiredRole, user }: Props) {
  const location = useLocation();
  // redirects to login if not login
  if (
    !user &&
    requiredRole !== null
    // location.pathname !== configRouter.login &&
    // location.pathname !== configRouter.registerInformation &&
    // location.pathname !== configRouter.signUp &&
    // location.pathname !== configRouter.forgetPassword &&
    // location.pathname !== configRouter.resetPassword
  ) {
    return (
      <Navigate to={configRouter.login} state={{ from: location }} replace />
    );
  }
  // redirects to home if already login
  if (user && location.pathname === configRouter.login) {
    return (
      <Navigate to={configRouter.home} state={{ from: location }} replace />
    );
  }
  // redirects to home if not admin
  if (user && requiredRole === "2" && user.role !== requiredRole) {
    return (
      <Navigate to={configRouter.home} state={{ from: location }} replace />
    );
  }
  // redirects to home if not user
  if (user && requiredRole === "1" && user.role !== requiredRole) {
    return (
      <Navigate to={configRouter.home} state={{ from: location }} replace />
    );
  }

  return children;
}
