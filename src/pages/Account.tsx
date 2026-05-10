import { useState } from 'react';
import type { CustomerAccount, PageId } from '../types/pizza';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './BusinessPages.css';

interface Props { onNavigate: (page: PageId) => void; }

const STORAGE_KEY = 'pizzaburgh-account';

const EMPTY_ACCOUNT: CustomerAccount = {
  name: '',
  email: '',
  phone: '',
  favoriteOrder: '',
  preferDelivery: true,
  savedAddress: '',
};

export default function Account({ onNavigate }: Props) {
  const [account, setAccount] = useState<CustomerAccount>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...EMPTY_ACCOUNT, ...JSON.parse(raw) } : EMPTY_ACCOUNT;
    } catch {
      return EMPTY_ACCOUNT;
    }
  });
  const [saved, setSaved] = useState(false);

  function update<K extends keyof CustomerAccount>(key: K, value: CustomerAccount[K]) {
    setAccount(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    setSaved(true);
  }

  return (
    <div className="business-page">
      <Navbar currentPage="account" onNavigate={onNavigate} />
      <main className="business-content">
        <section className="business-hero">
          <p className="eyebrow business-eyebrow">Customer Account</p>
          <h1 className="business-title">Save Your Usual</h1>
          <p className="business-lede">
            A lightweight demo account for contact info, favorite orders, and pickup or delivery preference.
          </p>
        </section>

        <section className="business-section business-account-layout">
          <form className="business-form">
            <label>
              Name
              <input value={account.name} onChange={e => update('name', e.target.value)} placeholder="Full name" />
            </label>
            <label>
              Email
              <input type="email" value={account.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
            </label>
            <label>
              Phone
              <input value={account.phone} onChange={e => update('phone', e.target.value)} placeholder="(412) 555-0000" />
            </label>
            <label>
              Favorite order
              <input value={account.favoriteOrder} onChange={e => update('favoriteOrder', e.target.value)} placeholder="Large pepperoni, tenders, fries" />
            </label>
            <label>
              Saved address
              <textarea rows={4} value={account.savedAddress} onChange={e => update('savedAddress', e.target.value)} placeholder="Delivery address placeholder" />
            </label>
            <label className="business-check">
              <input
                type="checkbox"
                checked={account.preferDelivery}
                onChange={e => update('preferDelivery', e.target.checked)}
              />
              Prefer delivery by default
            </label>
            <button type="button" className="business-primary-btn" onClick={save}>Save Demo Account</button>
            {saved && <p className="business-form-note">Saved locally in this browser.</p>}
          </form>

          <aside className="business-info-panel">
            <h2>Order History</h2>
            <p>No live order history yet.</p>
            <div className="business-placeholder-list">
              <span>Recent web orders will appear here after auth, Stripe webhooks, and a database are connected.</span>
              <span>Uber Eats order history stays inside Uber Eats.</span>
            </div>
          </aside>
        </section>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
