import { useState } from 'react';
import { useLogout } from '../auth/useLogout';
import Button from './Button';
import { IoExitOutline } from 'react-icons/io5';
import SpinnerMini from './SpinnerMini';
import Window from './Window';
import LogoutV1 from './LogoutV1';

function Logout() {
  const { logout, isPending } = useLogout(); // <-- GỌI HÀM NÀY
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <>
      {!isOpen ? (
        <Button
          className="font-montserrat flex items-center gap-3 text-[15px] font-semibold transition-all"
          onClick={open}
        >
          {!isPending ? (
            <IoExitOutline />
          ) : (
            <span className="mx-auto">
              <SpinnerMini />
            </span>
          )}
        </Button>
      ) : (
        <Window open={isOpen} close={close}>
          <LogoutV1
            isPending={isPending}
            onClick={() => {
              logout();
              close();
            }}
          />
        </Window>
      )}
    </>
  );
}

export default Logout;
