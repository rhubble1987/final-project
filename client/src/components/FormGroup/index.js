import React from "react";

const FormGroup = ({ children, label }) => <div className="form-group">
    {label && <label>{label}</label>}
    {children}
</div>

export default FormGroup;