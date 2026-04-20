import React from "react";
import Landing from "../components/Landing";
import Highlights from "../components/Highlights";
import Featured from "../components/Featured";
import Discounted from "../components/Discounted";
import Explore from "../components/Explore";

const Home = ({books, loading }) => {
  return (
    <>
      <Landing />
      <Highlights />
      <Featured books={books} loading={loading} />
      <Discounted books={books} loading={loading} />
      <Explore />
    </>
  );
};

export default Home;
