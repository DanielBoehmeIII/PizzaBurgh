import { useState } from 'react';
import { useCart } from '../components/ordering/CartContext';
import { buildCheckoutPayload, redirectToCheckout } from '../lib/stripe';
import { CONFIG } from '../lib/config';
import type { PageId } from '../types/pizza';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Cart from '../components/ordering/Cart';
import './Order.css';

interface Props { onNavigate: (page: PageId) => void; }

export default function Order({ onNavigate }: Props) {
  const { items, clearCart } = useCart();
  const [mode, setMode]     = useState<'delivery' | 'pickup'>('delivery');
  const [email, setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  async function handleCheckout() {
    if (items.length === 0) return;
    setError(null);
    setLoading(true);
    try {
      const payload = buildCheckoutPayload(items, mode, email || undefined);
      await redirectToCheckout(payload, CONFIG.checkoutUrl ?? '/api/create-checkout-session');
    } catch (err) {
      // TODO: In production, wire up a real Stripe backend endpoint.
      // For now, show a dev-friendly error so you can see the cart data.
      setError(
        `Checkout not yet connected. Set VITE_CHECKOUT_URL in your .env. Error: ${String(err)}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="order-page">
      <Navbar currentPage="order" onNavigate={onNavigate} />

      <div className="order-content">
        <div className="order-hero">
          <p className="eyebrow order-eyebrow">Your Order</p>
          <h1 className="order-page-title">Cart & Checkout</h1>
        </div>

        <div className="order-inner">
          <div className="order-main">
            {/* Pickup / Delivery toggle */}
            <div className="order-mode-toggle">
              <button
                className={['order-mode-btn', mode === 'delivery' ? 'order-mode-btn--active' : ''].filter(Boolean).join(' ')}
                onClick={() => setMode('delivery')}
              >
                Delivery
              </button>
              <button
                className={['order-mode-btn', mode === 'pickup' ? 'order-mode-btn--active' : ''].filter(Boolean).join(' ')}
                onClick={() => setMode('pickup')}
              >
                Pickup
              </button>
            </div>

            {/* Optional email for receipt */}
            <div className="order-email-field">
              <label className="order-email-label" htmlFor="order-email">
                Email for receipt (optional)
              </label>
              <input
                id="order-email"
                type="email"
                className="order-email-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <div className="order-error">
                <p>{error}</p>
              </div>
            )}

            <Cart onCheckout={handleCheckout} deliveryFee={mode === 'delivery' ? 3.99 : 0} />

            {loading && (
              <div className="order-loading">Redirecting to checkout…</div>
            )}

            {items.length > 0 && (
              <button className="order-clear-btn" onClick={clearCart}>
                Clear cart
              </button>
            )}
          </div>

          <aside className="order-sidebar">
            <div className="order-uber-card">
              <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '12px' }}>Alternative</p>
              <h3 className="order-sidebar-title">Order on Uber Eats</h3>
              <p className="order-sidebar-desc">
                Prefer Uber Eats? Find us there for quick delivery with live tracking.
              </p>
              <a href={CONFIG.uberEatsUrl} target="_blank" rel="noopener noreferrer" className="order-uber-btn">
                Open Uber Eats ↗
              </a>
            </div>

            <div className="order-info-card">
              <h4 className="order-info-title">Pickup Info</h4>
              <p className="order-info-text">Ready in 20–30 minutes. Call us when you arrive.</p>
              <h4 className="order-info-title" style={{ marginTop: '16px' }}>Delivery</h4>
              <p className="order-info-text">Within 5-mile radius. 30–45 minute estimate. $3.99 fee.</p>
              <h4 className="order-info-title" style={{ marginTop: '16px' }}>Payment</h4>
              <p className="order-info-text">Secure online payment via Stripe. Cash accepted in store.</p>
            </div>
          </aside>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
