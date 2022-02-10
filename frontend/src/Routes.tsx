import Navbar from "core/components/Navbar"
import Login from "pages/Login"
import NoteRoute from "pages/Notes"
import Notes from "pages/Notes/NoteList"
import Register from "pages/Register"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const RoutesApp = () => {
  return (
    <BrowserRouter>
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