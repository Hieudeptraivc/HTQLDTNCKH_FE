import FormEditDeTai from './FormEditDeTai';
import FormCreateAttendant from './FormCreateAttendant';
import MemberInformation from './MemberInformation';
import { DeTaiProvider } from './DeTaiProvider';
import { useAccount } from '../../auth/useAccount';

function CreateDeTai() {
  const { data, isPending } = useAccount();
  if (isPending) return <Spinner />;
  return (
    <DeTaiProvider>
      <div className="flex flex-col p-4">
        <p className="font-poppins mb-4 w-full text-xl font-semibold">
          Tạo mới đề tài
        </p>
        <div className="flex flex-row gap-4">
          <div className="w-4/7 rounded-lg border-1 border-gray-200 shadow-lg">
            <FormEditDeTai />
          </div>
          <div className="w-3/7">
            <MemberInformation acc={data?.acc} />
          </div>
        </div>
        <div className="mt-6">
          <FormCreateAttendant />
        </div>
      </div>
    </DeTaiProvider>
  );
}

export default CreateDeTai;
