import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export function useEditRoom() {
  const queryClient = useQueryClient();

  const { mutate: editRoom, isLoading: isEditing } = useMutation({
    // in React Query we can only pass one element to this function, this will only accept one argument, which is an object with the newRoomData and id.
    mutationFn: ({ newRoomData, id }) => createEditRoom(newRoomData, id),
    onSuccess: () => {
      toast.success("Room successfully edited");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editRoom };
}
