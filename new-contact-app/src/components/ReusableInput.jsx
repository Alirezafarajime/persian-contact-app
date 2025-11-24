import React from 'react';
const ReusableInput = ({ label, name, register, error, type = 'text' }) => {
return (
<div className="form-group">
<label htmlFor={name}>{label}</label>
<input
type={type}
id={name}
{...register(name)} />
{error && <p className="form-error">{error.message}</p>}
</div>);};
export default ReusableInput;
    
