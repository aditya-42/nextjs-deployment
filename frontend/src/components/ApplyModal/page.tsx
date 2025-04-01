import React from 'react';
import { useRouter } from 'next/navigation';

interface ApplyModalProps {
  closeModal: () => void;
  jobTitle: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ closeModal, jobTitle }) => {
  const router = useRouter();

  const handleApplyManual = () => {
    closeModal(); 
    router.push(`/applicant/application-form?jobTitle=${encodeURIComponent(jobTitle)}`);
    
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">How would you like to apply?</h2>
        <div className="space-y-4">
          <button
            onClick={handleApplyManual}
            className="w-full py-2 bg-[#6A38C2] text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Apply Manually
          </button>
         
        </div>
        <button
          onClick={closeModal}
          className="mt-4 w-full py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApplyModal;
