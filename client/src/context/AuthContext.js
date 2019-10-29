import createDataContext from './createDataContext';
import axios from 'axios';

const initial_state = {
  isSignedIn: null,
  user: null,
  isAuthorized: false,
  apiJwt: null,
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'signedIn':
      return action.payload;
    case 'signedOut':
      return { ...initial_state, isSignedIn: false };
    default:
      return state;
  }
};

const signIn = dispatch => () => {
  try {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
  } catch (err) {}
};
const signOut = dispatch => () => {
  try {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signOut();
  } catch (err) {}
};
const onAuthChanged = dispatch => async isSignedIn => {
  if (isSignedIn) {
    const auth = window.gapi.auth2.getAuthInstance();
    const id_token = auth.currentUser.get().getAuthResponse().id_token;
    let isAuthorized = false;
    let apiJwt = null;

    try {
      const response = await axios.post('/api/signin', {
        idToken: id_token
      });
      isAuthorized = true;
      apiJwt = response.data.token;
    } catch (err) {
      isAuthorized = false;
    }

    dispatch({
      type: 'signedIn',
      payload: {
        isSignedIn: true,
        isAuthorized,
        apiJwt,
        user: {
          userId: auth.currentUser.get().getId(),
          imageUrl: auth.currentUser
            .get()
            .getBasicProfile()
            .getImageUrl(),
          name: auth.currentUser
            .get()
            .getBasicProfile()
            .getName()
        }
      }
    });
  } else {
    dispatch({ type: 'signedOut' });
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  { signIn, signOut, onAuthChanged },
  initial_state
);
