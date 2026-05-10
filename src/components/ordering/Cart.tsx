import { useCart } from './CartContext';
import { calcSubtotal, calcTax } from '../../lib/stripe';
import './Cart.css';

interface Props {
  onCheckout: () => void;
  deliveryFee?: number;
}

export default function Cart({ onCheckout, deliveryFee = 0 }: Props) {
  const { items, removeItem, setQty } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <p className="cart-empty-title">Your cart is empty</p>
        <p className="cart-empty-sub">Add items from our menu to get started.</p>
      </div>
    );
  }

  const subtotal = calcSubtotal(items);
  const tax      = calcTax(subtotal);
  const total    = subtotal + tax + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items">
        {items.map(ci => {
          const price = ci.selectedSize?.price ?? ci.item.price;
          const key   = `${ci.item.id}::${ci.selectedSize?.label ?? ''}`;
          return (
            <div key={key} className="cart-item">
              <div className="cart-item-info">
                <p className="cart-item-name">{ci.item.name}</p>
                {ci.selectedSize && (
                  <p className="cart-item-size">{ci.selectedSize.label}</p>
                )}
                <p className="cart-item-price">${(price * ci.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-item-controls">
                <button
                  className="cart-qty-btn"
                  onClick={() => setQty(ci.item.id, ci.selectedSize?.label, ci.quantity - 1)}
                  aria-label="Decrease quantity"
                >–</button>
                <span className="cart-qty-value">{ci.quantity}</span>
                <button
                  className="cart-qty-btn"
                  onClick={() => setQty(ci.item.id, ci.selectedSize?.label, ci.quantity + 1)}
                  aria-label="Increase quantity"
                >+</button>
                <button
                  className="cart-remove-btn"
                  onClick={() => removeItem(ci.item.id, ci.selectedSize?.label)}
                  aria-label="Remove item"
                >✕</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Tax (6%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Delivery fee</span>
          <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Pickup'}</span>
        </div>
        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="cart-checkout-btn" onClick={onCheckout}>
        Proceed to Checkout
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <p className="cart-stripe-note">
        Secure payment powered by Stripe. We never store your card details.
      </p>
    </div>
  );
}
