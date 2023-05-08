import React from "react";
import InputStyle from "./Input.styles";

const Input = (props) => {
    return (
        <InputStyle type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value}></InputStyle>
    );
};

export default Input;