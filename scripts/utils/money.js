// function to force 2 decimal display of price
export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}