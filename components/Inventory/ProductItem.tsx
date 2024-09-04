import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { del } from "../../store/features/inventorySlice";
import { useRouter } from "next/router";
import { Tr, Td, Flex, Text, IconButton, VStack } from "@chakra-ui/react";
import { FiTrash, FiEdit, FiClock } from "react-icons/fi";
import { Product } from "../../types/inventoryTypes";

interface ProductItemProps {
  data: Product;
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ data, index }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showHistory, setShowHistory] = useState(false);

  const handleDelItem = () => {
    if (confirm("Delete this item?")) {
      dispatch(del({ id: data.id }));
    }
  };

  const handleEditItem = () => {
    router.push(`/product/${data.id}`);
  };

  const formattedDate = new Date(data.dateMade).toLocaleDateString();
  const formattedDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });

  const getFieldName = (field: string) => {
    switch (field) {
      case "stock":
        return "Stock Level";
      case "productName":
        return "Name";
      case "category":
        return "Category";
      case "totalPrice":
        return "Price";
      default:
        return field;
    }
  };

  return (
    <>
      <Tr>
        <Td textAlign="center">{index}</Td>
        <Td textAlign="center">
          <Flex flexDir="column">
            <Text fontWeight="bold">{data.productName}</Text>
            <Text fontSize="sm" color="gray.500">
              {formattedDate}
            </Text>
          </Flex>
        </Td>
        <Td textAlign="center">{data.category}</Td>
        <Td textAlign="center">{data.totalPrice.toFixed(2)} €</Td>
        <Td textAlign="center">{data.description}</Td>
        <Td textAlign="center">{data.stock}</Td>
        <Td textAlign="center">
          <IconButton
            icon={<FiEdit />}
            mr={2}
            aria-label="Edit"
            onClick={handleEditItem}
          />
          <IconButton
            icon={<FiClock />}
            onClick={() => setShowHistory(!showHistory)}
            mr={2}
            aria-label="History"
          />
          <IconButton
            icon={<FiTrash />}
            onClick={handleDelItem}
            aria-label="Delete"
          />
        </Td>
      </Tr>
      {showHistory && (
        <Tr>
          <Td colSpan={7} paddingLeft={"5%"}>
            <VStack align="start" spacing={2}>
              <Text fontSize="sm" color="gray.500">
                Created on: {formattedDateTime(data.dateMade)}
              </Text>
              {(data.history || []).map(
                (change, index) =>
                  change.field !== "description" && (
                    <Text key={index} fontSize="sm" color="gray.500">
                      {formattedDateTime(change.date)}:{" "}
                      {getFieldName(change.field)} changed from{" "}
                      {change.oldValue} to {change.newValue}
                    </Text>
                  )
              )}
            </VStack>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default ProductItem;
