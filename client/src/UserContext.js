import React from 'react';

export const currentUser = {
    username: null,
    userId: null,
    setUser: (user) => {},
    removeUser: (user) => {}
};

export const UserContext = React.createContext(currentUser);