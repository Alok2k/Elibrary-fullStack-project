import React from "react";
import ExploreTopBooks from "./ExploreTopBooks";

import Hero from "./Hero";
import LibraryServices from "../LibraryServices/LibraryServices";
import Carousel from "../Carousel/Carousel";


const Homepage = () => {
  return (
    <>
      <ExploreTopBooks />
      <Carousel />
      <Hero />
      <LibraryServices />
    </>
  );
};

export default Homepage;
