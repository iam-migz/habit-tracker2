import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useEditHabit } from '../../hooks/habit/useEditHabit';
import { Habit } from '../../types/habit.types';
import Modal from '../shared/Modal';

interface EditHabitModalProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  habit: Habit;
}

function EditHabitModal({ isOpen, setIsOpen, habit }: EditHabitModalProp) {
  const { mutate, isLoading } = useEditHabit();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      setName(habit.name);
      setDescription(habit.description);
    }
  }, [isOpen]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { _id: habit._id, name, description },
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
    <Modal {...{ isOpen, setIsOpen }} title="Edit Habit">
      <form onSubmit={submitHandler} className="mt-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Habit Name</label>
          <input
            className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="name"
            name="name"
            id="name"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="description">Habit Description</label>
          <input
            className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            name="description"
            id="description"
            required
          />
        </div>
        <div className="error">{errorMsg}</div>

        <div className="flex justify-between">
          <div>
            <button className="bg-green-400 btn " type="submit">
              Submit
            </button>
            {isLoading && (
              <ArrowPathIcon className="w-5 h-5 inline-block ml-1 animate-spin" />
            )}
          </div>
          <button className="text-slate-400" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditHabitModal;
