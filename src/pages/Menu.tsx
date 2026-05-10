import { useState } from 'react';
import { MENU_ITEMS, CATEGORY_LABELS } from '../data/menu';
import type { MenuCategory, PageId } from '../types/pizza';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MenuCard from '../components/pizza/MenuCard';
import './Menu.css';

interface Props { onNavigate: (page: PageId) => void; }

const CATEGORIES: MenuCategory[] = ['pizza', 'subs', 'wings', 'pepperoni-rolls', 'pasta', 'sides', 'drinks'];

export default function Menu({ onNavigate }: Props) {
  const [active, setActive] = useState<MenuCategory>('pizza');

  const filtered = MENU_ITEMS.filter(i => i.category === active);

  return (
    <div className="menu-page">
      <Navbar currentPage="menu" onNavigate={onNavigate} />

      <div className="menu-content">
        <div className="menu-hero">
          <p className="eyebrow menu-eyebrow">Fresh from the kitchen</p>
          <h1 className="menu-page-title">Our Menu</h1>
        </div>

        <div className="menu-inner">
          {/* Category tabs */}
          <nav className="menu-tabs" aria-label="Menu categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={['menu-tab', active === cat ? 'menu-tab--active' : ''].filter(Boolean).join(' ')}
                onClick={() => setActive(cat)}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </nav>

          {/* Category title */}
          <div className="menu-category-header">
            <h2 className="menu-category-title">{CATEGORY_LABELS[active]}</h2>
            <span className="menu-category-count">{filtered.length} items</span>
          </div>

          {/* Grid */}
          <div className="menu-grid">
            {filtered.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
