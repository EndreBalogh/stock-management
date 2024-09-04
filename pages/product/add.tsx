import React from "react";
import { Flex } from "@chakra-ui/react";
import Menu from "../../components/Common/Menu";
import AddProductForm from "../../components/Inventory/AddProductForm";

const AddProductPage: React.FC = () => {
  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
      <Menu />

      <Flex w="85%" p={4} flexDir="column" alignItems="center" overflow="auto">
        <AddProductForm />
      </Flex>
    </Flex>
  );
};

export default AddProductPage;
