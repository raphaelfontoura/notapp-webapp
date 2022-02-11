import 'react-toastify/dist/ReactToastify.css';

import Navbar from 'core/components/Navbar';
import Login from 'pages/Login';
import NoteRoute from 'pages/Notes';
import Register from 'pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes/*" element={<NoteRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp