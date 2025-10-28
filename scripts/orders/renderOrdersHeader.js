export function renderOrdersHeader(cart, calculateQuantity) {
  document.querySelector('.js-cart-link')
    .innerHTML = `
      <img class="cart-icon" src="images/icons/cart-icon.png">
      <div class="cart-quantity js-cart-quantity">${calculateQuantity(cart.cartItems)}</div>
      <div class="cart-text">Cart</div>
    `
}