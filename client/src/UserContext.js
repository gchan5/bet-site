import React from 'react';

export const currentUser = {
    id: null,
    username: null,
};

export const UserContext = React.createContext(currentUser);