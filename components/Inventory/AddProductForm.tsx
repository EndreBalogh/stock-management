import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { insert } from "../../store/features/inventorySlice";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";

const AddProductForm: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number | "">("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const router = useRouter();

  const validate = () => {
    let validationErrors: { [key: string]: string } = {};

    if (!productName.trim())
      validationErrors.productName = "Product name is required.";
    if (!productCategory)
      validationErrors.productCategory = "Category is required.";
    if (productPrice === "" || productPrice <= 0)
      validationErrors.productPrice = "Price must be a positive number.";
    if (!description.trim())
      validationErrors.description = "Description is required.";
    if (stock === "" || stock <= 0)
      validationErrors.stock = "Stock must be a positive integer.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleAddProduct = () => {
    if (!validate()) return;

    const newProduct = {
      id: new Date().toISOString(),
      productName,
      category: productCategory,
      totalPrice:
        typeof productPrice === "number"
          ? productPrice
          : parseFloat(productPrice),
      description,
      stock: typeof stock === "number" ? stock : parseInt(stock),
      dateMade: new Date().toISOString(),
      history: [],
    };

    dispatch(insert(newProduct));
    router.push("/");
  };

  return (
    <Flex w="85%" p={4} flexDir="column" alignItems="center" overflow="auto">
      <Heading>Add New Product</Heading>

      <FormControl isInvalid={!!errors.productName} mb={4}>
        <FormLabel>Product Name</FormLabel>
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
        />
        {errors.productName && (
          <Text color="red.500">{errors.productName}</Text>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.productCategory} mb={4}>
        <FormLabel>Category</FormLabel>
        <Select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Sale">Sale</option>
          <option value="Buy">Buy</option>
        </Select>
        {errors.productCategory && (
          <Text color="red.500">{errors.productCategory}</Text>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.productPrice} mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          placeholder="Enter price"
        />
        {errors.productPrice && (
          <Text color="red.500">{errors.productPrice}</Text>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        {errors.description && (
          <Text color="red.500">{errors.description}</Text>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.stock} mb={4}>
        <FormLabel>Stock</FormLabel>
        <Input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          placeholder="Enter stock quantity"
        />
        {errors.stock && <Text color="red.500">{errors.stock}</Text>}
      </FormControl>

      <Button onClick={handleAddProduct} colorScheme="teal" mt={4}>
        Add Product
      </Button>
    </Flex>
  );
};

export default AddProductForm;
