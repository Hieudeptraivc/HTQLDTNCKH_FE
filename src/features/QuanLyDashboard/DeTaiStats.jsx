import { TbLoader3, TbReport } from 'react-icons/tb';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { GiCancel } from 'react-icons/gi';
import Stat from '../../ui/Stat';

function DeTaiStats({ allDetai }) {
  const numDeTai = allDetai?.length;
  const numDaDuyet = allDetai?.filter(
    (dt) => dt.trangThaiDuyet === 'Đã duyệt',
  ).length;
  const numDangChoDuyet = allDetai?.filter(
    (dt) => dt.trangThaiDuyet === 'Đang chờ duyệt',
  ).length;
  const numTuChoi = allDetai?.filter(
    (dt) => dt.trangThaiDuyet === 'Từ chối',
  ).length;
  return (
    <>
      <Stat
        title="Đề tài"
        color="indigo"
        icon={<TbReport size={32} />}
        value={numDeTai}
      />
      <Stat
        title="Đã duyệt"
        color="green"
        icon={<IoMdCheckboxOutline size={32} />}
        value={numDaDuyet}
      />
      <Stat
        title="Đang chờ duyệt"
        color="blue"
        icon={<TbLoader3 size={32} />}
        value={numDangChoDuyet}
      />
      <Stat
        title="Từ chối"
        color="red"
        icon={<GiCancel size={32} />}
        value={numTuChoi}
      />
    </>
  );
}

export default DeTaiStats;
