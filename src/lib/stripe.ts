import type { CartItem } from '../types/pizza';

// TODO: Install @stripe/stripe-js when ready to go live:
//   npm install @stripe/stripe-js
// Then load Stripe with your public key from CONFIG.stripePublicKey.

export interface CheckoutPayload {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
  }>;
  mode: 'delivery' | 'pickup';
  customerEmail?: string;
}

export function buildCheckoutPayload(
  cartItems: CartItem[],
  mode: 'delivery' | 'pickup',
  email?: string,
): CheckoutPayload {
  return {
    items: cartItems.map(ci => ({
      id: ci.item.id,
      name: ci.item.name,
      price: ci.selectedSize?.price ?? ci.item.price,
      quantity: ci.quantity,
      size: ci.selectedSize?.label,
    })),
    mode,
    customerEmail: email,
  };
}

// TODO: Replace this with a real Stripe Checkout redirect once the backend is set up.
// The backend endpoint should:
//   1. Validate the order
//   2. Create a Stripe Checkout Session via the Stripe server-side SDK
//   3. Return { url: session.url }
//   4. This function redirects the browser to that URL
export async function redirectToCheckout(
  payload: CheckoutPayload,
  checkoutUrl: string,
): Promise<void> {
  const res = await fetch(checkoutUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Checkout failed: ${res.status} ${res.statusText}`);
  }

  const { url } = await res.json() as { url: string };
  if (!url) throw new Error('No checkout URL returned from server');
  window.location.href = url;
}

export function calcSubtotal(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, ci) => {
    const price = ci.selectedSize?.price ?? ci.item.price;
    return sum + price * ci.quantity;
  }, 0);
}

export function calcTax(subtotal: number, rate = 0.06): number {
  return subtotal * rate;
}
