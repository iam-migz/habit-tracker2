import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';
import { Record } from '../../types/record.types';

type DeleteRecordParams = {
  recordId: string;
};

const mutationFn = async (params: DeleteRecordParams) => {
  const res = await api.delete(`/records/${params.recordId}`);
  return res.data;
};

export const useDeleteRecord = (habitId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Record, ApiError, DeleteRecordParams>(
    (params) => mutationFn(params),
    {
      onMutate: async (newRecord) => {
        await queryClient.cancelQueries({ queryKey: ['records', habitId] });

        const previousRecords = queryClient.getQueryData<Record[]>([
          'records',
          habitId,
        ]);

        const advance = previousRecords?.filter(
          (d) => d._id != newRecord.recordId,
        );

        queryClient.setQueryData(['records', habitId], advance);

        return { previousRecords };
      },
      onError: (_err, _newRecord, context: any) => {
        queryClient.setQueryData(['records', habitId], context.previousTodos);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['records', habitId] });
      },
    },
  );
};
