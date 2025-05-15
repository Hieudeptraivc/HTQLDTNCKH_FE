import HeaderMenu from './HeaderMenu';
import UserAvatar from './UserAvatar';
import { useAccount } from '../auth/useAccount';
import SpinnerMini from './SpinnerMini';

function Header() {
  const { data: currentData, isPending } = useAccount();

  if (isPending) return <SpinnerMini />;

  return (
    <header className="col-span-2 col-start-2 flex items-center justify-between gap-6 border-b border-gray-100 bg-gray-50 px-4 py-5">
      <div className="font-montserrat text-md font-bold">
        {currentData.acc.vaiTro !== 'Admin' ? (
          <p>
            <span className="font-medium">Khoa:</span>{' '}
            {currentData.user.khoa.ten}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-end gap-5">
        <UserAvatar currentData={currentData} />
        <HeaderMenu currentData={currentData} />
      </div>
    </header>
  );
}

export default Header;
