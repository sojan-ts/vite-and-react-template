import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Mainlayout from './layouts/MainLayout'
import Login from './pages/Login'

function App() {

  return (
      
    <BrowserRouter>
  
    <Routes>
    <Route exact path='*' element={<Mainlayout/>}></Route>
        <Route exact path='/login' element={< Login />}></Route>    
    </Routes>
    </BrowserRouter>
     
  )
}

export default App
