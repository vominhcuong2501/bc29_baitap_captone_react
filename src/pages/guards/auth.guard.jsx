import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

// khi chưa login thì chuyển vào trang login, nếu rồi sẽ vào trang 
export default function AuthGuard() {
  // lấy dữ liệu từ reducer
    const {userInfo} = useSelector(state => state.userReducer)

    // chuyển trang
    const navigate = useNavigate()

    useEffect(() => {
      // nếu chưa đăng nhập thì về login
        if(!userInfo) {
            navigate('/login')
        }
    }, [])
  return (
    <div><Outlet /></div>
  )
}
