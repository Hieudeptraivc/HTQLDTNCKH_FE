import {
  PlusCircle,
  Calendar,
  MessageCircle,
  User,
  X,
  Trash2,
} from 'lucide-react';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { useNhanXets } from './useNhanXets';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { useCreateNhanXet } from './useCreateNhanXet';
import { useEditNhanXet } from './useEditNhanXet';
import { useDeleteNhanXet } from './useDeleteNhanXet';
import SpinnerMini from '../../ui/SpinnerMini';

const API_URL = import.meta.env.VITE_API_URL;

// Format date to display in a readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

function NhanXetForm({
  isPending = false,
  onSubmit,
  onCancel,
  defaultValues = { tieuDe: '', noiDung: '' },
  isEdit = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <div className="font-montserrat mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-md font-semibold text-gray-800">
          {isEdit ? 'Chỉnh sửa nhận xét' : 'Thêm nhận xét mới'}
        </h3>
        <button
          onClick={onCancel}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label
            htmlFor="tieuDe"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Tiêu đề
          </label>
          <input
            id="tieuDe"
            type="text"
            disabled={isPending}
            className="font-poppins w-full rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="Nhập tiêu đề"
            {...register('tieuDe', { required: 'Tiêu đề là bắt buộc' })}
          />
          {errors.tieuDe && (
            <p className="mt-1 text-xs text-red-500">{errors.tieuDe.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="noiDung"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Nội dung
          </label>
          <textarea
            id="noiDung"
            disabled={isPending}
            rows={5}
            className="font-poppins w-full rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="Nhập nội dung nhận xét"
            {...register('noiDung', { required: 'Nội dung là bắt buộc' })}
          />
          {errors.noiDung && (
            <p className="mt-1 text-xs text-red-500">
              {errors.noiDung.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="items-center border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="items-center bg-blue-600 text-sm text-white hover:bg-blue-700"
          >
            {isPending ? (
              <SpinnerMini className="w-6" />
            ) : isEdit ? (
              'Cập nhật'
            ) : (
              'Thêm mới'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function FeedbackCard({ nhanXet, onEdit, onDelete, isDeleting, acc }) {
  const { giangVien, tieuDe, noiDung, ngayTao, ngayChinhSuaCuoi } = nhanXet;
  const avatarUrl =
    giangVien?.avatar && `${API_URL}/public/img/users/${giangVien.avatar}`;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <div className="bg-gray-100 px-4 py-3">
        <div className="flex items-center">
          <div className="mr-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-100">
            <img
              src={avatarUrl}
              alt={giangVien?.ten || 'Giảng viên'}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">
                {giangVien?.ten || 'Không có tên'}
              </h3>
              {giangVien?.khoa?.ten && (
                <span className="mr-2 rounded-full bg-gray-300 px-2 py-0.5 text-xs text-gray-800">
                  {giangVien.khoa.ten}
                </span>
              )}
            </div>

            <p className="flex items-center justify-between text-xs text-gray-500">
              {giangVien?.taiKhoan.email && (
                <span className="mr-2 flex items-center rounded-full text-xs text-gray-800">
                  <MdEmail size={13} className="mr-1" />
                  {giangVien?.taiKhoan.email}
                </span>
              )}
              <span className="flex items-center text-xs text-gray-500">
                <Calendar size={12} className="mr-1" />
                {ngayChinhSuaCuoi
                  ? formatDate(ngayChinhSuaCuoi)
                  : formatDate(ngayTao)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <h4 className="mb-2 flex items-center text-[15px] font-medium text-gray-800">
            <MessageCircle size={16} className="mr-2 text-gray-800" />
            {tieuDe}
          </h4>
          {acc?.vaiTro === 'Giảng viên' && (
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => onEdit(nhanXet)}
                className="rounded-full bg-gray-50 p-1 text-gray-800 hover:bg-gray-300"
              >
                <CiEdit size={20} />
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-full bg-gray-50 p-1 text-gray-800 hover:bg-red-100"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          )}
        </div>
        <div className="rounded-md bg-gray-50 px-3 py-2 text-[14px] whitespace-pre-line text-gray-700">
          {noiDung}
        </div>

        {showDeleteConfirm && (
          <div className="font-montserrat m t-3 rounded-md bg-red-50 p-3 font-medium">
            <p className="mb-2 text-sm text-red-700">
              Bạn có chắc chắn muốn xóa nhận xét này?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                disabled={isDeleting}
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-md bg-gray-200 px-3 py-1 text-xs text-gray-800 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                disabled={isDeleting}
                onClick={() => {
                  onDelete(nhanXet._id);

                  setShowDeleteConfirm(false);
                }}
                className="rounded-md bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
              >
                {isDeleting ? <SpinnerMini /> : 'Xóa'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyFeedback() {
  return (
    <div className="font-montserrat flex flex-col items-center justify-center py-10 text-center">
      <MessageCircle size={48} className="mb-3 text-gray-600" />
      <h3 className="text-lg font-medium text-gray-700">
        Chưa có nhận xét nào
      </h3>
      <p className="text-sm text-gray-600">
        Giảng viên hướng dẫn chưa đưa ra nhận xét nào cho báo cáo này
      </p>
    </div>
  );
}

function NhanXetInformation({ baoCaoId, fileInfo, acc, trangThai }) {
  let { isPending, nhanXet } = useNhanXets({
    baoCaoId,
  });
  const { isCreating, createNhanXet } = useCreateNhanXet();
  const { isEditing, editNhanXet } = useEditNhanXet();
  const { isDeleting, deleteNhanXet } = useDeleteNhanXet();
  const [isAddingFeedback, setIsAddingFeedback] = useState(false);
  const [editingNhanXet, setEditingNhanXet] = useState(null);

  const handleAddSubmit = (data) => {
    const newData = { tieuDe: data.tieuDe, noiDung: data.noiDung };
    createNhanXet(
      {
        baoCaoId,
        newData,
      },
      {
        onSuccess: () => {
          setIsAddingFeedback(false);
        },
      },
    );
  };

  const handleEditSubmit = (data) => {
    const editData = { tieuDe: data.tieuDe, noiDung: data.noiDung };
    editNhanXet(
      {
        nhanXetId: editingNhanXet._id,
        editData,
      },
      {
        onSuccess: () => {
          setEditingNhanXet(null);
        },
      },
    );
  };

  const handleEdit = (nhanXet) => {
    setEditingNhanXet(nhanXet);
    setIsAddingFeedback(false);
  };

  const handleDelete = (nhanXetId) => {
    deleteNhanXet({
      nhanXetId,
    });
  };

  const cancelAddOrEdit = () => {
    setIsAddingFeedback(false);
    setEditingNhanXet(null);
  };
  if (acc?.vaiTro === 'Cán bộ khoa') {
    return null;
  }
  if (!trangThai && !baoCaoId) {
    if (acc?.vaiTro === 'Giảng viên') {
      return (
        <div className="rounded-lg border border-gray-300 shadow-lg">
          <div className="flex justify-center py-5">
            Chưa thể thêm nhận xét vì sinh viên chưa nộp báo cáo
          </div>
        </div>
      );
    } else if (acc?.vaiTro === 'Sinh viên') {
      return (
        <div className="rounded-lg border border-gray-300 shadow-lg">
          <div className="flex justify-center py-5">
            Chưa có nhận xét để hiển thị.
          </div>
        </div>
      );
    }
  }
  if (isPending)
    return (
      <div className="rounded-lg border border-gray-300 shadow-lg">
        <div className="flex items-center justify-between rounded-t-lg bg-gray-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">
              Nhận xét của giảng viên hướng dẫn
            </span>
          </div>
        </div>
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      </div>
    );

  const toggleAddFeedback = () => {
    setIsAddingFeedback(!isAddingFeedback);
    setEditingNhanXet(null);
  };

  return (
    <div className="rounded-lg border border-gray-300 shadow-lg">
      <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-gray-100 to-gray-300 px-4 py-3">
        <div className="flex items-center gap-2">
          <User className="text-gray-800" size={20} />
          <span className="font-semibold text-gray-800">
            Nhận xét của giảng viên hướng dẫn
          </span>
          {nhanXet && nhanXet.length > 0 && (
            <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-gray-600">
              {nhanXet.length}
            </span>
          )}
        </div>
        {acc?.vaiTro === 'Giảng viên' && (
          <button
            variant="ghost"
            onClick={toggleAddFeedback}
            className="rounded-full bg-gray-200 p-2 text-gray-800 hover:bg-gray-100"
            disabled={editingNhanXet !== null}
          >
            <PlusCircle size={20} />
          </button>
        )}
      </div>

      <div className="bg-gray-50 p-4">
        {isAddingFeedback && (
          <NhanXetForm
            onSubmit={handleAddSubmit}
            isPending={isCreating}
            onCancel={cancelAddOrEdit}
          />
        )}

        {editingNhanXet && (
          <NhanXetForm
            onSubmit={handleEditSubmit}
            isPending={isEditing}
            onCancel={cancelAddOrEdit}
            defaultValues={{
              tieuDe: editingNhanXet.tieuDe,
              noiDung: editingNhanXet.noiDung,
            }}
            isEdit={true}
          />
        )}

        {nhanXet && nhanXet.length > 0 ? (
          <div className="space-y-4">
            {nhanXet.map((item) => (
              <FeedbackCard
                acc={acc}
                key={item._id}
                nhanXet={item}
                isDeleting={isDeleting}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyFeedback />
        )}
      </div>
    </div>
  );
}

export default NhanXetInformation;
