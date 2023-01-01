import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./CategoryInfo.css";

const CategoryInfo = (props) => {
  return (
    <span className="d-inline-block categoryInfo text-white px-3 py-2 mr-3 mb-3">
      {props.name}
      <FontAwesomeIcon
        className="ml-2 fontIcon c-pointer"
        title="Delete Category"
        icon={faTimes}
        onClick={props.onConfirmDelete}
      />
    </span>
  );
};

export default CategoryInfo;
