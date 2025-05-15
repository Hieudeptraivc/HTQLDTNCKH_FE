import { Outlet } from 'react-router-dom';
import AppLayout from '../ui/AppLayout';

function GiangVienLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default GiangVienLayout;
