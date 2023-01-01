import React, { Fragment } from "react";
import ConfirmDelete from "./ConfirmDelete/ConfirmDelete";
import CategoryList from "./CategoryList/CategoryList";
import AddCategory from "./AddCategory/AddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";

const Categories = (props) => {
  return (
    <Fragment>
      <ConfirmDelete
        showConfirm={props.showConfirm}
        hideConfirm={props.hideConfirm}
        deleteCategory={props.deleteCategory}
      />
      <Modal
        size="lg"
        show={props.show}
        animation={false}
        onHide={() => console.log("Categories modal closed!")}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="d-block">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Categories</h4>
            <FontAwesomeIcon
              className="fontIcon c-pointer text-right"
              icon={faTimes}
              onClick={props.onClose}
            />
          </div>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid mb-5">
            <div className="row">
              <CategoryList
                categories={props.categories}
                confirmDelete={props.confirmDelete}
              />
            </div>
          </div>

          <h4 className="mb-2 mb-lg-3 mt-5">Add Category</h4>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <AddCategory
                  onAddCategory={props.onAddCategory}
                  categoryErrorMsgs={props.categoryErrorMsgs}
                  isCategoryError={props.isCategoryError}
                  categoryDetails={props.categoryDetails}
                  onFieldChange={props.onFieldChange}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Categories;
