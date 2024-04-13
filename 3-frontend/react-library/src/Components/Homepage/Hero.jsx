import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
const {authState}=useOktaAuth();


  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>

          <div className="col-4 col-md-4 container d-flex justify-content-center align-align-items-center ">
            <div className="ml2">
              <h1>What have u been reading</h1>
              <p className="lead"> The lib team love to know what ur reading</p>
              {
                authState?.isAuthenticated?<Link type='button' 
                className='btn main-color btn-lg text-white'
                to='findbooks'
                >Explore Top Books</Link>

              :
              <Link className="btn main-color btn-lg text-white " to="login">
              SignUp
            </Link>
              }

              
            </div>
          </div>
        </div>

        <div className="row g-0 ">
          <div className="col-4 col-md-4 container  d-flex justify-content-center  align-items-center ">
            <div className="ml-2">
              <h1>Our Collection is always changing</h1>
              <p className="lead">
                check every day our collection changes! We work non-stop to
                prove good quality ebooks.
              </p>
            </div>
          </div>

          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* mobile  view */}

      <div class=" d-lg-none ">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have u been reading</h1>
              <p className="lead">
              The lib team love to know what ur reading
              </p>
              {
                authState?.isAuthenticated?<Link type='button' 
                className='btn main-color btn-lg text-white'
                to='findbooks'
                >Explore Top Books</Link>

              :
              <Link className="btn main-color btn-lg text-white " to="login">
              SignUp
            </Link>
              }
            </div>
          </div>
          <div className="mt-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
            <h1>Our Collection is always changing</h1>
              <p className="lead">
                check every day our collection changes! We work non-stop to
                prove good quality ebooks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
