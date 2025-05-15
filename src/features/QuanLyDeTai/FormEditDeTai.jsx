import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import SpinnerMini from '../../ui/SpinnerMini';
import Spinner from '../../ui/Spinner';
import { useAccount } from '../../auth/useAccount';
import { useEditDeTai } from './useEditDeTai';
import { useCreateDeTai } from './useCreateDeTai';
import { useDsLinhVuc } from '../QuanLyLinhVuc/useDsLinhVuc';

import { useEffect } from 'react';
import { useDeTaiContext } from './DeTaiProvider';
import LichSuModalWrapper from '../../ui/LichSuModalWrapper';
import { formatDateHour } from '../../utils/formatToVietNamDate';

function FormEditDeTai({ deTai = {} }) {
  const isEdit = Object.keys(deTai).length > 0;
  const navigate = useNavigate();
  const { data, isPending } = useAccount();
  const { editDeTai, isEditing } = useEditDeTai();
  const { createDeTai, isCreating } = useCreateDeTai();
  const { isPending: isLoadingDsLinhVuc, data: dsLinhVuc } = useDsLinhVuc();
  const {
    setAllSinhViens,
    setAllGiangViens,
    setAllGiangVienMongMuons,
    sinhViens,
    isEditTv,
    giangViens,
    giangVienMongMuons,
  } = useDeTaiContext();
  useEffect(() => {
    if (isEdit && deTai) {
      setAllSinhViens(deTai.sinhVien);
      setAllGiangViens(deTai.giangVien);
      setAllGiangVienMongMuons(deTai.giangVienMongMuon);
    }
  }, [isEdit, deTai]);
  const dsLinhVucTen = dsLinhVuc?.map((k) => {
    return { value: k._id, label: k.ten };
  });
  const { register, handleSubmit } = useForm({
    defaultValues: deTai ? { ...deTai, linhVuc: deTai?.linhVuc?._id } : {},
  });

  if (isPending) return <Spinner />;

  const { acc } = data;
  const khoaId = data?.user?.khoa._id;
  const sinhViensListFinal = sinhViens.map((sv) => {
    return {
      sinhVienId: sv._id,
      vaiTro: sv.vaiTro,
    };
  });
  const giangViensListFinal = giangViens.map((gv) => {
    return {
      giangVienId: gv._id,
      vaiTro: gv.vaiTro,
    };
  });
  const giangVienMongMuonsListFinal = giangVienMongMuons.map((gvmm) => {
    return {
      giangVienMongMuonId: gvmm._id,
      vaiTro: gvmm.vaiTro,
    };
  });
  function onSubmit(formData) {
    if (isEditTv) return;
    if (isEdit) {
      const {
        _id: deTaiId,
        giangVien,
        sinhVien,
        giangVienMongMuon,
        baoCaoTienDo,
        trangThaiDuyet,
        khoa,
        ...editData
      } = formData;

      // console.log(deTaiId, editData);
      editDeTai({
        deTaiId,
        editData: {
          ...editData,
          sinhVien: sinhViensListFinal,
          giangVien: giangViensListFinal,
          giangVienMongMuon: giangVienMongMuonsListFinal,
        },
      });
    } else {
      const newData = {
        ...formData,
        sinhVien: sinhViensListFinal,
        giangVien: giangViensListFinal,
        giangVienMongMuon: giangVienMongMuonsListFinal,
        khoa: khoaId,
      };
      // console.log(newData);
      createDeTai({ newData });
    }
  }
  // console.log(
  //   deTai?.sinhVien.find((sv) => sv.vaiTro === 'Trưởng nhóm').sinhVienId._id ===
  //     acc?.nguoiDung,
  // );
  // console.log(sinhViens, giangViens);
  return (
    <div className="gap-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
          }
        }}
      >
        <div className="grid grid-cols-2 gap-6 px-6 py-4">
          <div className="col-span-2 flex flex-col gap-2">
            <Label>Tên đề tài</Label>
            <textarea
              {...register('ten')}
              id="ten"
              className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
              rows="4"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Lĩnh vực</Label>

            {isLoadingDsLinhVuc ? (
              <SpinnerMini className="font-montserrat rounded-md bg-gray-300 px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none" />
            ) : (
              <select
                {...register('linhVuc')}
                id="linhVuc"
                name="linhVuc"
                className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
              >
                {dsLinhVucTen.map((option) => (
                  <option
                    className="font-montserrat bg-gray-50"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          {acc?.vaiTro !== 'Sinh viên' ? (
            <div className="flex flex-col gap-2">
              <Label>Trạng thái</Label>
              <select
                disabled={
                  acc?.vaiTro === 'Cán bộ khoa' &&
                  deTai?.trangThaiDuyet !== 'Đã duyệt'
                }
                {...register('trangThai')}
                id="trangThai"
                name="trangThai"
                className={`rounded-xl ${
                  acc?.vaiTro === 'Cán bộ khoa' &&
                  deTai?.trangThaiDuyet !== 'Đã duyệt'
                    ? 'bg-gray-50'
                    : null
                } border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300`}
              >
                {[
                  { value: 'Chưa triển khai', label: 'Chưa triển khai' },
                  { value: 'Đang triển khai', label: 'Đang triển khai' },
                  { value: 'Hoàn thành', label: 'Hoàn thành' },
                  { value: 'Hủy bỏ', label: 'Hủy bỏ' },
                ].map((option) => (
                  <option
                    className="font-montserrat bg-gray-50"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div className="col-span-2 flex flex-col gap-2">
            <Label>Tính cấp thiết</Label>
            <Input
              type="input"
              register={register}
              id="tinhCapThiet"
              name="tinhCapThiet"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <Label>Mục tiêu</Label>
            <textarea
              {...register('mucTieu')}
              id="mucTieu"
              className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
              rows="4"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Label>Nội dung chính</Label>
            <textarea
              {...register('noiDungChinh')}
              id="noiDungChinh"
              className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
              rows="4"
            />
          </div>

          {/* <div className="col-span-2 flex flex-col gap-2">
          <Label>Nội dung chính</Label>
          <textarea
            {...register('noiDungChinh')}
            id="noiDungChinh"
            className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
            rows="4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Giảng viên hướng dẫn chính</Label>
          <Input register={register} id="giangVien" name="giangVien" />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Giảng viên hướng dẫn phụ</Label>
          <select
            {...register('giangVien')}
            id="gvhdDeTai"
            className="rounded-xl border-1 border-gray-200 px-3 py-2 text-sm shadow-lg"
          >
            {isLoadingDsGiangVien ? (
              <div className="font-montserrat rounded-md bg-gray-300 px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none">
                <SpinnerMini />
              </div>
            ) : (
              dsGiangVienTen.map((option) => (
                <option
                  className="font-montserrat bg-gray-50"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))
            )}
          </select>
        </div> */}
        </div>

        {(isEdit && acc?.vaiTro === 'Cán bộ khoa') ||
        deTai?.sinhVien?.find((sv) => sv.vaiTro === 'Trưởng nhóm').sinhVienId
          ._id === acc?.nguoiDung ? (
          <div className="my-4 flex items-center justify-end gap-6 px-2 md:px-6">
            <Button
              variant="danger"
              onClick={() => navigate(-1)}
              className="w-36 text-xs font-extrabold md:text-[15px]"
            >
              Hủy chỉnh sửa
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isEditing}
              className="w-32 text-xs font-extrabold md:text-[15px]"
            >
              {isEditing ? <SpinnerMini /> : 'Chỉnh sửa'}
            </Button>
          </div>
        ) : null}
        {!isEdit ? (
          <div className="my-4 flex items-center justify-end gap-6 px-2 md:px-6">
            <Button
              variant="danger"
              onClick={() => navigate(-1)}
              className="w-36 text-xs font-extrabold md:text-[15px]"
            >
              Hủy tạo
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isCreating}
              className="w-32 text-xs font-extrabold md:text-[15px]"
            >
              {isCreating ? <SpinnerMini /> : 'Tạo đề tài'}
            </Button>
          </div>
        ) : null}
        <div className="flex justify-between px-2 py-2">
          {deTai?.ngayTao ? (
            <div className="px-2">
              <p className="font-montserrat text-[13px] font-semibold">
                Ngày tạo:
                <span className="pl-1 text-xs font-medium text-gray-500">
                  {formatDateHour(deTai.ngayTao)}
                </span>
              </p>
              {deTai?.ngayChinhSuaCuoi ? (
                <p className="font-montserrat text-[13px] font-semibold">
                  Lần chỉnh sửa cuối:
                  <span className="pl-1 text-xs font-medium text-gray-500">
                    {formatDateHour(deTai.ngayChinhSuaCuoi)}
                  </span>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </form>
      <div className="px-4 pb-2">
        <LichSuModalWrapper deTaiId={deTai._id} />
      </div>
    </div>
  );
}

export default FormEditDeTai;
