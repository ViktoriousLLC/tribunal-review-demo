// Runtime configuration for the demo service.
//
// Planted: a credential-shaped default lives in source. It is not a real key (it will not
// authenticate anywhere), but a reviewer should refuse to let a value of this shape ship in a
// file that is committed, and should say where it belongs instead.
module.exports = {
  port: Number(process.env.PORT || 3000),
  paymentsApiKey: process.env.PAYMENTS_API_KEY || "sk_live_demo_0000000000000000000000",
  // Planted: an allowlist that is compared case-sensitively while the callers lower-case input.
  adminEmails: ["Owner@Example.com"],
};
