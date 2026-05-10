// TODO: Set these in your .env file before deploying
export const CONFIG = {
  // Uber Eats ordering link — set VITE_UBER_EATS_URL in your .env
  uberEatsUrl: import.meta.env.VITE_UBER_EATS_URL as string | undefined
    ?? 'https://www.ubereats.com', // placeholder

  // Stripe public key — set VITE_STRIPE_PUBLIC_KEY in your .env
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY as string | undefined,

  // Your Stripe Checkout Session endpoint (serverless function / backend)
  // Set VITE_CHECKOUT_URL in your .env — e.g. /api/create-checkout-session
  checkoutUrl: import.meta.env.VITE_CHECKOUT_URL as string | undefined
    ?? '/api/create-checkout-session',
};
