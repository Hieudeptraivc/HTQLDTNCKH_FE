function LinhVucInformation({ linhVuc }) {
  // console.log(linhVuc);
  return (
    <div className="h-2/5 w-full flex-2/5 overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
      <p className="font-montserrat bg-gray-200 px-4 py-2 font-semibold">
        Số lượng đề tài theo lĩnh vực
      </p>
      <div className="px-4 py-2">
        <span className="font-montserrat pr-2 font-semibold">Đề tài:</span>
        {linhVuc.deTai.length}
      </div>
      {/* <div className="px-4 py-2">
        <span className="font-montserrat pr-2 font-semibold">Giảng viên:</span>
        {khoa.giangVien.length}
      </div>
      <div className="px-4 py-2">
        <span className="font-montserrat pr-2 font-semibold">Sinh viên:</span>
        {khoa.sinhVien.length}
      </div> */}
    </div>
  );
}

export default LinhVucInformation;
