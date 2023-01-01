import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = (props) => {
  return (
    <Button
      disabled={props.isDisabled}
      className="text-uppercase buttonStyle_1 p-3"
      type="button"
      onClick={props.click}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
