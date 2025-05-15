const variantStyles = {
  primary: 'text-blue-50 bg-blue-500 rounded-xl hover:bg-blue-600',
  secondary:
    'text-gray-500 bg-gray-0 border border-gray-200 hover:text-gray-900',
  danger: 'text-red-50 rounded-xl bg-red-500 hover:bg-red-600',
};

export default function Button({
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  disabled,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-montserrat flex justify-center rounded px-0 py-2 text-center font-medium transition-colors duration-200 md:px-4 ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
