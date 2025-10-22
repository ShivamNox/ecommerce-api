// General helpers used across the project.

exports.formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') return amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

exports.calculateTax = (amount, rate = 0.1) => {
  return parseFloat((amount * rate).toFixed(2));
};
