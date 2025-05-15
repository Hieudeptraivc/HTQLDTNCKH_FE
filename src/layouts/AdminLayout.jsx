import { Outlet } from 'react-router-dom';
import AppLayout from '../ui/AppLayout';

function AdminLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default AdminLayout;
