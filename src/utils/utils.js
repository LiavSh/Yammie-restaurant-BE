function validateOrder(order) {
  const { price, status, items } = order;
  if (!price) {
    return "invalid price - must be a number";
  }
  if (price < 1) {
    return "Invalid price - must be bigger than 0";
  }
  if (!status) {
    return "Invalid status - must be PENDING/DELIVERED/CANCELED";
  }
  if (!items) {
    return "Invalid order - order items are missing";
  }
  return null;
}
exports.validateOrder = validateOrder;
