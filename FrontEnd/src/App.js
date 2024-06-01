import React, { useState } from "react";
import './App.css';
import Login from "./Components/LoginSignup/Login";
import Register from "./Components/LoginSignup/Register";
import Home from "./Components/HomePage/Home";
import Menu from "./Components/Menu/Menu";
import YourOrders from "./Components/YourOrders/YourOrders"; 
import VerificationProcess from "./Components/LoginSignup/VerificationProcess"; 
import SelectionForYou from "./Components/SelectionForYou/SelectionForYou";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [cartItems, setCartItems] = useState([]);  

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleRegistrationSuccess = () => {
    setCurrentForm('verification');
  };
  
  const handleLoginSuccess = (username, email) => {
    setIsLoggedIn(true);
    setCurrentPage('home');
    setUsername(username);
    setEmail(email)
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const handleVerificationComplete = (username, email) => {
    setIsLoggedIn(true); 
    setCurrentPage('home');
    setUsername(username);
    setEmail(email)
  };

  const handleBackToRegister = () => {
    setCurrentForm('register');
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      switch(currentForm) {
        case "login":
          return <Login onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} />;
        case "register":
          return <Register onFormSwitch={toggleForm} onRegistrationSuccess={handleRegistrationSuccess} />;
        case "verification":
          return <VerificationProcess onVerificationComplete={handleVerificationComplete} onBackToRegister={handleBackToRegister} />;
        default:
          return <Login onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} />;
      }
    } else {
      switch (currentPage) {
        case 'home':
          return <Home username={username} onPageChange={handlePageChange} />;
        case 'SelectionForYou':  
          return <SelectionForYou username={username} onBackToHome={() => handlePageChange('home')} onPageChange={handlePageChange} cartItems={cartItems} setCartItems={setCartItems}/>;
        case 'Menu':
          return <Menu username={username} onBackToHome={() => handlePageChange('home')} onPageChange={handlePageChange} cartItems={cartItems} setCartItems={setCartItems} />;
        case 'YourOrders':
          return <YourOrders username={username} email={email} onBackToHome={() => handlePageChange('home')} onPageChange={handlePageChange} cartItems={cartItems} setCartItems={setCartItems} />;  
        case 'quit':
          setIsLoggedIn(false);
          setCurrentForm('login');
          setCurrentPage('home');
          break;
        default:
          return <Home onPageChange={handlePageChange} />;
      }
    }
  };

  const backgroundClass = isLoggedIn ? (currentPage === 'home' ? 'homeBackground' : '') : 'loginBackground';

  return (
    <div className={`App ${backgroundClass}`}>
      {renderPage()}
    </div>
  );
}

export default App;

