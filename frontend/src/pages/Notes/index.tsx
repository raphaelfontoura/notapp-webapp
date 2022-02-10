import PrivateRoute from 'core/components/PrivateRoute'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NoteForm from './NoteForm'
import Notes from './NoteList'


const NoteRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="" element={<Notes />} />
        <Route path="/new" element={<NoteForm />} />
      </Route>
    </Routes>
  )
}

export default NoteRoute