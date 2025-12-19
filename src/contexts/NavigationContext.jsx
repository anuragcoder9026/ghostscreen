import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('landing');

    const navigateTo = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    return (
        <NavigationContext.Provider value={{ currentPage, navigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
};