import React from 'react';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <div className="item">
        <h3>Garage Door Remote</h3>
      </div>
      <div className="right menu">
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
