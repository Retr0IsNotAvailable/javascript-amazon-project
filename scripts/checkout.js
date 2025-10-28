import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';

async function loadPage() {
  try {
    await loadProductsFetch();

  } catch(err) {
    console.error(err);
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();