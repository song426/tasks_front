import React from "react";
import Navbar from "../components/Navbar";
import Itempanel from "../components/Itempanel";

const index = () => {
  return (
    <div className="page_section">
      <Navbar menuIdx={1} />
      <Itempanel pageTitle="Completed Items" />
    </div>
  );
};

export default index;
