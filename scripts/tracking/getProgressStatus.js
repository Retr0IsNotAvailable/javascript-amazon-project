// set the correct status of the product in the progress bar
export function getProgressStatus(progress) {
  if (progress >= 0 && progress < 50) {
    document.querySelector('.js-preparing')
      .style.color = 'rgb(6, 125, 98)';
  } else if (progress >= 50 && progress < 99) {
    document.querySelector('.js-shipped')
      .style.color = 'rgb(6, 125, 98)';
  } else {
    document.querySelector('.js-delivered')
      .style.color = 'rgb(6, 125, 98)';
  }
}