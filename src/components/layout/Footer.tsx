import { BUSINESS } from '../../data/business';
import { CONFIG } from '../../lib/config';
import type { PageId } from '../../types/pizza';
import './Footer.css';

interface Props {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: Props) {
  return (
    <footer className="pb-footer">
      <div className="pb-footer-inner">
        <div className="pb-footer-brand">
          <div className="pb-footer-logo">
            <span className="pb-footer-logo-icon" aria-hidden="true" />
            <span className="pb-footer-logo-text">{BUSINESS.name}</span>
          </div>
          <p className="pb-footer-tagline">{BUSINESS.tagline}</p>
          <div className="pb-footer-social">
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="pb-footer-social-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" className="pb-footer-social-link" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="pb-footer-col">
          <h4 className="pb-footer-col-title">Order</h4>
          <button className="pb-footer-link" onClick={() => onNavigate('menu')}>View Menu</button>
          <button className="pb-footer-link" onClick={() => onNavigate('order')}>Your Cart</button>
          <a href={CONFIG.uberEatsUrl} target="_blank" rel="noopener noreferrer" className="pb-footer-link">
            Order on Uber Eats ↗
          </a>
        </div>

        <div className="pb-footer-col">
          <h4 className="pb-footer-col-title">Info</h4>
          <button className="pb-footer-link" onClick={() => onNavigate('about')}>About Us</button>
          <button className="pb-footer-link" onClick={() => onNavigate('contact')}>Contact & Catering</button>
          <button className="pb-footer-link" onClick={() => onNavigate('account')}>My Account</button>
        </div>

        <div className="pb-footer-col">
          <h4 className="pb-footer-col-title">Hours</h4>
          {BUSINESS.hours.map(h => (
            <div key={h.days} className="pb-footer-hours-row">
              <span className="pb-footer-hours-day">{h.days}</span>
              <span className="pb-footer-hours-time">{h.hours}</span>
            </div>
          ))}
          <div className="pb-footer-contact-info">
            <a href={`tel:${BUSINESS.phone}`} className="pb-footer-phone">{BUSINESS.phone}</a>
            <span className="pb-footer-address">
              {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
            </span>
          </div>
        </div>
      </div>

      <div className="pb-footer-bottom">
        <span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span>
        <span className="pb-footer-bottom-right">Made in Pittsburgh, PA</span>
      </div>
    </footer>
  );
}
