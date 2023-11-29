import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { AuthContext, User } from "./context/AuthContext";
import { Books, ClientDashboard, Login, Register } from "./pages";
import { AdminScreen } from "./pages/AdminScreen";

function App() {
  const [user, setUser] = useState<User>({} as User);
  const handleSetUser = (newUser: User) => {
    const objectTOString = JSON.stringify(newUser);
    localStorage.setItem("auth", objectTOString);
    setUser(newUser);
  };

  useEffect(() => {
    try {
      const authString = localStorage.getItem("auth") ?? "";
      const auth = JSON.parse(authString) as User;
      if (Object.entries(auth)[0]) {
        setUser(auth);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser }}>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute requireAuth={true}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute requireAuth={true}>
                <Books />
              </ProtectedRoute>
            }
          >
            <Route path=":slug" element={<ClientDashboard />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAuth={true}>
                <AdminScreen />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
