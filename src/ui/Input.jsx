function Input({ type, id, register, name, disabled = false, className = '' }) {
  return (
    <input
      type={type}
      disabled={disabled}
      className={`rounded-xl ${disabled ? 'bg-gray-100' : ''} border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300 ${className}`}
      id={id}
      {...register(name)}
    />
  );
}

export default Input;
