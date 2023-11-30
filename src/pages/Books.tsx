import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { Fragment, useEffect, useState, useContext } from "react";
import { CardBook, Layout } from "../components";
import { db, auth } from "../config/firestore";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";

export interface Book {
  uuid: string;
  ID: number;
  Disponible: boolean;
  Descripcion: string;
  Titulo: string;
  "Fecha de publicacion": string;
  Autor: string;
}

export interface Loan {
  bookId: string;
  date: Date;
  userId: string;
  uuid: string;
}

export const Books = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [search, setSearch] = useState<string>("");

  const { user } = useContext(AuthContext);

  const refresh = async () => {
    await getBooks();
    await getLoans();
  };

  const getBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const parsedData = querySnapshot.docs.map<Book>((item) => ({
        ...(item.data() as Book),
        uuid: item.id,
      }));
      setBooks(parsedData);
    } catch (error) {
      console.error(error);
    }
  };

  const getLoans = async () => {
    const querySnapshot = await getDocs(collection(db, "loan"));
    const parsedData = querySnapshot.docs.map<Loan>((item) => ({
      ...(item.data() as Loan),
      uuid: item.id,
    }));
    setLoans(parsedData);
  };

  const setBookAvailability = async (book: Book, isAvailable: boolean) => {
    const docRef = doc(db, "books", book.uuid);
    return updateDoc(docRef, {
      Disponible: isAvailable,
    });
  };

  const createLoan = async (book: Book) => {
    const { currentUser } = auth;
    if (!currentUser) throw "No user";
    const loan: Omit<Loan, "uuid"> = {
      bookId: book.uuid,
      date: new Date(),
      userId: currentUser.uid,
    };
    return addDoc(collection(db, "loan"), loan);
  };

  const removeLoan = async (book: Book) => {
    const bookLoans = loans.filter((loan) => loan.bookId === book.uuid);
    await Promise.all(bookLoans.map(loan => deleteDoc(doc(db, "loan", loan?.uuid))))
    return true;
  };

  const showReturnDialog = async (book: Book) => {
    const result = await Swal.fire({
      title: "¿Quieres devolver el libro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await setBookAvailability(book, true);
        await removeLoan(book);
      } catch (error) {
        console.error("Error al actualizar el documento:", error);
      }
      Swal.fire("¡Acción confirmada!", "Se ha devuelto el libro.", "success");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // El usuario hizo clic en "No" o cerró el cuadro de diálogo
      Swal.fire("Cancelado", "La acción fue cancelada", "error");
    }
    refresh();
  };

  const showConfirmationDialog = async (book: Book) => {
    const result = await Swal.fire({
      title: "¿Quieres prestar el libro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await setBookAvailability(book, false);
        await createLoan(book);
      } catch (error) {
        console.error("Error al actualizar el documento:", error);
      }
      Swal.fire(
        "¡Acción confirmada!",
        "La acción fue realizada con éxito.",
        "success"
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // El usuario hizo clic en "No" o cerró el cuadro de diálogo
      Swal.fire("Cancelado", "La acción fue cancelada", "error");
    }
    refresh()
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Layout title="Books">
      <div className="input-group">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
          aria-describedby="search-addon"
        />
      </div>
      <div className="row gap-3">
        {books.length > 0 &&
          books
            .filter((item) =>
              item.Titulo.toLocaleUpperCase().includes(
                search.toLocaleUpperCase()
              )
            )
            .map((item, index) => (
              <Fragment key={`K-${item.ID}-${index}`}>
                <CardBook
                  book={item}
                  userHasBook={loans.some(
                    (loan) =>
                      loan.userId === user.id && loan.bookId === item.uuid
                  )}
                  className="col"
                  onLoan={showConfirmationDialog}
                  onReturn={showReturnDialog}
                />
                {(index + 1) % 3 === 0 && <div className="w-100" />}
              </Fragment>
            ))}
      </div>
    </Layout>
  );
};
