import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  IconButton,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import ProductItem from "./ProductItem";
import { RootState } from "../../store/configureStore";
import { FiPlus } from "react-icons/fi";
import { Product } from "../../types/inventoryTypes";

type SortOrder = "asc" | "desc";

const ProductList: React.FC = () => {
  const list = useSelector((state: RootState) => state.inventory.products) as Product[];
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredList = list
    .filter((product) => {
      if (filterCategory && product.category !== filterCategory) return false;
      if (
        searchTerm &&
        !product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortColumn) return 0;

      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      const aLower = typeof aValue === "string" ? aValue.toLowerCase() : aValue;
      const bLower = typeof bValue === "string" ? bValue.toLowerCase() : bValue;

      if (aLower < bLower) return sortOrder === "asc" ? -1 : 1;
      if (aLower > bLower) return sortOrder === "asc" ? 1 : -1;

      return 0;
    });

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      mt={12}
      boxShadow="md"
      w="full"
      position="relative"
    >
      <Flex position="relative" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" w="full">
          Product List
        </Text>

        <Box position="absolute" right="0">
          <Link href="/product/add">
            <IconButton aria-label="Add New Product" icon={<FiPlus />} />
          </Link>
        </Box>
      </Flex>

      <Flex mb={4} gap={4} alignItems="center" justifyContent="space-between">
        <Text fontSize="sm">Showing {filteredList.length} results</Text>
        <Flex width={"40%"} gap={4}>
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="Sale">Sale</option>
            <option value="Buy">Buy</option>
          </Select>
        </Flex>
      </Flex>

      <Table variant="simple" mt={4}>
        <Thead bg="gray.100">
          <Tr>
            <Th textAlign="center">No</Th>
            <Th
              textAlign="center"
              onClick={() => handleSort("productName")}
              _hover={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Name{" "}
              {sortColumn === "productName" && (
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </Th>
            <Th
              textAlign="center"
              onClick={() => handleSort("category")}
              _hover={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Category{" "}
              {sortColumn === "category" && (
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </Th>
            <Th
              textAlign="center"
              onClick={() => handleSort("totalPrice")}
              _hover={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Price{" "}
              {sortColumn === "totalPrice" && (
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </Th>
            <Th textAlign="center">Description</Th>
            <Th
              textAlign="center"
              onClick={() => handleSort("stock")}
              _hover={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Stock{" "}
              {sortColumn === "stock" && (
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <ProductItem key={index} data={item} index={index + 1} />
            ))
          ) : (
            <Tr>
              <Td colSpan={7} textAlign="center">
                No products.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductList;
