import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getProducts as fetchProducts, addNewProduct } from "../api/firebase";

const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => queryClient.invalidateQueries("products"),
    onError: (error) => {
      console.error(error);
    },
  });
  return { productsQuery, addProduct };
};

export default useProducts;
