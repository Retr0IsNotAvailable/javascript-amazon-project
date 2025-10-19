export function renderCheckoutHeader(cart, calculateQuantity) {
  document.querySelector('.js-checkout-header-middle-section')
    .innerHTML = `
    Checkout (<a class="return-to-home-link"
      href="amazon.html">${calculateQuantity(cart)} items</a>)
  `;
}