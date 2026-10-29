const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function getProductPriceBounds(product) {
  if (product.priceType === 'range') {
    return {minimum: product.minPrice, maximum: product.maxPrice};
  }

  return {minimum: product.price, maximum: product.price};
}

export function formatProductPrice(product) {
  const {minimum, maximum} = getProductPriceBounds(product);
  if (minimum !== maximum) {
    return `${currencyFormatter.format(minimum)} – ${currencyFormatter.format(maximum)}`;
  }
  return currencyFormatter.format(minimum);
}

export function formatCartLineTotal(product, quantity) {
  const {minimum, maximum} = getProductPriceBounds(product);
  if (minimum !== maximum) {
    return `${currencyFormatter.format(minimum * quantity)} – ${currencyFormatter.format(maximum * quantity)}`;
  }
  return currencyFormatter.format(minimum * quantity);
}

export function getCartTotalBounds(items) {
  return items.reduce(
    (total, {product, quantity}) => {
      const bounds = getProductPriceBounds(product);
      return {
        minimum: total.minimum + bounds.minimum * quantity,
        maximum: total.maximum + bounds.maximum * quantity,
      };
    },
    {minimum: 0, maximum: 0},
  );
}

export function formatPriceAmount(amount) {
  return currencyFormatter.format(amount);
}
