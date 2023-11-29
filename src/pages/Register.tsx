import React, { useState } from "react";
import { Layout } from "../components";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/auth";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

export const Register = () => {
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    name: "",
    password: "",
  });

  const signUpNewUser = async () => {
    try {
      setIsLoading(true);
      const userCreated = await signUp(form.email, form.password, form.name);
      if (userCreated) return redirect("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (key: keyof RegisterForm): React.ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <Layout title="Login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          signUpNewUser();
        }}
      >
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            onChange={handleInputChange("name")}
            value={form.name}
          />
        </div>
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
          Registrarse
        </button>
        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={() => redirect("/login")}
          disabled={isLoading}
        >
          Ya estas registrado?
        </button>
      </form>
    </Layout>
  );
};
