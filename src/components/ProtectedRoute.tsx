import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../config/firestore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: React.FC<
  React.PropsWithChildren<{ requireAuth: boolean }>
> = ({ requireAuth, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(Boolean(user));
      setIsLoading(false);
      if (!user) return;
      const { uid: id, displayName, email } = user;
      setUser({ id, name: displayName ?? "", email: email ?? "", role: 1 });
    });
  }, []);

  if (isLoading) return <></>;
  if (!isAuthenticated && requireAuth) return <Navigate to={"/login"} />;
  if (isAuthenticated && !requireAuth) return <Navigate to={"/"} />;
  return children;
};
