import { getOrderProduct } from './getOrderProduct.js';

// calculate the progress of delivery
export function getDeliveryProgress(productId, orderId) {
  const { order, matchingOrderProduct } = getOrderProduct(productId, orderId);
  const { orderTime } = order;
  const { estimatedDeliveryTime } = matchingOrderProduct;
  const currentTime = new Date();

  const currentTimeDate = new Date(currentTime);
  const orderTimeDate = new Date(orderTime);
  const estimatedDeliveryTimeDate = new Date(estimatedDeliveryTime);

  let progressPercent = ((currentTimeDate - orderTimeDate) / (estimatedDeliveryTimeDate - orderTimeDate)) * 100;
  progressPercent = Math.round(progressPercent).toFixed(2);

  return progressPercent;
}