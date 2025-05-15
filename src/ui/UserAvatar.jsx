const API_URL = import.meta.env.VITE_API_URL;
function UserAvatar({ currentData }) {
  const avatarUrl = `${API_URL}/public/img/users/${currentData?.user.avatar}`;
  return (
    <div className="flex items-center gap-2">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="h-10 w-10 rounded-full border border-gray-300 object-cover"
      />
      <div className="flex flex-col items-start">
        <p className="font-montserrat text-[13.5px] font-medium">
          {currentData?.user.ten}
        </p>
        <p className="font-montserrat text-[12px] font-light">
          {currentData?.acc.vaiTro}
        </p>
      </div>
    </div>
  );
}

export default UserAvatar;
