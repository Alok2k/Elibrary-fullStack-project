import React from 'react'
import { Link } from 'react-router-dom'


const Returnbook = (props) => {
  
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="text-center">
                  {props.book.img ?
                <img
                src={props.book.img}
                width={"50%"}
                height={"150"}
                alt=""
              /> 
                :
                <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width={"50%"}
                height={"150"}
                alt=""
              />
                }
                  
                  <h6 className="mt-2"> {props.book.title}</h6>
                  <p>{props.book.author}</p>
                  <Link className="btn main-color text-white " to={`checkout/${props.book.id}`}>
                    BOOK NOW
                  </Link>
                </div>
              </div>
  )
}

export default Returnbook