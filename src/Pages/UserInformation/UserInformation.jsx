import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider'

const UserInformation = () => {
    const {user}=useContext(AuthContext)
  return (
    <div>
        <h4>{user.displayName}</h4>
        <h4>{user.email}</h4>
    </div>
  )
}

export default UserInformation