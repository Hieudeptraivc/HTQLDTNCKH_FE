import { useNavigate } from 'react-router-dom';
import Window from './../../ui/Window';
import BaoCaoTienDo from './BaoCaoTienDo';
import BaoCaoTienDoDetail from './BaoCaoTienDoDetail';

function ModalBaoCaoTienDoDetail() {
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);

  return (
    <Window
      close={handleClose}
      className="max-h-[90vh] w-full max-w-5xl overflow-y-auto p-6"
    >
      <BaoCaoTienDoDetail />
    </Window>
  );
}

export default ModalBaoCaoTienDoDetail;
