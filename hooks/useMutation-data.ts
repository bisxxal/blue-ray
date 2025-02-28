
import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast'

export const useMutationData = (
  mutationFn: MutationFunction<any, any>,
  queryKey?: string
) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: (data: any) => {
      console.log(data);
      toast(
        data?.status === 200
          ? "Success"
          : `Error ${data?.data || "Unknown error"}`
      );
    },
    onSettled: async () => {
      if (queryKey) {
        await client.invalidateQueries({ queryKey: [queryKey] });
      }
    },
  });

  return { mutate, isPending };
};

