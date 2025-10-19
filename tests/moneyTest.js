import { formatCurrency } from '../scripts/utils/money.js';

function testCase(number, exp) {
  if (formatCurrency(number) === exp) {
    console.log('%cPassed', 'color: lightgreen');
  } else {
    console.log('%cFailed', 'color: red');
  }
}

console.log('%cTest Suite: formatCurrency', 'color: yellow');

console.log('convert Cents into dollars');
testCase(2095, '20.95');

console.log('works with 0');
testCase(0, '0.00');

console.log('Rounds up to the nearest cent');
testCase(2000.5, '20.01');