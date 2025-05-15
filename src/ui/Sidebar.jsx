import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className="row-span-2 row-start-1 flex flex-col gap-8 border-r border-gray-100 bg-gray-50 p-4 pr-6">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
