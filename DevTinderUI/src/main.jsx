import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Body from './components/Body'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Provider } from 'react-redux'
import { store } from './utils/store'
import Feed from './components/Feed'
import Profile from './components/Profile'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Body/>}>
              <Route index element={<Feed/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/profile" element={<Profile/>}/>
              {/* <Route index element={<Signup/>} />
              <Route index element={<Profile/>} /> */}
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
