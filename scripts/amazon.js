import { cart } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
import { calculateQuantity } from './utils/cartUtils.js';

loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';
  // update the cart quantity on the page each time we visit it or refresh it
  updateCartQuantity();

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;
  /*
  // function to calculate the total quantity of items
  function calculateQuantity(cart) {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }*/

  // function to update the cart's quantity on the webpage
  function updateCartQuantity() {
    let cartQuantity = calculateQuantity(cart.cartItems);

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  // function to display added message for 2s
  function displayAdded(productId, timeoutId) {
    const added = document.querySelector(`.js-added-to-cart-${productId}`);

    // show the added message by chaning the opacity to 1
    added.style.opacity = 1;

    clearTimeout(timeoutId);
    // hide the added message after 2 seconds of clicking on the add button
    timeoutId = setTimeout(() => {
      added.style.opacity = 0;
    }, 2000);

    return timeoutId;
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      let timeoutId;
      button.addEventListener('click', () => {
        const { productId } = button.dataset;
        const quantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`)
          .value);

        timeoutId = displayAdded(productId, timeoutId);

        cart.addToCart(productId, quantity);
        updateCartQuantity();
      });
    });
}