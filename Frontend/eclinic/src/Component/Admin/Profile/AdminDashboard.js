import { useEffect } from 'react'
import AdminNavbar from '../Profile/AdminNavbar'
import ManageAppoinments from '../Appoinments/ManageAppoinments'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {


  return (
    <div>
      <AdminNavbar />
      <ManageAppoinments />
    </div>
  )
}



export default AdminDashboard