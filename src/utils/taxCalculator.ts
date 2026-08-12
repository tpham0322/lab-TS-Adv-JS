export function calculateTax(
  price: number,
  category: string
): number {
  const standardTaxRate = 0.0475;
  const groceryTaxRate = 0.03;

  const taxRate =
    category.toLowerCase() === "groceries"
      ? groceryTaxRate
      : standardTaxRate;

  return price * taxRate;
}