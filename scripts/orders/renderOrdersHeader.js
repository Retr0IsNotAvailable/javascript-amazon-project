export function renderOrdersHeader(cart, calculateQuantity) {
  document.querySelector('.js-cart-quantity')
    .innerHTML = calculateQuantity(cart.cartItems);
}