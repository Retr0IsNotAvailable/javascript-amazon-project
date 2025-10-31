export function getOrderDate(dateString, isOrderPage = true){
  const date = new Date(dateString);
  let options;
  if (isOrderPage) {
    options = { month: 'long', day: 'numeric' };
  } else {
    options = {weekday: 'long', month: 'long', day: 'numeric'}
  }

  return date.toLocaleDateString('en-US', options);
}