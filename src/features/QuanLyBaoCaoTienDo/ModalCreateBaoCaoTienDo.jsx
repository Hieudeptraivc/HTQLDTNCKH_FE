import { useNavigate } from 'react-router-dom';
import CreateBaoCaoTienDo from './CreateBaoCaoTienDo';
import Window from './../../ui/Window';

function ModalCreateBaoCaoTienDo() {
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);

  return (
    <Window
      close={handleClose}
      className="max-h-[90vh] w-full max-w-5xl overflow-y-auto p-6"
    >
      <CreateBaoCaoTienDo />
    </Window>
  );
}

export default ModalCreateBaoCaoTienDo;
