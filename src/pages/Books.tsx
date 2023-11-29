import { collection, getDocs } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { CardBook, Layout } from "../components";
import { db } from "../config/firestore";

export interface Book {
  ID: number;
  Disponible: boolean;
  Descripcion: string;
  Titulo: string;
  "Fecha de publicacion": string;
  Autor: string;
}

export const Books = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const getBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const parsedData = querySnapshot.docs.map((item) => item.data() as Book);
      setBooks(parsedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks();
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
                <CardBook book={item} className="col" />
                {(index+1) % 3 === 0  && <div className="w-100" />}
              </Fragment>
            ))}
      </div>
    </Layout>
  );
};
