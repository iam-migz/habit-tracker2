import { ArrowPathIcon } from '@heroicons/react/24/solid';
import Modal from '../shared/Modal';
import { useRecordStore } from '../../stores/recordStore';
import { useDeleteImage } from '../../hooks/record/useDeleteImage';
import { useState } from 'react';

interface ViewImageModalProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  habitId: string;
}

function ViewImageModal({ isOpen, setIsOpen, habitId }: ViewImageModalProp) {
  const { formattedDate, record } = useRecordStore();
  const { mutate, isLoading } = useDeleteImage(record._id, habitId);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = () => {
    mutate(undefined, {
      onSuccess: () => {
        setIsOpen(false);
      },
      onError: (err) => {
        setErrorMsg(err.response?.data.message as string);
      },
    });
  };

  return (
    <Modal {...{ isOpen, setIsOpen }} title={formattedDate}>
      <div className="mt-2">
        <img
          src={`${import.meta.env.VITE_API_BASE}${record.image}`}
          alt=""
          className="max-h-[400px]"
        />
        <div className="error">{errorMsg}</div>
        <div className="flex justify-between mt-4">
          <div>
            <button
              className="bg-red-400 btn text-white"
              type="submit"
              onClick={onSubmit}
            >
              Delete
            </button>
            {isLoading && (
              <ArrowPathIcon className="w-5 h-5 inline-block ml-1 animate-spin" />
            )}
          </div>
          <button className="text-slate-400" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ViewImageModal;
