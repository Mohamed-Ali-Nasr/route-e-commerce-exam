import { selectAuth } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/redux-hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector(selectAuth);

  return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
