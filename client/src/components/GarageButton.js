import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import axios from 'axios';

const GarageButton = () => {
  const {
    state: { isSignedIn, isAuthorized, apiJwt }
  } = useContext(AuthContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onButtonClick = async () => {
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 1500);
    try {
      await axios.post(
        '/api/garage/door',
        {},
        {
          headers: {
            Authorization: `Bearer ${apiJwt}`
          }
        }
      );
    } catch (err) {}
  };

  if (isSignedIn !== true) {
    return null;
  }

  if (isAuthorized === false) {
    return (
      <div className="ui centered container">
        <div className="ui negative message">
          <div className="header">Not Authorized</div>
          <p>Your account doesn't have access. Oh noes...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="ui centered container">
      <button
        className="massive ui fluid primary button"
        onClick={onButtonClick}
        disabled={buttonDisabled}
      >
        Open / Close
      </button>
    </div>
  );
};

export default GarageButton;
