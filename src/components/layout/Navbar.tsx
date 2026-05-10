import { useCart } from '../ordering/CartContext';
import type { PageId } from '../../types/pizza';
import './Navbar.css';

interface Props {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  transparent?: boolean;
}

const NAV_LINKS: Array<{ id: PageId; label: string }> = [
  { id: 'menu',    label: 'Menu' },
  { id: 'order',   label: 'Order' },
  { id: 'about',   label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'account', label: 'Account' },
];

export default function Navbar({ currentPage, onNavigate, transparent }: Props) {
  const { totalCount } = useCart();

  return (
    <header className={['pb-nav', transparent ? 'pb-nav--transparent' : ''].filter(Boolean).join(' ')}>
      <button className="pb-nav-logo" onClick={() => onNavigate('home')}>
        <span className="pb-nav-logo-icon" aria-hidden="true" />
        <span className="pb-nav-logo-text">Pizza Burgh</span>
      </button>

      <nav className="pb-nav-links">
        {NAV_LINKS.map(link => (
          <button
            key={link.id}
            className={['pb-nav-link', currentPage === link.id ? 'pb-nav-link--active' : ''].filter(Boolean).join(' ')}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="pb-nav-actions">
        <button className="pb-nav-cart" onClick={() => onNavigate('order')} aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalCount > 0 && <span className="pb-nav-cart-badge">{totalCount}</span>}
        </button>
        <button className="pb-nav-order-btn" onClick={() => onNavigate('menu')}>
          Order Now
        </button>
      </div>
    </header>
  );
}
