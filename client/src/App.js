import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

import Signup from './Signup';
import Login from './Login';
import UserList from './User';

const App = () => {
  return (
    <Router>
      <Routes>  
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
