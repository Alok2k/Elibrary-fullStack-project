/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Spinner from "../../utils/Spinner";
import StarReview from "../../utils/StarReview";
import CheckoutAndReview from "./CheckoutAndReview";
import LatestReviews from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";

const BookCheckoutPage = () => {
  const {authState}= useOktaAuth();
  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //Review state
  const [reviews, setReviews] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  //loans count state
  const [currentLoanCount, setCurrentLoanCount] = useState(0);
  const[isLoadingCuurentLoansCount,setIsLoadingCurrentLoansCount]=useState(true);
  //is book check out 
  const[isCheckedOut, setIsCheckedOut] = useState(false);
  const[isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);


  const bookId = window.location.href.split("/")[4];

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl = `http://localhost:8080/api/books/${bookId}`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("HTTP-Error");
        }

        const responseJson = await response.json();
        const loadedBooks = {
          id: responseJson.id,
          title: responseJson.title,
          author: responseJson.author,
          description: responseJson.description,
          copies: responseJson.copies,
          copiesAvailable: responseJson.copiesAvailable,
          category: responseJson.category,
          img: responseJson.img,
        };
        setBook(loadedBooks);
        setIsLoading(false);
      } catch (error) {
        setHttpError(error.message);
      }
    };

    fetchBook();
  }, [isCheckedOut]);

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
      try {
        const responseReviews = await fetch(reviewUrl);

        if (!responseReviews.ok) {
          throw new Error("HTTP-Error Something Went Wrong");
        }

        const responseJsonReviews = await responseReviews.json();
        const responseData = responseJsonReviews._embedded.review;
        const loadedReviews = [];
        let weightedStarReviews = 0;
        for (const key in responseData) {
          loadedReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            date: responseData[key].date,
            rating: responseData[key].rating,
            book_id: responseData[key].bookId,
            reviewDescription: responseData[key].reviewDescription,
          });
          weightedStarReviews = weightedStarReviews + responseData[key].rating;
        }
        if (loadedReviews.length > 0) {
          const round = (
            Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
          ).toFixed(1);
          setTotalStars(round);
        }
        setReviews(loadedReviews);
        setIsLoadingReview(false);
      } catch (error) {
        setHttpError(error.message);
        setIsLoadingReview(false);
      }
    };

    fetchBookReviews();
  }, [bookId]);

  useEffect(() => {
    const fetchUserCurrentLoansCount=async()=>{
      if (authState && authState.isAuthenticated) {
        const url=`http://localhost:8080/api/books/secure/currentloans/count`;
        const requestOptions={
          method:'GET',
          headers:{
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          }

        };
        const currentLoanCountResponse= await fetch(url, requestOptions);
        if (!currentLoanCountResponse.ok) {
          throw new Error('something went wrong!');  
        }
        const currentLoanCountResponsejson= await currentLoanCountResponse.json();
        setCurrentLoanCount(currentLoanCountResponsejson);
      }
      setIsLoadingCurrentLoansCount(false);


    }
    fetchUserCurrentLoansCount().catch((error)=>{
      setIsLoadingCurrentLoansCount(false);
      setHttpError(error.message);
    })
  
  }, [authState,isCheckedOut]);

  useEffect(() => {
    const fetchUserCheckedOutBook = async()=>{
      if (authState && authState.isAuthenticated) {
      const url=`http://localhost:8080/api/books/secure/isCheckout/byuser/?bookId=${bookId}`;
      const requestOptions={
        method:'GET',
        headers:{
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          'Content-Type': 'application/json'
        }

      };
      const bookCheckedOut=await fetch(url,requestOptions);
      if(!bookCheckedOut.ok){throw new Error("Could not retrieve the information about whether this book is checked out or not.");
      }
      const bookCheckedOutResponseJson=await bookCheckedOut.json();
      setIsCheckedOut(bookCheckedOutResponseJson);

    }
    setIsLoadingBookCheckedOut(false);
  }
    fetchUserCheckedOutBook().catch((error)=>{
      setIsLoadingBookCheckedOut(false);
      setHttpError(error.message);
    })
  
    
  },[authState]);
  

  if (isLoading || isLoadingReview || isLoadingCuurentLoansCount||isLoadingBookCheckedOut) {
    return <Spinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutBook(){
    const url=`http://localhost:8080/api/books/secure/checkout/?bookId=${book?.id}`;
      const requestOptions={
        method:'PUT',
        headers:{
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json'
        }

      };

      const checkoutResponse= await fetch(url,requestOptions);
      if (!checkoutResponse.ok) {
        throw new  Error('HTTP error!');
        
      } setIsCheckedOut(true);
  }

  return (
    <div>
      <div className='container d-none d-lg-block'>
        <div className='row mt-5'>
          <div className='col-sm-2 col-md-2'>
            {book?.img ?
              <img src={book?.img} width='226' height='349' alt='Book' />
              :
              <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                   height='349' alt='Book' />
            }
          </div>
          <div className='col-4 col-md-4 container'>
            <div className='ml-2'>
              <h2>{book?.title}</h2>1
              <h5 className='text-primary'>{book?.author}</h5>
              <p className='lead'>{book?.description}</p>
              <StarReview reviews={reviews}size={32} />
            </div>
          </div>
          <CheckoutAndReview book={book} mobile={true} currentLoanCount={currentLoanCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false}/>
      </div>
      <div className='container d-lg-none mt-5'>
        <div className='d-flex justify-content-center align-items-center'>
          {book?.img ?
            <img src={book?.img} width='226' height='349' alt='Book' />
            :
            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                 height='349' alt='Book' />
          }
        </div>
        <div className='mt-4'>
          <div className='ml-2'>
            <h2>{book?.title}</h2>
            <h5 className='text-primary'>{book?.author}</h5>
            <p className='lead'>{book?.description}</p>
            <StarReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReview book={book} mobile={true} currentLoanCount={currentLoanCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true}/>
      </div>
    </div>
  );
};

export default BookCheckoutPage;
