import { BrowserRouter, Routes, Route } from 'react-router-dom'

// COMPONENTS
import Login from './Services/Authentication/Components/Login.jsx'
import Reg_1 from './Services/Authentication/Components/Reg_1.jsx'
import Landing from './Services/Landing_Page/Landing/Landing.jsx'
import EIC from './Services/EIC_Borrow/Client/EIC.jsx'
import Survey from './Components/Survey/Survey.jsx'



function App() {
    
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element = { <Landing/> } />
        <Route path='/Login' element = { <Login/> } />
        <Route path='/Register' element = { <Reg_1/> } />
        <Route path='/eic' element = { <EIC/> } />
        <Route path='/survey' element = { <Survey/> } />
        
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
