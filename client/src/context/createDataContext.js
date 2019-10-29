import React, { useReducer } from 'react';

export default (reducer, actions, initial_state) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial_state);
    let boundActions = {};

    Object.keys(actions).map(a => {
      boundActions[a] = actions[a](dispatch);
      return a;
    });

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
