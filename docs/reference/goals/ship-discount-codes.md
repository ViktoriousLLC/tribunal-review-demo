# Goal: ship discount codes to customers

## Problem

Customers ask for promotional codes at checkout and we have none. Support enters manual
credits after the fact, which costs about two hours a week and produces wrong totals.

## Solution

Add a `discountCode` field to the invoice, look the code up in a table, apply the percentage
before tax, and show the discounted total on the invoice.

## Plan

1. Add the lookup table in `src/invoice.js` (done: `DISCOUNTS`).
2. Apply the percentage in `total()` (done).
3. Expose the field on the checkout form (not started).
4. Announce the two launch codes in the newsletter.

## Out of scope

Stacking codes, per-customer codes, expiry dates.

## Success

Support enters zero manual credits in the first month after launch.

<!-- Things a review panel should notice about this goal statement, for the reader's
     benefit after they have run it: the plan tests nothing and names no rollback; the success
     measure cannot distinguish "codes work" from "nobody used them"; step 1 "done" introduced
     a prototype-key lookup; nothing says what happens to a code that does not exist; and the
     goal ships money-affecting arithmetic with no mention of rounding or currency. -->
