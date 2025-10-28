// a class to generate cart objects
class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
   // a method to save the products of the cart into the browser
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  // clear items from cart and empty the localStorage
  clearCart() {
    this.cartItems = [];
    localStorage.setItem(this.#localStorageKey, JSON.stringify([]));
  }
  // a method to add to the cart a selected item
  addToCart(productId, quantity = 1) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {   //check if the product already exist
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }
  // a method to update quantity of the cart from checkout
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {    // loop through each object in cart
      if (cartItem.productId === productId) {  // if an object id is equal to the productId
        cartItem.quantity = newQuantity;    // re-assign its quantity
      }
    });
    this.saveToStorage();
  }
  // a method to remove products from cart
  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

export const cart = new Cart('cart');