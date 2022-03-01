import React from 'react';

const InputField = (props) => (
  <div className ="mb-3">
    <input type={props.type} className="form-control" id="exampleFormControlInput1" placeholder={props.placeHolder} />
  </div>
);

export default InputField;
