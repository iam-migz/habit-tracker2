import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { useAddHabit } from '../../hooks/habit/useAddHabit';
import Modal from '../shared/Modal';

interface AddHabitModalProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddHabitModal({ isOpen, setIsOpen }: AddHabitModalProp) {
  const { mutate, isLoading } = useAddHabit();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [includeImages, setIncludeImages] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      setIncludeImages(false);
    }
  }, [isOpen]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, description, includeImages },
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
    <Modal {...{ isOpen, setIsOpen }} title="Add New Habit">
      <form onSubmit={submitHandler} className="mt-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Habit Name</label>
          <input
            className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
            onChange={(e) => setName(e.target.value)}
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
            type="text"
            name="description"
            id="description"
            required
          />
        </div>
        <div className="error">{errorMsg}</div>

        <div className="mb-4">
          <label className="block" htmlFor="flexCheckDefault">
            Include Images
          </label>
          <input
            className="block w-4 h-4 cursor-pointer"
            type="checkbox"
            id="flexCheckDefault"
            onChange={() => setIncludeImages(!includeImages)}
          />
        </div>

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

export default AddHabitModal;
