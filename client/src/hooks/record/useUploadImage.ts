import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';
import { Record } from '../../types/record.types';

type UploadImageParams = {
  image: FileList;
};

const mutationFn = async (params: UploadImageParams, recordId: string) => {
  console.log('params.image[0] :>> ', params.image[0]);
  const res = await api.patch(
    `/records/uploadImage/${recordId}`,
    {
      image: params.image[0],
    },
    {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    },
  );
  return res.data;
};

export const useUploadImage = (recordId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Record, ApiError, UploadImageParams>(
    (record) => mutationFn(record, recordId),
    // {
    //   onSettled: () => {
    //     queryClient.invalidateQueries({ queryKey: ['records', recordId] });
    //   },
    // },
  );
};
