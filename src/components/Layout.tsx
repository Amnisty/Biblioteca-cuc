import React,{useContext} from "react";
import { auth } from "../config/firestore";
import { signOut } from "../services/auth";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface LayoutProps extends React.ComponentProps<"div"> {
  title: string;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { title, children, ...otherProps } = props;
  const { user } = useContext(AuthContext);
  return (
    <div {...otherProps}>
      <nav className="navbar bg-body-secondary">
        <div className="container-fluid flex justify-content-between">
          <span className="navbar-brand mb-0 h1">{title}</span>
          {Boolean(auth.currentUser) && (
            <ul className="d-flex flex-row list-unstyled gap-3">
              <li>
                <Link replace to={"/"}>
                  <button className="btn btn-danger">Inicio</button>
                </Link>
              </li>
              <li>
                <Link replace to={"/books"}>
                  <button className="btn btn-danger">Libros</button>
                </Link>
              </li>
              {"role" in user && user.role===1 &&
                <li>
                  <Link replace to={"/admin"}>
                    <button className="btn btn-danger">Admin</button>
                  </Link>
                </li>
              }
              <li>
                <button className="btn btn-danger" onClick={signOut}>
                  Cerrar sesion
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <main className="container py-4 ">{children}</main>
    </div>
  );
};
