import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const DeTaiContext = createContext();

export const useDeTaiContext = () => useContext(DeTaiContext);

export function DeTaiProvider({ children }) {
  const queryClient = useQueryClient();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const [isEditTv, setIsEditTv] = useState(false);
  const [sinhViens, setSinhViens] = useState([]);
  const [giangViens, setGiangViens] = useState([]);
  const [giangVienMongMuons, setGiangVienMongMuons] = useState([]);
  // Thêm trạng thái gốc
  const [originalSinhViens, setOriginalSinhViens] = useState([]);
  const [originalGiangViens, setOriginalGiangViens] = useState([]);
  const [originalGiangVienMongMuons, setOriginalGiangVienMongMuons] = useState(
    [],
  );

  // Thêm thành viên
  function addSinhVien(sv) {
    if (sinhViens.length >= 5)
      return toast.error('Số lượng sinh viên tham gia đề tài không được quá 5');
    setSinhViens((prev) => [...prev, sv]);
    toast.success('Đã thêm sinh viên thành công vào danh sách');
  }

  function addGiangVien(gv) {
    if (giangViens.length >= 2)
      return toast.error(
        'Số lượng giảng viên tham gia đề tài không được quá 2',
      );
    setGiangViens((prev) => [...prev, gv]);
    toast.success('Đã thêm giảng viên thành công vào danh sách');
  }

  function addGiangVienMongMuon(gvmm) {
    if (giangVienMongMuons.length >= 2)
      return toast.error(
        'Số lượng giảng viên tham gia đề tài không được quá 2',
      );
    setGiangVienMongMuons((prev) => [...prev, gvmm]);
    toast.success('Đã thêm giảng viên thành công vào danh sách');
  }

  // Xoá thành viên
  function removeSinhVien(id) {
    setSinhViens((prev) => prev.filter((sv) => sv._id !== id));
    toast.success('Đã xóa sinh viên thành công khỏi danh sách');
  }

  function removeGiangVien(id) {
    setGiangViens((prev) => prev.filter((gv) => gv._id !== id));
    toast.success('Đã xóa giảng viên thành công khỏi danh sách');
  }

  function removeGiangVienMongMuon(id) {
    setGiangVienMongMuons((prev) => prev.filter((gvmm) => gvmm._id !== id));
    toast.success('Đã xóa giảng viên thành công khỏi danh sách');
  }

  // Đổi vai trò thành viên
  function changeRoleSinhVien(id, newRole) {
    setSinhViens((prev) =>
      prev.map((sv) => (sv._id === id ? { ...sv, vaiTro: newRole } : sv)),
    );
  }

  function changeRoleGiangVien(id, newRole) {
    setGiangViens((prev) =>
      prev.map((gv) => (gv._id === id ? { ...gv, vaiTro: newRole } : gv)),
    );
  }

  function changeRoleGiangVienMongMuon(id, newRole) {
    setGiangVienMongMuons((prev) =>
      prev.map((gvmm) =>
        gvmm._id === id ? { ...gvmm, vaiTro: newRole } : gvmm,
      ),
    );
  }

  function setAllSinhViens(rawSinhViens) {
    const mapped =
      rawSinhViens?.map((sv) => ({
        _id: sv.sinhVienId?._id || sv._id,
        ten: sv.sinhVienId?.ten || sv.ten,
        mssv: sv.sinhVienId?.mssv || sv.mssv,
        khoa: sv.sinhVienId?.khoa || sv.khoa,
        vaiTro: sv.vaiTro,
      })) || [];
    setSinhViens(mapped);
    setOriginalSinhViens(mapped);
  }

  function setAllGiangViens(rawGiangViens) {
    const mapped =
      rawGiangViens?.map((gv) => ({
        _id: gv.giangVienId?._id || gv._id,
        ten: gv.giangVienId?.ten || gv.ten,
        taiKhoan: gv.giangVienId?.taiKhoan || gv.taiKhoan,
        khoa: gv.giangVienId?.khoa || gv.khoa,
        vaiTro: gv.vaiTro,
      })) || [];
    setGiangViens(mapped);
    setOriginalGiangViens(mapped); // Lưu trạng thái gốc khi fetch
  }

  function setAllGiangVienMongMuons(rawGiangVienMongMuons) {
    const mapped =
      rawGiangVienMongMuons?.map((gvmm) => ({
        _id: gvmm.giangVienMongMuonId?._id || gvmm._id,
        ten: gvmm.giangVienMongMuonId?.ten || gvmm.ten,
        taiKhoan: gvmm.giangVienMongMuonId?.taiKhoan || gvmm.taiKhoan,
        khoa: gvmm.giangVienMongMuonId?.khoa || gvmm.khoa,
        vaiTro: gvmm.vaiTro,
      })) || [];
    setGiangVienMongMuons(mapped);
    setOriginalGiangVienMongMuons(mapped); // Lưu trạng thái gốc khi fetch
  }

  // Cập nhật trạng thái gốc khi nhấn "Lưu"
  function saveOriginalState() {
    if (sinhViens.length < 1) {
      return toast.error('Vui lòng thêm sinh viên trước khi lưu');
    }
    if (acc?.vaiTro === 'Cán bộ khoa' && giangViens.length < 1) {
      return toast.error(
        'Vui lòng thêm giảng viên hướng dẫn chính trước khi lưu',
      );
    }
    if (
      sinhViens.length > 0 &&
      !sinhViens.some((sv) => sv.vaiTro === 'Trưởng nhóm')
    ) {
      setIsEditTv(true);
      return toast.error('Đề tài cần phải có trưởng nhóm');
    }
    setOriginalSinhViens([...sinhViens]);
    if (
      giangViens.length > 0 &&
      !giangViens.some((gv) => gv.vaiTro === 'Giảng viên hướng dẫn chính')
    ) {
      setIsEditTv(true);
      return toast.error('Đề tài cần phải có giảng viên hướng dẫn chính');
    }
    setOriginalGiangViens([...giangViens]);
    if (
      giangVienMongMuons.length > 0 &&
      !giangVienMongMuons.some(
        (gv) => gv.vaiTro === 'Giảng viên hướng dẫn chính',
      )
    ) {
      setIsEditTv(true);
      return toast.error('Đề tài cần phải có giảng viên hướng dẫn chính');
    }
    setOriginalGiangVienMongMuons([...giangVienMongMuons]);
    toast.success(
      'Đã lưu danh sách thành viên tạm thời vui lòng nhấn chỉnh sửa để tiến hành lưu toàn bộ thông tin',
    );
    setIsEditTv(false);
  }

  // Khôi phục trạng thái gốc khi nhấn "Hủy chỉnh sửa"
  function resetToOriginal() {
    setSinhViens([...originalSinhViens]);
    setGiangViens([...originalGiangViens]);
    setGiangVienMongMuons([...originalGiangVienMongMuons]);
    setIsEditTv(false);
  }

  return (
    <DeTaiContext.Provider
      value={{
        sinhViens,
        giangViens,
        giangVienMongMuons,
        setAllSinhViens,
        setAllGiangViens,
        setAllGiangVienMongMuons,
        addSinhVien,
        addGiangVien,
        addGiangVienMongMuon,
        removeSinhVien,
        removeGiangVien,
        removeGiangVienMongMuon,
        changeRoleSinhVien,
        changeRoleGiangVien,
        changeRoleGiangVienMongMuon,
        isEditTv,
        setIsEditTv,
        saveOriginalState,
        resetToOriginal,
      }}
    >
      {children}
    </DeTaiContext.Provider>
  );
}
