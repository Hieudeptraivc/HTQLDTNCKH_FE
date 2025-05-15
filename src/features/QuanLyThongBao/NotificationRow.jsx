import SpinnerMini from '../../ui/SpinnerMini';

// components/NotificationsRow.jsx
function NotificationRow({ tb, userId, userRole, onMarkAsRead }) {
  const isRead =
    userRole === 'Sinh viên'
      ? tb.readBySinhViens.includes(userId)
      : userRole === 'Giảng viên'
        ? tb.readByGiangViens.includes(userId)
        : userRole === 'Admin'
          ? tb.readByAdmins.includes(userId)
          : tb.readByCanBoKhoas.includes(userId);

  return (
    <li
      key={tb._id}
      className={`rounded-lg border border-gray-200 p-2 shadow-xl hover:bg-gray-200 ${
        isRead ? 'bg-white' : 'bg-gray-100'
      }`}
    >
      <button
        onClick={() => onMarkAsRead({ thongBaoId: tb._id })}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="mr-2">
          <p
            className={`text-sm ${
              isRead ? 'text-gray-800' : 'font-semibold text-gray-900'
            }`}
          >
            {tb.message}
          </p>
          <span className="mt-1 block text-xs text-gray-400">
            {new Date(tb.createdAt).toLocaleString('vi-VN')}
          </span>
        </div>
        {!isRead && (
          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
        )}
      </button>
    </li>
  );
}

export default NotificationRow;
