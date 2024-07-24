import React from 'react';
import { BrowserRouter as Router,Routes, Route,  } from 'react-router-dom';
import Login from './Login/login';
import Register from './Register/register'; 
import Dashboard from './Dashboard/dashboard';
import Insert from './insert/insert';


const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/insert" element={<Insert />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
