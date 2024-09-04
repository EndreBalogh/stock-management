import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../store/configureStore";
import { insert, edit, updateStock, del } from "../store/features/inventorySlice";
import { Product, ProductHistory } from "../types/inventoryTypes";

// custom hook to handle inventory management operations
const useInventory = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: RootState) => state.inventory.products) as Product[];

  const addProduct = useCallback(
    (product: Product) => {
      dispatch(insert(product));
    },
    [dispatch]
  );

  const editProduct = useCallback(
    (product: Product) => {
      dispatch(edit(product));
    },
    [dispatch]
  );

  const changeStock = useCallback(
    (id: string, stockChange: number) => {
      dispatch(updateStock({ id, stockChange }));
    },
    [dispatch]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      dispatch(del({ id }));
    },
    [dispatch]
  );

  const getProductById = useCallback(
    (id: string) => {
      return productList.find((product) => product.id === id);
    },
    [productList]
  );

  const trackChangeHistory = useCallback(
    (
      productId: string,
      field: keyof Product,
      oldValue: any,
      newValue: any
    ) => {
      const product = getProductById(productId);
      if (product) {
        const newHistoryEntry: ProductHistory = {
          date: new Date().toISOString(),
          field: field as string,
          oldValue,
          newValue,
        };
        dispatch(edit({ ...product, history: [...product.history, newHistoryEntry] }));
      }
    },
    [dispatch, getProductById]
  );

  return {
    productList,
    addProduct,
    editProduct,
    changeStock,
    deleteProduct,
    getProductById,
    trackChangeHistory,
  };
};

export default useInventory;
