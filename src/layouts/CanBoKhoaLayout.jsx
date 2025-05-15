import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';

import Sidebar from './../ui/Sidebar';
import AppLayout from '../ui/AppLayout';

function CanBoKhoaLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default CanBoKhoaLayout;
