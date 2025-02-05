import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Body from './Body'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route index element={<Login/>} />
            {/* <Route index element={<Signup/>} />
            <Route index element={<Profile/>} /> */}
          </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
