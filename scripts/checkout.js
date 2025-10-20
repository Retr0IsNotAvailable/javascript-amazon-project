import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';

async function loadPage() {
  try {
    await loadProductsFetch();

  } catch(error) {
    console.log('Error message: ' + error);
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();