import Label from './Label';
function ReadOnlyInput({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <p
        type="text"
        disabled
        value={value || 'Chưa có dữ liệu'}
        className="font-poppins max-h-48 overflow-y-auto rounded-xl border-1 border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] font-[400px] break-words whitespace-pre-wrap shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
      >
        {value}
      </p>
    </div>
  );
}

export default ReadOnlyInput;
