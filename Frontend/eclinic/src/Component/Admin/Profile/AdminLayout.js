import AdminSidebar from './AdminSidebar';
import { useNavigate,Outlet } from 'react-router-dom';

function AdminLayout() {
   return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar fixed width */}
      <AdminSidebar />

      {/* Main content fills remaining space and scrolls if needed */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
<Outlet/>
      </main>
    </div>
  );
}

export default AdminLayout