import { orders } from '../orders/ordersCart.js';

export function getOrderProduct(productId, orderId) {
  const orderInfo = {
    matchingOrderProduct: undefined,
    order: undefined
  };
  orders.forEach((order) => {
    if (order.id === orderId) {
      orderInfo.order = order;
      order.products.forEach((orderProduct) => {
        if (orderProduct.productId === productId) {
          orderInfo.matchingOrderProduct = orderProduct;
        }
      });
    }
  });
  return orderInfo;
}