import { cart } from '../../data/cart.js';
import { getProduct, loadProductsFetch } from '../../data/products.js';
import { getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { getOrderDate } from './orderDate.js';
import { formatCurrency, getPrices } from '../utils/money.js';

await loadProductsFetch();

// generate the orders' HTML
export function renderOrders() {
  let orderDetailsHTML = '';
  let orderContainerHTML = '';
  const prices = getPrices();

  cart.cartItems.forEach((cartItem) => {
    const { productId } = cartItem;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption, 'MMMM D');

    orderDetailsHTML += `
      <div class="order-details-grid">
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dateString}
          </div>
          <div class="product-quantity">
            Quantity: ${cartItem.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
    `;
  });

  orderContainerHTML = `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${getOrderDate()}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>\$${formatCurrency(prices.totalCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
        </div>
      </div>
      ${orderDetailsHTML}
    </div>
  `

  document.querySelector('.js-orders-grid')
    .innerHTML += orderContainerHTML;
}