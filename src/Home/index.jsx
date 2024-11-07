import React from "react";
import Navbar from "../components/Navbar";
import Itempanel from "../components/Itempanel";

const index = () => {
  return (
    <div className="page_section">
      <Navbar menuIdx={0} />
      <Itempanel pageTitle="All Items" />
    </div>
  );
};

export default index;
