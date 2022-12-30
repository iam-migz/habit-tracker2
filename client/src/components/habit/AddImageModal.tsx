import { ArrowPathIcon } from '@heroicons/react/24/solid';
import Modal from '../shared/Modal';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRecordStore } from '../../stores/recordStore';
import { useUploadImage } from '../../hooks/record/useUploadImage';

interface AddImageModalProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const AddImageSchema = z.object({
  image: z
    .instanceof(FileList)
    .refine((file) => file.length !== 0, {
      message: 'Image is required',
    })
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    )
    .refine(
      (file) => {
        const fileSize = file.item?.(0)?.size || 0;
        return fileSize <= MAX_FILE_SIZE;
      },
      { message: 'File size must be less than or equal to 200kb' },
    ),
});
type AddImageInput = z.TypeOf<typeof AddImageSchema>;

function AddImageModal({ isOpen, setIsOpen }: AddImageModalProp) {
  const { recordId, formattedDate } = useRecordStore();
  const { mutate } = useUploadImage(recordId);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddImageInput>({
    resolver: zodResolver(AddImageSchema),
  });
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: AddImageInput) => {
    console.log({ values });
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
    <Modal {...{ isOpen, setIsOpen }} title={formattedDate}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="imageUpload">Image Upload</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="border-solid border-[1px] border-gray-400 rounded focus:outline-blue-400 p-1"
            {...register('image')}
          />
          <p className="error">{errors.image?.message}</p>
        </div>
        <div className="error">{errorMsg}</div>
        <div className="flex justify-between">
          <div>
            <button className="bg-green-400 btn" type="submit">
              Submit
            </button>
            {false && (
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

export default AddImageModal;
