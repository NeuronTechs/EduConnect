import { configRouter } from "@/configs/router";
import { User } from "@/type";
import { Navigate, useLocation } from "react-router-dom";
interface Props {
  children: JSX.Element;
  requiredRole?: "admin" | "teacher" | "user" | null;
  user: User | null;
}

export default function RequireAuth({ children, requiredRole, user }: Props) {
  const location = useLocation();
  if (
    !user &&
    location.pathname !== configRouter.login &&
    location.pathname !== configRouter.signUp &&
    location.pathname !== configRouter.forgetPassword &&
    location.pathname !== configRouter.resetPassword
  ) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate to={configRouter.login} state={{ from: location }} replace />
    );
  }
  if (user && location.pathname === configRouter.login) {
    return (
      <Navigate to={configRouter.home} state={{ from: location }} replace />
    );
  }
  if (
    user !== null &&
    requiredRole === null &&
    location.pathname !== configRouter.registerInformation
  ) {
    return (
      <Navigate
        to={configRouter.registerInformation}
        state={{ from: location }}
        replace
      />
    );
  }
  if (user?.role !== requiredRole) {
    // Redirect them to the home page if they don't have the required role
    return <Navigate to={configRouter.home} replace />;
  }

  return children;
}
