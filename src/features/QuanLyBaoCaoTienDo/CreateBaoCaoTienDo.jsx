import FormEditBaoCaoTienDo from './FormEditBaoCaoTienDo';

function CreateBaoCaoTienDo({ onCloseModal }) {
  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-poppins text-2xl font-semibold text-gray-800">
          Tạo mới báo cáo tiến độ
        </h1>
      </div>
      <FormEditBaoCaoTienDo />
    </div>
  );
}

export default CreateBaoCaoTienDo;
