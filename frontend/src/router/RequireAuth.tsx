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
  if (user === null) {
    if (requiredRole !== null) {
      return (
        <Navigate to={configRouter.login} state={{ from: location }} replace />
      );
    }
    return children;
  } else {
    // redirects to home if login
    if (requiredRole === null) {
      return (
        <Navigate to={configRouter.home} state={{ from: location }} replace />
      );
    }
    // redirects to register information if not register information
    if (user.role === null) {
      if (requiredRole === "null") {
        return children;
      } else {
        return (
          <Navigate
            to={configRouter.registerInformation}
            state={{ from: location }}
            replace
          />
        );
      }
    }
    // redirects to home if register information
    if (requiredRole === "null") {
      return (
        <Navigate to={configRouter.home} state={{ from: location }} replace />
      );
    }
    // redirects to home if not admin
    if (requiredRole === "2") {
      if (user.role === "2") {
        return children;
      } else {
        return (
          <Navigate to={configRouter.home} state={{ from: location }} replace />
        );
      }
    }
    // redirects to home if not teacher
    if (requiredRole === "1") {
      if (user.role === "1") {
        return children;
      } else {
        return (
          <Navigate to={configRouter.home} state={{ from: location }} replace />
        );
      }
    }
    return children;
  }
}
