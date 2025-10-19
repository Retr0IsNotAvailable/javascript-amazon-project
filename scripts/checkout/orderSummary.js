import { cart } from '../../data/cart.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { calculateQuantity, updateCartQuantity } from '../utils/cartUtils.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

// a function to re-run the HTML-generative code of orderSummary.js in order to update the web page
export function renderOrderSummary() {
  // a var to store all the generated HTML into the cart
  let cartSummaryHTML = '';

  renderCheckoutHeader(cart.cartItems, calculateQuantity);

  cart.cartItems.forEach((cartItem) => {
    const { productId } = cartItem;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}"/>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link"
            data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input type="text" class="quantity-input js-quantity-input-${matchingProduct.id}"/>
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingProduct.id}">Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(cartItem, matchingProduct)}
        </div>
      </div>
    </div>
  `;
  });

  // funtion to generate the HTML for the available delivery option
  function deliveryOptionsHTML(cartItem, matchingProduct) {
    let html = '';

    // loop through each available delivery option
    deliveryOptions.forEach((deliveryOption) => {
      // calculate and format the estimated delivery date
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `\$${formatCurrency(deliveryOption.priceCents)} -`;
      
      // check if this delivery option matches the one selected in the cart
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      // append the delivery option to the HTML block
      html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
    });

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  // select all update links
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {    // loop through each one of them to see which one is clicked
      link.addEventListener('click', () => {
        const { productId } = link.dataset;   // get the productId of the parent element

        // get the item-container of the product's unique class w/ the DOM
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
      });
    });

  // select all save links
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {    // loop through all save links when clicked
      link.addEventListener('click', () => {
        const { productId } = link.dataset;   // get the productId of the parent element
        // get the item-container of the product's unique class w/ the DOM
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // get the item-container input element
        const containerInput = document.querySelector(`.js-quantity-input-${productId}`);
        const inputValue = parseInt(containerInput.value);

        // update the cart itself
        cart.updateQuantity(productId, inputValue);
        
        containerInput.value = '';
        container.classList.remove('is-editing-quantity');

        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  // select all delete links
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {  // loop through each one of them to see which one is clicked
      link.addEventListener('click', () => {
        const { productId } = link.dataset;    // get the productId of the parent element of the link through dataset
        cart.removeFromCart(productId);

        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  // add event listeners for radio buttons in the checkout
  document.querySelectorAll('.js-delivery-option')
    .forEach((e) => {
      e.addEventListener('click', () => {
        const { productId, deliveryOptionId } = e.dataset;

        cart.updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();

        renderPaymentSummary();
      });
    });
}