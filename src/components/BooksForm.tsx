import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../config/firestore";
import { Book } from "../pages";

export const BooksForm: React.FC = () => {
  const [form, setForm] = useState<Omit<Book, "Disponible" | "uuid">>({
    ["Fecha de publicacion"]: "",
    ID: 0,
    Autor: "",
    Descripcion: "",
    Titulo: "",
  });

  const postBook = async () => {
    try {
      const booksRef = collection(db, "books");

      await addDoc(booksRef, {
        ...form,
        Disponible: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleForm =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((state) => ({ ...state, [name]: e.target.value }));
    };

  return (
    <div>
      <form className="d-flex flex-column gap-2">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">ID del libro</label>
          <input
            type="number"
            onChange={handleForm("ID")}
            className="form-control"
            value={form.ID}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Titulo</label>
          <input
            onChange={handleForm("Titulo")}
            type="text"
            value={form.Titulo}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Autor</label>
          <input
            onChange={handleForm("Autor")}
            value={form.Autor}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Descripcion</label>
          <input
            onChange={handleForm("Descripcion")}
            value={form.Descripcion}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Año de Publicacion</label>
          <input
            onChange={handleForm("Fecha de publicacion")}
            value={form["Fecha de publicacion"]}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button onClick={postBook} type="submit" className="btn btn-primary">
          Añadir
        </button>
      </form>
    </div>
  );
};
