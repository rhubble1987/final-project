import { func, oneOf, string } from "prop-types"
import React from "react";

const TextInput = ({ type, value, onChange, placeholder }) => <input type={type} value={value} onChange={onChange} className="form-control" placeholder={placeholder} />

TextInput.propTypes = {
    type: oneOf(["password", "email", "text"]),
    value: string,
    onChange: func,
    placeholder: string
}
TextInput.defaultProps = {
    type: "text",
    value: "",
    onChange: Function.prototype,
    placeholder: ""
}

export default TextInput