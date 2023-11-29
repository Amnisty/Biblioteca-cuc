import React, { useEffect, useState } from "react";
import { auth } from "../config/firestore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: React.FC<
  React.PropsWithChildren<{ requireAuth: boolean }>
> = ({ requireAuth, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(Boolean(user));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <></>;
  if (!isAuthenticated && requireAuth) return <Navigate to={'/login'}/>
  if (isAuthenticated && !requireAuth) return <Navigate to={'/'}/>
  return children;
};
