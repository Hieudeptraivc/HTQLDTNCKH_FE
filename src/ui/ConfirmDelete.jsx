import Button from './Button';
import SpinnerMini from './SpinnerMini';

function ConfirmDelete({
  isDeleting = false,
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <div className="font-montserrat flex w-88 flex-col gap-3 font-semibold">
      <h3 className="text-xl">Xác nhận xóa {resourceName}? </h3>
      <p className="text-md mb-3 text-gray-500">
        Bạn có muốn xóa {resourceName} này? Việc này không thể bị hoàn tác!!!
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Hủy thao tác
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          {isDeleting ? <SpinnerMini className="w-6" /> : `Xóa ${resourceName}`}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
