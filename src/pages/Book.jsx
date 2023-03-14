import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorAlert from "../components/ErrorAlert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const Book = () => {
  const params = useParams();
  console.log(params.id);

  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getBookData = async () => {
    const url = `https://api.matgargano.com/api/books/${params.id}`;  //fecth from books api based on book id
    setLoading(true);
    setError(false);
    try {
      const request = await fetch(url);
      const response = await request.json();
      setBook(response); //set data to state
    } catch (e) {
      setError("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookData();
  }, [params.id]);

  return (
    <Container>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {!error && loading && (
        <div className="max-w-[230px]">
          <Skeleton count="7" />
        </div>
      )}
      {!error && !loading && (
        <>
          <a class=" border-solid	border-4 border-gray-600  flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700  mx-60">
            <img
              class=" border-solid	border-2 border-gray-600 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={book.imageURL}
              alt="cover"
            />

            <div class="flex flex-col justify-between p-4 leading-normal">
              <div className="ransform transition duration-400 hover:scale-125 content-start ">
                <Link to={`/books`}>
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M19 12H6M12 5l-7 7 7 7" />
                    </svg>{" "}
                  </button>
                </Link>
              </div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {" "}
                Author: {book.author}
              </p>
              <br />
              <p className="mb-3 font-bold l text-gray-700 dark:text-gray-400">
                {" "}
                Publisher:
              </p>{" "}
              {book.publisher}
              <br />
              <br />
              <br />
              <p className="mb-3 font-bold text-gray-700 dark:text-gray-400 ">
                {" "}
                Released:{" "}
              </p>{" "}
              {book.year}
              <br />
              <br />
              <br />
              <p className="mb-3 font-bold text-gray-700 dark:text-gray-400 ">
                {" "}
                Pages:{" "}
              </p>{" "}
              {book.pages}
              <br />
              <br />
              <br />
              <p className="mb-3 font-bold text-gray-700 dark:text-gray-400 ">
                {" "}
                Country Written:{" "}
              </p>{" "}
              {book.country}
            </div>
          </a>
        </>
      )}
    </Container>
  );
};

export default Book;
