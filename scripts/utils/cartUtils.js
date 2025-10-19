// function to calculate the total quantity of items
export function calculateQuantity(cart) {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

// function to update the cart items count in checkout page
export function updateCartQuantity(itemsQuantity) {
  document.querySelector('.js-checkout-items-quantity')
    .innerHTML = `${itemsQuantity} items`;
}