import React, { useState, useContext } from "react";
import { Layout } from "../components";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

type LoginForm = { email: string; password: string };

export const Login = () => {
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const { setUser } = useContext(AuthContext);

  const sendCredentials = async () => {
    try {
      setIsLoading(true);
      const userCreated = await signIn(form.email, form.password);
      if (userCreated) {
        setUser({
          email: userCreated.user.email ?? "",
          name: userCreated.user.displayName ?? "",
          password: "123",
          role: 1,
        });
        return redirect("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (key: keyof LoginForm): React.ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <Layout title="Login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          sendCredentials();
        }}
      >
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            onChange={handleInputChange("email")}
            value={form.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            onChange={handleInputChange("password")}
            value={form.password}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
          disabled={isLoading}
        >
          Iniciar Sesion
        </button>
        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={() => redirect("/register")}
          disabled={isLoading}
        >
          No tienes cuenta?
        </button>
      </form>
    </Layout>
  );
};
