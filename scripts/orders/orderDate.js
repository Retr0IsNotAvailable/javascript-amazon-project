import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function getOrderDate() {
  const today = dayjs();
  return today.format('MMMM D');
}