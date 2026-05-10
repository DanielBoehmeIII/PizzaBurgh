import { useCallback, useRef } from 'react';
import { BUSINESS } from '../data/business';
import { CONFIG } from '../lib/config';
import type { PageId } from '../types/pizza';
import PizzaCinematic from '../components/cinematic/PizzaCinematic';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FeaturedItems from '../components/pizza/FeaturedItems';
import './Home.css';

interface Props {
  onNavigate: (page: PageId) => void;
}

export default function Home({ onNavigate }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  const handleProgress = useCallback((p: number) => {
    pageRef.current?.style.setProperty('--scroll-p', String(p));
  }, []);

  return (
    <div ref={pageRef} className="home-page">
      <Navbar currentPage="home" onNavigate={onNavigate} transparent />

      <PizzaCinematic onProgress={handleProgress}>
        {/* Hero content — shown before scroll */}
        <div className="home-hero">
          <p className="eyebrow home-eyebrow animate-fade-in">Pittsburgh, PA</p>
          <h1 className="home-hero-title animate-fade-in" style={{ animationDelay: '0.06s' }}>
            {BUSINESS.name}
          </h1>
          <p className="home-hero-sub animate-fade-in" style={{ animationDelay: '0.12s' }}>
            {BUSINESS.tagline}
          </p>
          <p className="home-hero-desc animate-fade-in" style={{ animationDelay: '0.18s' }}>
            Hand-crafted pizza, subs, wings, and pepperoni rolls.<br />
            Fast delivery and pickup across Pittsburgh.
          </p>
          <div className="home-hero-ctas animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <button className="home-cta-primary" onClick={() => onNavigate('menu')}>
              Order Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href={CONFIG.uberEatsUrl} target="_blank" rel="noopener noreferrer" className="home-cta-secondary">
              Order on Uber Eats
            </a>
            <button className="home-cta-ghost" onClick={() => onNavigate('menu')}>
              View Menu
            </button>
          </div>
          <p className="home-scroll-hint animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Scroll to explore
          </p>
        </div>
      </PizzaCinematic>

      {/* Post-cinematic scroll CTA */}
      <section className="home-after-cinematic">
        <div className="home-after-inner">
          <div className="home-after-ctas">
            <button className="home-cta-primary" onClick={() => onNavigate('menu')}>
              Order Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href={CONFIG.uberEatsUrl} target="_blank" rel="noopener noreferrer" className="home-cta-secondary">
              Order on Uber Eats
            </a>
          </div>
        </div>
      </section>

      {/* Featured items */}
      <FeaturedItems onNavigate={onNavigate} />

      {/* Value props strip */}
      <section className="home-values">
        <div className="home-values-inner">
          {[
            { icon: '01', title: 'Fresh Daily', desc: 'Dough made every morning. Sauce simmered from scratch.' },
            { icon: '02', title: 'Fast Delivery', desc: 'Delivery across nearby Pittsburgh neighborhoods.' },
            { icon: '03', title: 'Quality Ingredients', desc: 'Real mozzarella, premium meats, no shortcuts.' },
            { icon: '04', title: 'Pittsburgh Proud', desc: 'Born and raised in the Steel City. Locally owned.' },
          ].map(v => (
            <div key={v.title} className="home-value-card">
              <span className="home-value-icon">{v.icon}</span>
              <h3 className="home-value-title">{v.title}</h3>
              <p className="home-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hours strip */}
      <section className="home-hours">
        <div className="home-hours-inner">
          <div className="home-hours-text">
            <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '10px' }}>We're Open</p>
            <h2 className="home-hours-title">Come Find Us</h2>
            <p className="home-hours-addr">
              {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
            </p>
            <a href={`tel:${BUSINESS.phone}`} className="home-hours-phone">{BUSINESS.phone}</a>
          </div>
          <div className="home-hours-list">
            {BUSINESS.hours.map(h => (
              <div key={h.days} className="home-hours-row">
                <span className="home-hours-day">{h.days}</span>
                <span className="home-hours-time">{h.hours}</span>
              </div>
            ))}
            <button className="home-hours-cta" onClick={() => onNavigate('contact')}>
              Order for Catering
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
