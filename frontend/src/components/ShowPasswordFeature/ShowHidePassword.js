import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import './ShowHidePassword.css';

const ShowHidePassword = ({ inputComponent }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onClickHandler = () => {
    setShowPassword((value) => !value);
  };

  const propComponent = React.cloneElement(inputComponent, {
    ...inputComponent.props,
    type: showPassword ? 'text' : 'password',
  });
  return (
    <>
      {propComponent}
      {inputComponent.props?.value?.length > 0 && (
      <FontAwesomeIcon 
          icon={showPassword ? faEyeSlash : faEye} 
          id={classNames({
            addOpacity: !showPassword,
          })}
          onClick={onClickHandler}
          className="eye-icon"
        />
      )}
    </>
  );
};

export default ShowHidePassword;
