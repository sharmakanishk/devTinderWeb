import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Body from './Body'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import { Provider } from 'react-redux'
import { store } from './utils/store'
import Feed from './Feed'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Body/>}>
              <Route index element={<Feed/>} />
              <Route path="/login" element={<Login/>} />
              {/* <Route index element={<Signup/>} />
              <Route index element={<Profile/>} /> */}
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
