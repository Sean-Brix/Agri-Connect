import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// COMPONENTS
import Login from './Authentication/Components/Login.jsx';
import Register from './Authentication/Components/Register.jsx';
import Landing from './Services/Landing_Page/Landing/Landing.jsx';
import EIC from './Services/EIC_Borrow/Client/EIC.jsx';
import Survey from './Components/Survey/Survey.jsx';
import Profiles from './Services/Profile/Profiles/Profile.jsx';
import Edit_prof from './Services/Profile/Edit_Profile/Edit.jsx';
import Enroll from './Services/Enrollment/Enrollments/enroll.jsx';
import Settings from './Services/Settings/Client/Setting.jsx';
import Available from './Services/EIC_Borrow/Admin/Available.jsx';
import Borrow from './Services/EIC_Borrow/Admin/Borrowed.jsx';
import Items from './Services/EIC_Borrow/Admin/Items.jsx';

//ADMIN
import Dashboard from '../src/Admin/Components/Navigation/Dashboard.jsx';

// SERVER TEST
import API_Request from './TEST/api_request.jsx';
import Analytics from './Admin/Services/Analytics/Analytics.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>

              {/* AUTHENTICATION */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* CLIENT ROUTES */}
              <Route path="/" element={<Landing />} />


              {/* ADMIN ROUTES */}
              <Route path="/admin" element={<Dashboard />} />


              {/* SERVER TESTING */}
              <Route path="/testing/request" element={<API_Request />} />

            
            </Routes>
        </BrowserRouter>
    );
}

export default App;
