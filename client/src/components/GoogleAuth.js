import React, { useEffect, useContext } from 'react';
import './GoogleAuth.css';
import { Context as AuthContext } from '../context/AuthContext';

const GoogleAuth = () => {
  const {
    state: { isSignedIn, user },
    signIn,
    signOut,
    onAuthChanged
  } = useContext(AuthContext);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '32421567546-o94uiquld9ej60b715l603rrritqmk7i.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          onAuthChanged(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChanged);
        });
    });
    // eslint-disable-next-line
  }, []);

  if (isSignedIn == null) {
    return null;
  } else if (isSignedIn) {
    return (
      <div>
        <div className="ui horizontal list">
          <div className="item">
            <img
              className="ui mini circular image"
              alt="profile"
              src={user.imageUrl}
            />
            <div className="content">
              <div className="ui sub header">{user.name}</div>
              <div className="link" onClick={signOut}>
                Sign out
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <button className="ui red google button" onClick={signIn}>
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  }
};

export default GoogleAuth;
