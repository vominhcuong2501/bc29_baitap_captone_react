import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

// khi login rồi không cho vào page login
export default function NoAuthGuard() {
    const {userInfo} = useSelector(state => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
      // nếu đăng nhập rồi thì dược vào trang booking
        if(userInfo) {
            navigate('/')
        }
    }, [])
  return (
    <div><Outlet /></div>
  )
}
