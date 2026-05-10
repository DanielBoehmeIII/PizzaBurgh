import { useState } from 'react';
import { useCart } from '../ordering/CartContext';
import type { MenuItem } from '../../types/pizza';
import './MenuCard.css';

interface Props {
  item: MenuItem;
  compact?: boolean;
}

export default function MenuCard({ item, compact }: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]);
  const [added, setAdded] = useState(false);

  const price = selectedSize?.price ?? item.price;

  function handleAdd() {
    addItem(item, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className={['menu-card', compact ? 'menu-card--compact' : ''].filter(Boolean).join(' ')}>
      <div className="menu-card-img-slot" aria-hidden="true">
        <span className="menu-card-img-placeholder" />
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <div>
            <h3 className="menu-card-name">{item.name}</h3>
            {item.popular && <span className="menu-card-badge">Popular</span>}
          </div>
          <span className="menu-card-price">${price.toFixed(2)}</span>
        </div>

        {!compact && <p className="menu-card-desc">{item.description}</p>}

        {item.sizes && item.sizes.length > 1 && (
          <div className="menu-card-sizes">
            {item.sizes.map(sz => (
              <button
                key={sz.label}
                className={['menu-card-size-btn', selectedSize?.label === sz.label ? 'menu-card-size-btn--active' : ''].filter(Boolean).join(' ')}
                onClick={() => setSelectedSize(sz)}
              >
                {sz.label}
              </button>
            ))}
          </div>
        )}

        <button
          className={['menu-card-add', added ? 'menu-card-add--added' : ''].filter(Boolean).join(' ')}
          onClick={handleAdd}
          disabled={added}
        >
          {added ? '✓ Added' : 'Add to Order'}
        </button>
      </div>
    </div>
  );
}
