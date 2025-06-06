import { BrowserRouter, Routes, Route } from 'react-router-dom';
import react from 'react';

// COMPONENTS
import Login from './Authentication/Components/Login.jsx';
import Register from './Authentication/Components/Register.jsx';
import Landing from './Client/Services/Landing/Landing.jsx';

//ADMIN
import Dashboard from '../src/Admin/Components/Navigation/Dashboard.jsx';

// SERVER TEST  
import API_Request from './TEST/api_request.jsx';
import Details_php from './TEST/details_php.jsx';

//CLIENT 
import Eic from './Client/Services/EIC/EIC.jsx';
import Profile from './Client/Services/Profile/Profile.jsx';
import Enroll from './Client/Services/Enrollment/Seminar.jsx';
import Contact from './Client/Services/Info/contact.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* AUTHENTICATION */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* CLIENT ROUTES */}
                <Route path="/" element={<Landing />} />
                <Route path="/eic" element={<Eic />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/enroll" element={<Enroll />} />
                <Route path="/contact" element={<Contact />} />


                {/* ADMIN ROUTES */}
                <Route path="/admin" element={<Dashboard />} />

                {/* SERVER TESTING */}
                <Route path="/testing/request" element={<API_Request />} />
                <Route path="/testing/details" element={<Details_php />} />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;
