import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

// khi chưa login thì chuyển vào trang login, nếu rồi sẽ vào trang 
export default function AuthGuard() {
    const {userInfo} = useSelector(state => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }
    }, [])
  return (
    <div><Outlet /></div>
  )
}
