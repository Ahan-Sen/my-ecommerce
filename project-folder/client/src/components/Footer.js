import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function Footer(props) {
  const match = useRouteMatch("/orderhistory");
  return (
    <div
      className={`footer bg-dark text-white mt-3 ${match ? "navwidth" : ""}`}
    >
      <div className="row justify-content-center mr-0 ml-0">
        <div className="col-auto">
          <p>© Copyright 2021 Shopping </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
