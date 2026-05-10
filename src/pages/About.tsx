import { BUSINESS } from '../data/business';
import type { PageId } from '../types/pizza';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './BusinessPages.css';

interface Props { onNavigate: (page: PageId) => void; }

export default function About({ onNavigate }: Props) {
  return (
    <div className="business-page">
      <Navbar currentPage="about" onNavigate={onNavigate} />
      <main className="business-content">
        <section className="business-hero">
          <p className="eyebrow business-eyebrow">Neighborhood Pizza Shop</p>
          <h1 className="business-title">About Pizza Burgh</h1>
          <p className="business-lede">
            Local comfort food, fast pickup, and delivery built around Pittsburgh appetite.
          </p>
        </section>

        <section className="business-section business-two-col">
          <div>
            <h2>Made for the Burgh</h2>
            <p>{BUSINESS.about}</p>
          </div>
          <div className="business-info-panel">
            <h3>What We Serve</h3>
            <ul className="business-list">
              <li>Fresh pizza with whole-milk mozzarella and house sauce</li>
              <li>Hot subs, wings, chicken tenders, and pasta</li>
              <li>Pepperoni rolls, sides, drinks, and party trays</li>
              <li>Delivery, pickup, and Uber Eats ordering</li>
            </ul>
          </div>
        </section>

        <section className="business-section">
          <div className="business-card-grid">
            <div className="business-card">
              <h3>Fast Pickup</h3>
              <p>Most orders are ready in 20-30 minutes, with easy pickup from the counter.</p>
            </div>
            <div className="business-card">
              <h3>Local Delivery</h3>
              <p>Delivery runs within our neighborhood radius, with Uber Eats as a second path.</p>
            </div>
            <div className="business-card">
              <h3>Party Orders</h3>
              <p>Call ahead for trays, large pizza orders, office lunches, and game-day spreads.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
