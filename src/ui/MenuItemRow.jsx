function MenuItemRow({ icon, children, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex w-full items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {icon}
        {children}
      </button>
    </li>
  );
}
export default MenuItemRow;
