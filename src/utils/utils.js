
function validateOrder(order) {
    const { price, status, items } = order;
    if (!price) {
      return "invalid price - must be a number";
    } else if (price < 0) {
      return "Invalid price - must be bigger than 0";
    } else if (!status) {
      return "Invalid status - must be PENDING/DELIVERED/CANCELED";
    } else if (!items) {
      return "Invalid order - order items are missing";
    } else if (items.length < 1) {
      return "Invalid order - must be at least one item";
    } else {
      return null;
    };
  };
  exports.validateOrder = validateOrder;
