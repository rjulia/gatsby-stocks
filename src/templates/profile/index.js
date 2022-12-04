import React, { useState, useEffect } from 'react'
import AuthService from '../../services/auth.service'
import UserService from '../../services/user.service'
const Profile = () => {
  const { getStocks } = UserService
  const [stocks, setStocks] = useState([])

  const getStocksData = async () => {
    const response = await getStocks()
  }

  
  useEffect(() => {
    getStocksData()

  }, [])
  

  
  
  const { logout } = AuthService
  return (
    <>
      <div>Profile here we are</div>
      <button type="button" onClick={logout}>
        LogOut
      </button>
    
    </>
  )
}

export default Profile