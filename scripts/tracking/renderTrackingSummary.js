/* Renders the order tracking summary on tracking.html.
 * Loads product data, reads productId and orderId from the URL,
 * and displays estimated delivery date, product details, quantity, image, and progress state.
 */
import { loadProductsFetch, getProduct } from '../../data/products.js';
import { getOrderProduct } from './getOrderProduct.js';
import { getDeliveryProgress } from './trackDeliveryProgress.js';
import { getProgressStatus } from './getProgressStatus.js';
import { getOrderDate } from '../orders/orderDate.js';

await loadProductsFetch();

// render tracking summary
export function renderTrackingSummary() {
  const url = new URL(window.location.href);
  const productId = url.searchParams.get('productId');
  const orderId = url.searchParams.get('orderId');

  // get the product properties in the orders cart
  const {matchingOrderProduct} = getOrderProduct(productId, orderId);
  console.log(matchingOrderProduct);
  // get the product properties in the products
  const matchingCartProduct = getProduct(productId);

  const { estimatedDeliveryTime } = matchingOrderProduct;

  const progressPercent = getDeliveryProgress(productId, orderId);
  
  const orderTrackingHTML = `
    <a class="back-to-orders-link link-primary" href="./orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${getOrderDate(estimatedDeliveryTime, false)}
    </div>

    <div class="product-info">
      ${matchingCartProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${matchingOrderProduct.quantity}
    </div>

    <img class="product-image" src="${matchingCartProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label js-preparing">
        Preparing
      </div>
      <div class="progress-label current-status js-shipped">
        Shipped
      </div>
      <div class="progress-label js-delivered">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  `

  document.querySelector('.js-order-tracking')
    .innerHTML = orderTrackingHTML;
  
  getProgressStatus(progressPercent);
  
  // setTimeout is necessary, otherwise js will change the width value before
  // the HTML is rendered on the page, somehow.
  setTimeout(() => {
    document.querySelector('.js-progress-bar')
      .style.width = `${progressPercent}%`;
  }, 100);
}