import { isAuthenticated } from 'core/utils/auth'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {
  return (
    isAuthenticated() ? <Outlet /> : <Navigate to="/" replace={true} />
  );
}

export default PrivateRoute