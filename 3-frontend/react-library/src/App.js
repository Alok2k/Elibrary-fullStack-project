import "./App.css";
import {  Routes, Route} from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Navbar/Footer";
import Navbar from "./Components/Navbar/navbar";
import SearchBookPage from "./Components/SearchBook/SearchBookPage";
import BookCheckoutPage from "./Components/BookCheckout/BookCheckoutPage";
import { useNavigate } from 'react-router-dom';
import { octaConfig } from "./lib/octaConfig";
import { OktaAuth } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";

const oktaAuth = new OktaAuth(octaConfig);
export const App = () => {

  const customAuthHandler=()=>{
    history.pushState('/login')
  }
  const history = useNavigate();
  const restoreOriginalUri=async(_oktaAuth,originaluri)=>{
    history(originaluri || '/',window.location.original);
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="home" element={<Homepage />} />
          <Route path="findbooks" element={<SearchBookPage />} />
          <Route path="checkout/:bookId" element={<BookCheckoutPage />} />
          <Route path="login" Component={()=><LoginWidget config={octaConfig}/>}  />
          <Route path="/login/callback" Component={LoginCallback} />
        </Routes>
      </div>

      <Footer />
      </Security>
    </div>
  );
};
