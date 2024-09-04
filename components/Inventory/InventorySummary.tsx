import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Text } from "@chakra-ui/react";
import { RootState } from "../../store/configureStore";
import { setRevenue, setExpense } from "../../store/features/financeSlice";
import { useMask } from "../../hooks/useMask";
import { Product } from "../../types/inventoryTypes";

const InventorySummary: React.FC = () => {
  const productList = useSelector((state: RootState) => state.inventory.products) as Product[];
  const finance = useSelector((state: RootState) => state.finance);
  const dispatch = useDispatch();
  const mask = useMask();

  useEffect(() => {
    let revenueCount = 0;
    let expenseCount = 0;

    // Calculate revenue and expenses based on the price and stock of each product
    productList.forEach((product) => {
      const totalValue = product.totalPrice * product.stock;

      if (product.category === "Sale") {
        revenueCount += totalValue;
      } else {
        expenseCount += totalValue;
      }
    });

    dispatch(setRevenue(revenueCount));
    dispatch(setExpense(expenseCount));
  }, [productList, dispatch]);

  return (
    <Flex flexDir={{ base: "column", md: "row" }} mb={8}>
      <Flex
        flexDir="column"
        padding="5"
        marginRight={5}
        background="#020202"
        borderRadius={10}
        minW="150px"
        marginBottom={{ base: "3", md: "0" }}
      >
        <Text color="#ccc" fontSize="sm">
          Revenue
        </Text>
        <Text color="#fff" fontWeight="bold" fontSize="2xl">
          {mask.toEUR(finance.revenue)}
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        padding="5"
        marginRight={5}
        background="#020202"
        borderRadius={10}
        minW="150px"
        marginBottom={{ base: "3", md: "0" }}
      >
        <Text color="#ccc" fontSize="sm">
          Expenses
        </Text>
        <Text color="#fff" fontWeight="bold" fontSize="2xl" mb={2}>
          {mask.toEUR(finance.expense)}
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        padding="5"
        marginRight={5}
        background="#020202"
        borderRadius={10}
        minW="150px"
      >
        <Text color="#ccc" fontSize="sm">
          Balance
        </Text>
        <Text
          color={finance.revenue - finance.expense >= 0 ? "#00ff00" : "#ff0000"}
          fontWeight="bold"
          fontSize="2xl"
        >
          {mask.toEUR(finance.revenue - finance.expense)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default InventorySummary;
