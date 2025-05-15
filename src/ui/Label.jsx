function Label({ children, className }) {
  return (
    <label
      className={`font-montserrat text-[14.5px] ${className} font-semibold`}
    >
      {children}
    </label>
  );
}

export default Label;
