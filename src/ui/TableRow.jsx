function TableRow({ children, layout }) {
  return (
    <li
      className={` ${layout} font-montserrat grid items-center px-4 py-2 text-sm font-medium transition hover:bg-gray-100`}
    >
      {children}
    </li>
  );
}

export default TableRow;
