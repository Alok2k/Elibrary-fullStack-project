import React, { useEffect, useState } from "react";
import Returnbook from "./Returnbook";
import Spinner from "../../utils/Spinner";

const Carousel = () => {
  const [books, setBooks] = useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState(null);
useEffect(()=>{
  const fetchBooks = async () => {
    const baseUrl = "http://localhost:8080/api/books";
    const url= `${baseUrl}?page=0&size=9`;
   
   
    const response=await fetch(url);
   

  const responseJson=await response.json();
  const responseData= responseJson._embedded.books;
  const loadedBooks=[];

  for(const key in responseData){
    loadedBooks.push(
      {
        id: responseData[key].id,
        title: responseData[key].title,
        author: responseData[key].author,
        description: responseData[key].description,
        copies: responseData[key].copies,
        copiesAvailable: responseData[key].copiesAvailable,
        category: responseData[key].category,
        img: responseData[key].img,


      }
    )
  }

  if (!response.ok) {
    console.log(response.statusText);
    throw new Error("HTTP-Error: kuch to gadbad h code mai ");
}

  setBooks(loadedBooks);
  setIsLoading(false);
};
  fetchBooks()

  .catch((error) => {
    setIsLoading(false);
    setHttpError(error.message);
  });

},[])

if(isLoading){
  return (
    <Spinner/>
  )
}

if(httpError){
  return (
    <div className="container m-5">
      <p>{httpError}</p>
    </div>
  )
}


  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Welcome to our Collection!</h3>
      </div>
      <div
        id="carouselControls"
        className="carousel carousel-dark  slide mt-5 d-none d-lg-block "
        data-bs-interval="false"
      >
        {/* desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center  align-items-center ">
              {
                books.slice(0, 3).map((book) =>
                <Returnbook  book={book} key={book.id} />
              )}
              
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row d-flex justify-content-center  align-items-center ">
            {
                books.slice(3, 6).map(book =>
                  <Returnbook  book={book} key={book.id} />
                )}
              
            </div>
          </div>

          <div className="carousel-item ">
            <div className="row d-flex justify-content-center  align-items-center ">
            {
                books.slice(6, 9).map(book =>
                  <Returnbook  book={book} key={book.id} />
                )}
              
            </div>
          </div>

        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center  align-items-center ">
       <Returnbook book={books[7]} key={books[7].id} />
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <a className="btn btn-outline-secondary btn-lg" href="jn">
          View More
        </a>
      </div>
    </div>
  );
};

export default Carousel;
