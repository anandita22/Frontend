import React from "react";
import { Form } from "react-bootstrap";
import CustomButton from "../../../Common/Button_1";

const AddCategory = (props) => {
  let errorStrip =
    props.isCategoryError === true ? (
      <Form.Group>
        <ul className="mb-0">
          {props.categoryErrorMsgs.map((msg, i) => (
            <li key={i}>
              <p className="mb-0 text-danger">{msg}</p>
            </li>
          ))}
        </ul>
      </Form.Group>
    ) : null;
  return (
    <Form noValidate className="">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          onChange={(event) => props.onFieldChange("name", event)}
          value={props.categoryDetails.name}
          className="input px-3 py-3 rounded border-0"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Slug"
          name="slug"
          onChange={(event) => props.onFieldChange("slug", event)}
          value={props.categoryDetails.slug}
          className="input px-3 py-3 rounded border-0"
        />
      </Form.Group>
      {errorStrip}
      <Form.Group className="mb-0">
        <CustomButton
          isDisabled={false}
          click={props.onAddCategory}
          text="Add"
        />
      </Form.Group>
    </Form>
  );
};

export default AddCategory;
