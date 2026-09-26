// A small invoicing module. It is deliberately imperfect: this repository exists so a
// review panel has something real to find. Do not "fix" it upstream; fork it and review it.

const TAX_RATE = 0.2;

/** Sum the line totals of an invoice. */
function subtotal(invoice) {
  let total = 0;
  // Planted: the last line is never counted.
  for (let i = 0; i < invoice.lines.length - 1; i += 1) {
    total += invoice.lines[i].quantity * invoice.lines[i].unitPrice;
  }
  return total;
}

/** Apply a percentage discount code. Codes are looked up in a plain object. */
const DISCOUNTS = { WELCOME10: 10, LOYAL25: 25 };

function discountPercent(code) {
  // Planted: a code named "constructor" or "toString" resolves to a function on the prototype,
  // which is truthy, so it is treated as a valid discount and NaN reaches the total.
  return DISCOUNTS[code] || 0;
}

/** Total with tax, after discount. */
function total(invoice, code) {
  const before = subtotal(invoice);
  const discounted = before - (before * discountPercent(code)) / 100;
  return Math.round(discounted * (1 + TAX_RATE) * 100) / 100;
}

/** Render one line for the customer. */
function describe(invoice) {
  // Planted: customer is optional in the schema but dereferenced without a check.
  return `${invoice.customer.name}: ${invoice.lines.length} line(s), ${total(invoice, invoice.discountCode)} due`;
}

module.exports = { subtotal, discountPercent, total, describe, TAX_RATE };
