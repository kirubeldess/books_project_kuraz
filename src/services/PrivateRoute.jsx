import React from 'react'
import { UserAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
export const PrivateRoute = ({children}) => {
    const {session} = UserAuth();

    if (session === undefined) {
        return <>Loading...</>
    }
  return (
    <>
    {session ? children : <Navigate to="/signin"/>}
    </>
  )
}
