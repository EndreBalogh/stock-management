export const toEUR = (value: number): string => {
    const formattedNumber = new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  
    return formattedNumber.replace("EUR", "€");
  };
  
  export const formatNumber = (value: number, decimalPlaces: number = 2): string =>
    value.toFixed(decimalPlaces);
  