import { FEATURED_IDS, getItemById } from '../../data/menu';
import type { PageId } from '../../types/pizza';
import MenuCard from './MenuCard';
import './FeaturedItems.css';

interface Props {
  onNavigate: (page: PageId) => void;
}

export default function FeaturedItems({ onNavigate }: Props) {
  const items = FEATURED_IDS
    .map(id => getItemById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getItemById>>[];

  return (
    <section className="featured-section">
      <div className="featured-inner">
        <div className="featured-header">
          <p className="eyebrow featured-eyebrow">Our Favorites</p>
          <h2 className="featured-title">What Pittsburgh Orders</h2>
          <p className="featured-sub">
            Handcrafted in our kitchen, delivered to your door or ready for pickup.
          </p>
        </div>

        <div className="featured-grid">
          {items.map(item => (
            <MenuCard key={item.id} item={item} compact />
          ))}
        </div>

        <div className="featured-footer">
          <button className="featured-view-all" onClick={() => onNavigate('menu')}>
            View Full Menu
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
