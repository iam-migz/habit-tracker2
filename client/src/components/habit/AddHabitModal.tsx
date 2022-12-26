import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAddHabit } from '../../hooks/habit/useAddHabit';
import Modal from '../shared/Modal';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface AddHabitModalProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddHabitSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, 'Name too short - 3 chars minimum'),
  description: z
    .string({
      required_error: 'description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(3, 'Description too short - 3 chars minimum'),
});

export type AddHabitInput = z.TypeOf<typeof AddHabitSchema>;

function AddHabitModal({ isOpen, setIsOpen }: AddHabitModalProp) {
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddHabitInput>({
    resolver: zodResolver(AddHabitSchema),
  });
  const { mutate, isLoading } = useAddHabit();

  const onSubmit = (values: AddHabitInput) => {
    mutate(values, {
      onSuccess: () => {
        setIsOpen(false);
      },
      onError: (err) => {
        setErrorMsg(err.response?.data.message as string);
      },
    });
  };

  return (
    <Modal {...{ isOpen, setIsOpen }} title="Add New Habit">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Habit Name</label>
          <input
            className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
            type="text"
            id="name"
            required
            {...register('name')}
          />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="description">Habit Description</label>
          <input
            className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
            type="text"
            id="description"
            required
            {...register('description')}
          />
        </div>
        <p className="error">{errors.description?.message}</p>
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

export default AddHabitModal;
