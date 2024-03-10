import React, { createContext, useState } from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the context
export const MenuContext = createContext();

// Define the initial state using useState
const Index = () => {
  const [currentMenu, setCurrentMenu] = useState("Landing");

  return (
    <MenuContext.Provider value={{ currentMenu, setCurrentMenu }}>
        <App />
    </MenuContext.Provider>
  );
};

// Render the Index component into the root element
createRoot(document.getElementById('root')).render(<Index />);

reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
