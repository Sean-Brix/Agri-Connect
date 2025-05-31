import { BrowserRouter, Routes, Route } from 'react-router-dom'

// COMPONENTS
import Login from './Services/Authentication/Components/Login.jsx'
import Register from './Services/Authentication/Components/Register.jsx'
import Landing from './Services/Landing_Page/Landing/Landing.jsx'
import EIC from './Services/EIC_Borrow/Client/EIC.jsx'
import Survey from './Components/Survey/Survey.jsx'
import Profiles from './Services/Profile/Profiles/Profile.jsx'
import Edit_prof from './Services/Profile/Edit_Profile/Edit.jsx'
import Enroll from './Services/Enrollment/Enrollments/enroll.jsx'
import Available from './Services/EIC_Borrow/Admin/Available.jsx'
import Borrow from './Services/EIC_Borrow/Admin/Borrowed.jsx'
import Items from './Services/EIC_Borrow/Admin/Items.jsx'


// SERVER TEST
import API_Request from './TEST/api_request.jsx'

function App() {
  
  return (

    <BrowserRouter>
      <Routes>


        {/* DEVELOPMENT ROUTE */}
        
        <Route path='/' element = { <Landing/> } />
        <Route path='/login' element = { <Login/> } />
        <Route path='/register' element = { <Register/> } />
        <Route path='/eic' element = { <EIC/> } />
        <Route path='/survey' element = { <Survey/> } />
        <Route path='/profiles' element = { <Profiles/> } />
        <Route path='/profiles/edit' element = { <Edit_prof/> } />
        <Route path='/enrollment' element = { <Enroll/> } />  
       
         {/* ADMIN ROUTES */}
        <Route path='/avail' element = { <Available/> } />
        <Route path='/borrow' element = { <Borrow/> } />
        <Route path='/item' element = { <Items/> } />


        {/* SERVER TESTING */}

        <Route path='/testing/request' element = { <API_Request/> } />

 
      </Routes>
    </BrowserRouter>
  )
}

export default App
