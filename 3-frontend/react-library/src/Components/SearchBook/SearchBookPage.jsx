import React, { useEffect, useState } from "react";
import Spinner from "../../utils/Spinner";
import SearchBook from "./SearchBook";
import Pagination from "../../utils/Pagination";

const SearchBookPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const[currentPage,setCurrentPage]=useState(1);
  const[booksPerPage,setBooksPerPage]=useState(5);
  const[totalAmountofBooks,setTotalAmountOfBooks]=useState(0);
  const[totalPages,setTotalPages]=useState(0);
  const[searchUrl,setSearchUrl]=useState("");
  const[search,setSearch]=useState('');
  const[categorySelection,setCategorySelection]=useState('Book category')

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl = "http://localhost:8080/api/books";
      let url = ``;
      if(searchUrl===''){
         url = `${baseUrl}?page=${currentPage -1}&size=${booksPerPage}`;
      }
      else{
        let searchWithPage=searchUrl.replace('<pageNumber>',`${currentPage-1}`);
        url=baseUrl+searchWithPage;
      }
      const response = await fetch(url);

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedBooks = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      if (!response.ok) {
        console.log(response.statusText);
        throw new Error("HTTP-Error: kuch to gadbad h code mai ");
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
    window.scrollTo(0,0);
  }, [currentPage,searchUrl]);

  if (isLoading) {
    return <Spinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === '') {
      setSearchUrl('');
    } else {
      setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
    }
    setCategorySelection('Book Category')
  };
  
const categoryField= (value) => {
  setCurrentPage(1);

  if(
    value.toLowerCase() ==='fe'||
    value.toLowerCase() ==='be'||
    value.toLowerCase() ==='data'||
    value.toLowerCase() ==='devops'
  )
  {
    setCategorySelection(value);
    setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
  }
  else{
    setCategorySelection('All');
    setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
  }
}

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook-booksPerPage;
  let lastItem=booksPerPage*currentPage<=totalAmountofBooks ?
  booksPerPage* currentPage: totalAmountofBooks;

const paginate=(pageNumber)=>setCurrentPage(pageNumber);
  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={e=>setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success"
                onClick={searchHandleChange}
                >Search</button>
              </div>
            </div>
            <div className='col-4'>
              <div className='dropdown'>
                <button
                  className='btn btn-secondary dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton1'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {categorySelection}
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton1'
                >
                  <li onClick={() => categoryField("All")}>
                    <a className="dropdown-item" href="#action/3.1">
                      All Category
                    </a>
                  </li>
                  <li onClick={() => categoryField("fe")}>
                    <a className="dropdown-item" href="#action/3.1">
                      Frontend
                    </a>
                  </li>
                  <li onClick={() => categoryField("be")}>
                    <a className="dropdown-item" href="#action/3.1">
                      Backend
                    </a>
                  </li>
                  <li onClick={() => categoryField("Data")}>
                    <a className="dropdown-item" href="#action/3.1">
                      Data
                    </a>
                  </li>
                  <li onClick={() => categoryField("DevOps")}>
                    <a className="dropdown-item" href="#action/3.1">
                      Devops
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-3 ">
            <h5>Number of result: ({totalAmountofBooks})</h5>
          </div>
          <p>{indexOfFirstBook +1} to {lastItem} of {totalAmountofBooks} items</p>
          {books.map(book=>(
            <SearchBook book={book} key={book.id} />
          ))}
          {totalPages>1 &&
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
          }
        </div>
      </div>
      
    </div>
  );
};

export default SearchBookPage;
