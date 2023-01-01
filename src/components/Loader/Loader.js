import React from "react";

import "./Loader.css";

const Loader = (props) => {
  let loader = null;
  if (props.show === true) {
    loader = (
      <div className="loaderWrapper">
        <div className="lds-dual-ring d-inline-block position-absolute"></div>
      </div>
    );
  }
  return loader;
};

export default Loader;
