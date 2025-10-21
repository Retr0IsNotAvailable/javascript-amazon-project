import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

// function to force 2 decimal display of price
export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

// calculate total price
export function getPrices() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeCents * 0.1;
  const totalCents = totalBeforeCents + taxCents;

  return {
    productPriceCents,
    shippingPriceCents,
    totalBeforeCents,
    taxCents,
    totalCents
  };
}