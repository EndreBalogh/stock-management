import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { edit, updateStock } from "../../store/features/inventorySlice";
import { useRouter } from "next/router";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { RootState } from "../../store/configureStore";
import { Product } from "../../types/inventoryTypes";

const EditProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const productList = useSelector((state: RootState) => state.inventory.products) as Product[];

  const [productName, setProductName] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number | "">("");
  const [stockChange, setStockChange] = useState<number>(0);
  const [stockChangeType, setStockChangeType] = useState<string>("add");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const product = productList.find((p) => p.id === query.productId);
    if (product) {
      setProductName(product.productName);
      setProductCategory(product.category);
      setProductPrice(product.totalPrice);
      setDescription(product.description);
      setStock(product.stock);
    }
  }, [productList, query.productId]);


  // Validation logic
  const validate = () => {
    let validationErrors: { [key: string]: string } = {};

    const stockNumber = typeof stock === "number" ? stock : Number(stock);
    const stockChangeNumber =
      typeof stockChange === "number" ? stockChange : Number(stockChange);

    if (!productName.trim())
      validationErrors.productName = "Product name is required.";
    if (!productCategory)
      validationErrors.productCategory = "Category is required.";
    if (productPrice === "" || productPrice <= 0)
      validationErrors.productPrice = "Price must be a positive number.";
    if (!description.trim())
      validationErrors.description = "Description is required.";
    if (stock === "" || stock < 0)
      validationErrors.stock = "Stock must be a non-negative integer.";
    if (stockChangeType === "subtract" && stockChangeNumber > stockNumber)
      validationErrors.stockChange = "Cannot subtract more than available stock.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleEditProduct = () => {
    if (!validate()) return;

    const updatedProduct = {
      id: query.productId as string,
      productName,
      category: productCategory,
      totalPrice:
        typeof productPrice === "number" ? productPrice : parseFloat(productPrice),
      description,
      stock: typeof stock === "number" ? stock : parseInt(stock),
      dateMade: new Date().toISOString(),
      history: [],
    };

    dispatch(edit(updatedProduct));

    const finalStockChange =
      stockChangeType === "add" ? stockChange : -stockChange;
    if (finalStockChange !== 0) {
      dispatch(
        updateStock({ id: query.productId as string, stockChange: finalStockChange })
      );
    }

    router.push("/");
  };

  return (
    <Flex w="85%" p={12} flexDir="column" alignItems="center" overflow="auto">
      <Heading>Edit Product</Heading>

      <FormControl isInvalid={!!errors.productName} mb={4}>
        <FormLabel>Product Name</FormLabel>
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
        />
        {errors.productName && <Text color="red.500">{errors.productName}</Text>}
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
        {errors.productPrice && <Text color="red.500">{errors.productPrice}</Text>}
      </FormControl>

      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        {errors.description && <Text color="red.500">{errors.description}</Text>}
      </FormControl>

      <FormControl isInvalid={!!errors.stock} mb={4}>
        <FormLabel>Stock</FormLabel>
        <NumberInput
          value={stock}
          onChange={(valueString) => setStock(Number(valueString))}
          min={0}
        >
          <NumberInputField placeholder="Enter stock quantity" />
        </NumberInput>
        {errors.stock && <Text color="red.500">{errors.stock}</Text>}
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Stock Change</FormLabel>
        <NumberInput
          value={stockChange}
          onChange={(valueString) => setStockChange(Number(valueString))}
          min={0}
        >
          <NumberInputField placeholder="Add or subtract stock quantity" />
        </NumberInput>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Change Type</FormLabel>
        <RadioGroup
          value={stockChangeType}
          onChange={(value) => setStockChangeType(value)}
        >
          <Stack direction="row">
            <Radio value="add">Add</Radio>
            <Radio value="subtract">Subtract</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {errors.stockChange && <Text color="red.500">{errors.stockChange}</Text>}

      <Button onClick={handleEditProduct} colorScheme="teal" mt={4}>
        Save Changes
      </Button>
    </Flex>
  );
};

export default EditProductForm;
