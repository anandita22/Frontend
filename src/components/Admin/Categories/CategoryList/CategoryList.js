import React from "react";
import CategoryInfo from "../CategoryInfo/CategoryInfo";

const CategoryList = (props) => {
  let categories = <p className="mb-0">No categories added!</p>;
  if (props.categories && props.categories.length > 0) {
    categories = props.categories.map((category, index) => {
      return (
        <div className="col-lg-3 col-sm-4 col-6 mb-3" key={index}>
          <CategoryInfo
            onConfirmDelete={() => {
              props.confirmDelete(category._id);
            }}
            name={category.name}
            id={category._id}
          ></CategoryInfo>
        </div>
      );
    });
  }

  return categories;
};

export default CategoryList;
