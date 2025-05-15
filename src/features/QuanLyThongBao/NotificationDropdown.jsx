import Spinner from '../../ui/Spinner';
import { useMarkAsReadThongBao } from './useMarkAsRead';
import NotificationRow from './NotificationRow';

function NotificationDropdown({ isPending, thongBaos, userId, userRole }) {
  const {
    isMarking,
    markThongBao,
    thongBaoError: error,
  } = useMarkAsReadThongBao();

  return (
    <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl bg-white shadow-2xl">
      {isPending ? (
        <Spinner className="w-12 border-gray-500 border-r-gray-200" />
      ) : (
        <div className="max-h-96 overflow-y-auto rounded-xl p-4 transition-all duration-300 ease-in-out">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-poppins text-lg font-semibold text-gray-800">
              Thông báo
            </p>
          </div>
          <ul className="space-y-3">
            {thongBaos.length === 0 ? (
              <li className="p-1 text-center text-gray-500">
                Không có thông báo
              </li>
            ) : (
              thongBaos.map((tb) => (
                <NotificationRow
                  key={tb._id}
                  tb={tb}
                  userId={userId}
                  userRole={userRole}
                  onMarkAsRead={markThongBao}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
