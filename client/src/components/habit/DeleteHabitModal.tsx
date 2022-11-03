import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useDeleteHabit } from '../../hooks/habit/useDeleteHabit';
import Modal from '../shared/Modal';

interface DeleteHabitModalProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
}

function DeleteHabitModal({ isOpen, setIsOpen, _id }: DeleteHabitModalProp) {
  const { mutate, isLoading } = useDeleteHabit();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
    }
  }, [isOpen]);

  const deleteHandler = () => {
    mutate(
      { _id },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: (err) => {
          if (err.response) {
            setErrorMsg(err.response.data.message);
          } else {
            setErrorMsg(err.message);
          }
        },
      },
    );
  };
  return (
    <Modal {...{ isOpen, setIsOpen }} title="">
      <div className="p-2">
        <h1>Are you sure you want to delete this Habit?</h1>
        <div className="error">{errorMsg}</div>
        <div className="flex justify-center space-x-4 mt-6 items-center">
          <button className="text-slate-400" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <div>
            <button
              className="btn bg-red-500 text-white"
              onClick={deleteHandler}
            >
              Delete
            </button>
            {isLoading && (
              <ArrowPathIcon className="w-5 h-5 inline-block ml-1  animate-spin" />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteHabitModal;
