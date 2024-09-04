export const validateProduct = (
    productName: string,
    productCategory: string,
    productPrice: number | "",
    description: string,
    stock: number | ""
  ): { [key: string]: string } => {
    let validationErrors: { [key: string]: string } = {};
  
    if (!productName.trim()) validationErrors.productName = "Product name is required.";
    if (!productCategory) validationErrors.productCategory = "Category is required.";
    if (productPrice === "" || productPrice <= 0) validationErrors.productPrice = "Price must be a positive number.";
    if (!description.trim()) validationErrors.description = "Description is required.";
    if (stock === "" || stock < 0) validationErrors.stock = "Stock must be a non-negative integer.";
  
    return validationErrors;
  };
  
  export const isStockChangeValid = (
    stock: number | "",
    stockChange: number,
    stockChangeType: string
  ): string | null => {
    const stockNumber = typeof stock === "number" ? stock : Number(stock);
  
    if (stockChangeType === "subtract" && stockChange > stockNumber) {
      return "Cannot subtract more than available stock.";
    }
  
    return null;
  };
  