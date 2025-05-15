import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[18rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="bg-gray-200">
        <div className="mx-6 mt-6 flex max-w-[120rem] flex-col gap-6 overflow-hidden rounded-2xl bg-white px-5 py-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
