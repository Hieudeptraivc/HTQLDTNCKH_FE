import { Outlet } from 'react-router-dom';
import AppLayout from '../ui/AppLayout';

function SinhVienLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default SinhVienLayout;
