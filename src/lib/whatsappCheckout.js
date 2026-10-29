import {formatPriceAmount, getCartTotalBounds} from '@site/src/lib/pricing';

export function createWhatsAppCheckoutUrl({items, config}) {
  const countryCode = config.whatsappCountryCode.replace(/\D/g, '');
  const phoneNumber = config.whatsappNumber.replace(/\D/g, '');
  if (!countryCode || !phoneNumber) {
    throw new Error('A WhatsApp country code and phone number are required.');
  }

  const lines = items.map(
    ({product, quantity}) =>
      `• ${product.name} x ${quantity} — ${formatProductLine(product, quantity)}`,
  );
  const total = getCartTotalBounds(items);
  const totalLabel =
    total.minimum === total.maximum
      ? formatPriceAmount(total.minimum)
      : `Estimated ${formatPriceAmount(total.minimum)} – ${formatPriceAmount(total.maximum)}`;
  const message = [
    `Hello ${config.storeName}, I would like to place an order:`,
    '',
    ...lines,
    '',
    `Order total: ${totalLabel}`,
    'Please confirm availability, custom design details, final pricing, and delivery.',
  ].join('\n');

  return `https://wa.me/${countryCode}${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function formatProductLine(product, quantity) {
  const minimum = product.priceType === 'range' ? product.minPrice : product.price;
  const maximum = product.priceType === 'range' ? product.maxPrice : product.price;
  if (minimum !== maximum) {
    return `estimated ${formatPriceAmount(minimum * quantity)} – ${formatPriceAmount(maximum * quantity)}`;
  }
  return formatPriceAmount(minimum * quantity);
}
