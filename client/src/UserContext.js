import React from 'react';

export const currentUser = {
    username: null,
    setUser: (user) => {}
};

export const UserContext = React.createContext(currentUser);