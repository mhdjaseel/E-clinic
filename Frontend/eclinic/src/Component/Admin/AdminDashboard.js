import React from 'react'
import AdminNavbar from './AdminNavbar'
import { useLocation } from 'react-router-dom'
function AdminDashboard() {
const location=useLocation()

const {Form} = location.state||{}
const username=Form.username
  return (
    <div>
      <AdminNavbar username={username}/>
        <h1>admin</h1>
    </div>
  )
}

export default AdminDashboard