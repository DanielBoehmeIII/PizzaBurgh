import { useCallback, useEffect, useState } from 'react';
import { CartProvider } from './components/ordering/CartProvider';
import type { PageId } from './types/pizza';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';

const PAGES: PageId[] = ['home', 'menu', 'order', 'account', 'about', 'contact'];

function pageFromHash(): PageId {
  const id = window.location.hash.replace('#', '') as PageId;
  return PAGES.includes(id) ? id : 'home';
}

function AppInner() {
  const [page, setPage] = useState<PageId>(() => pageFromHash());

  const navigate = useCallback((id: PageId) => {
    setPage(id);
    window.location.hash = id === 'home' ? '' : id;
  }, []);

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const shared = { onNavigate: navigate };

  return (
    <>
      {page === 'home' && <Home {...shared} />}
      {page === 'menu' && <Menu {...shared} />}
      {page === 'order' && <Order {...shared} />}
      {page === 'account' && <Account {...shared} />}
      {page === 'about' && <About {...shared} />}
      {page === 'contact' && <Contact {...shared} />}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
