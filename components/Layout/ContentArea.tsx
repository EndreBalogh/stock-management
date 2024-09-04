import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Heading, Text } from "@chakra-ui/react";
import InventorySummary from "../Inventory/InventorySummary";
import ProductList from "../Inventory/ProductList";
import { RootState } from "../../store/configureStore";
import { setRevenue, setExpense } from "../../store/features/financeSlice";
import { Product } from "../../types/inventoryTypes";

const ContentArea: React.FC = () => {
  const list = useSelector((state: RootState) => state.inventory.products) as Product[];
  const dispatch = useDispatch();

  useEffect(() => {
    let revenueCount = 0;
    let expenseCount = 0;

    list.forEach((product) => {
      const totalValue = product.totalPrice * product.stock;
      if (product.category === "Sale") revenueCount += totalValue;
      else expenseCount += totalValue;
    });

    dispatch(setRevenue(revenueCount));
    dispatch(setExpense(expenseCount));
  }, [list, dispatch]);

  return (
    <Flex w="85%" p="3%" flexDir="column" overflow="auto" minH="100vh">
      <Heading fontWeight="normal" mb={12} letterSpacing="tight">
        <Flex fontWeight="bold" display="inline-flex" textAlign="center">
          Welcome Inventory Management App 👋
        </Flex>
      </Heading>
      <InventorySummary />
      <ProductList />
    </Flex>
  );
};

export default ContentArea;
