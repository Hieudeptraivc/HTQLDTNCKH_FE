import Button from './Button';

function LogoutV1({ isPending, onClick }) {
  return (
    <div className="font-montserrat flex w-80 flex-col gap-3 font-semibold">
      <h3 className="text-xl">Xác nhận đăng xuất?</h3>
      <p className="text-md mb-3 text-gray-500">
        Bạn có chắc chắn muốn đăng xuất không?
      </p>

      <div className="flex justify-end gap-3">
        <Button variation="secondary" disabled={isPending} onClick={close}>
          Hủy thao tác
        </Button>
        <Button variant="danger" disabled={isPending} onClick={onClick}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}

export default LogoutV1;
