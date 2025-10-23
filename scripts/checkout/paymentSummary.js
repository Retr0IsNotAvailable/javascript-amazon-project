import { cart } from '../../data/cart.js';
import { formatCurrency, getPrices } from '../utils/money.js';
import { calculateQuantity } from '../utils/cartUtils.js';
import { addOrder } from '../orders/ordersCart.js';

export function renderPaymentSummary() {
  const prices = getPrices();

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateQuantity(cart.cartItems)}):</div>
      <div class="payment-summary-money">
        \$${formatCurrency(prices.productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        \$${formatCurrency(prices.shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        \$${formatCurrency(prices.totalBeforeCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        \$${formatCurrency(prices.taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        \$${formatCurrency(prices.totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
  
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cartItems 
        })
      });
      const order = await response.json();
      addOrder(order);
      
    } catch (error) {
      console.error(error);
    }

    window.location.href = './orders.html'; 
  });
}