import { BUSINESS } from '../data/business';
import { CONFIG } from '../lib/config';
import type { PageId } from '../types/pizza';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './BusinessPages.css';

interface Props { onNavigate: (page: PageId) => void; }

export default function Contact({ onNavigate }: Props) {
  return (
    <div className="business-page">
      <Navbar currentPage="contact" onNavigate={onNavigate} />
      <main className="business-content">
        <section className="business-hero">
          <p className="eyebrow business-eyebrow">Location, Hours & Catering</p>
          <h1 className="business-title">Contact Pizza Burgh</h1>
          <p className="business-lede">
            Stop in, call ahead, order online, or ask about catering and party orders.
          </p>
          <div className="business-actions">
            <button onClick={() => onNavigate('menu')} className="business-primary-btn">View Menu</button>
            <a href={CONFIG.uberEatsUrl} target="_blank" rel="noopener noreferrer" className="business-secondary-btn">
              Order on Uber Eats
            </a>
          </div>
        </section>

        <section className="business-section business-two-col">
          <div className="business-info-panel">
            <h2>Location</h2>
            <p>
              {BUSINESS.address.street}<br />
              {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
            </p>
            <p>
              <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a><br />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </p>
          </div>

          <div className="business-info-panel">
            <h2>Hours</h2>
            <div className="business-hours">
              {BUSINESS.hours.map(h => (
                <div key={h.days} className="business-hours-row">
                  <span>{h.days}</span>
                  <strong>{h.hours}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="business-section business-two-col">
          <div>
            <h2>Catering & Party Orders</h2>
            <p>
              Planning an office lunch, birthday, tailgate, or watch party? Send the basics and
              we will help size pizzas, trays, rolls, wings, drinks, and sides for the group.
            </p>
          </div>
          <form className="business-form">
            <label>
              Name
              <input placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Party details
              <textarea rows={5} placeholder="Date, guest count, pickup or delivery, and food requests" />
            </label>
            <button type="button" className="business-primary-btn">Send Catering Request</button>
            <p className="business-form-note">Demo form only. Wire this to email or a CRM before launch.</p>
          </form>
        </section>

        <section className="business-section">
          <h2>FAQ</h2>
          <div className="business-faq-grid">
            {BUSINESS.faqs.map(faq => (
              <article key={faq.q} className="business-card">
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
