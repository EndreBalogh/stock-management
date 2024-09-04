export const useMask = () => ({
  toEUR: (value: number): string => {
    const formattedNumber = new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    return formattedNumber.replace("EUR", "€");
  },
});
