export function renderEmptyCheckout() {
  document.querySelector('.js-checkout-grid')
    .classList.add('empty-checkout-grid');
  
  document.querySelector('.js-empty-cart')
    .style.display = 'block';
  
  document.querySelector('.js-payment-summary')
    .classList.add('empty-payment-summary');
  
  document.querySelector('.view-products').addEventListener('click', () => {
    window.location.href = './';
  });
}