import { Book } from "../pages";

interface CardBookProps {
  className?: string;
  book: Book;
}

export const CardBook = (props: CardBookProps) => {
  const { className, book } = props;
  return (
    <div
      className={`bg-white rounded-3 shadow-sm py-4 px-2 d-flex flex-column justify-content-center align-items-center gap-3 ${className}`}
    >
      <h3>{book.Titulo}</h3>
      <p>{book.Descripcion}</p>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex flex-column gap-4">
          <span>Fecha de lanzamiento: {book["Fecha de publicacion"]}</span>
          <span>Autor: {book.Autor}</span>
        </div>
        <span>Disponibilidad: {book.Disponible ? "SI" : "NO"}</span>
      </div>
      <button disabled={!book.Disponible} className="btn btn-primary w-100">Prestar</button>
    </div>
  );
};
