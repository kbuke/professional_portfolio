import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App.jsx'
import { AdminLogin } from './AdminLogin.jsx';
import "./styles.css"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        {/* <App />
        <AdminLogin /> */}
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/admin' element={<AdminLogin />}/>
          <Route path='*' element={<Navigate to = "/" replace />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
