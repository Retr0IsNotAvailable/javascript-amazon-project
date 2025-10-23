import { getProduct, loadProductsFetch } from '../../data/products.js';
import { getOrderDate } from './orderDate.js';
import { formatCurrency } from '../utils/money.js';
import { orders } from './ordersCart.js';

await loadProductsFetch();

// generate the orders' HTML
export function renderOrders() {
  let ordersGridHTML = '';

  orders.forEach((order) => {
    let orderDetailsHTML = '';
    let orderContainerHTML = '';

    order.products.forEach((product) => {
      const { productId } = product;
      const matchingProduct = getProduct(productId);

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
              Arriving on: ${product.estimatedDeliveryTime}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
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
              <div>${getOrderDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>\$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        ${orderDetailsHTML}
      </div>
    `
    getOrderDate(order.orderTime);

    ordersGridHTML += orderContainerHTML;
  });
  
  document.querySelector('.js-orders-grid')
    .innerHTML += ordersGridHTML;
}