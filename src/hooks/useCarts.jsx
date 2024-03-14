import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getCart, addOrUpdateCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

const useCarts = () => {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartsQuery = useQuery({
    queryKey: [`cart_${uid}`, uid],
    queryFn: () => getCart(uid),
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => {
      console.log(product);
      addOrUpdateCart({ userId: uid, product });
    },
    onSuccess: () => queryClient.invalidateQueries(`cart_${uid}`),
    onError: (error) => {
      console.error(error);
    },
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart({ userId: uid, productId: id }),
    onSuccess: () => queryClient.invalidateQueries(`cart_${uid}`),
    onError: (error) => {
      console.error(error);
    },
  });

  return { cartsQuery, addOrUpdateItem, removeItem };
};

export default useCarts;
