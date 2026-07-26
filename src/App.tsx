import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modals from '@/components/Modals';
import HomePage from '@/pages/HomePage';
import CategoryPage from '@/pages/CategoryPage';
import CartPage from '@/pages/CartPage';
import LoginPage from '@/pages/LoginPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categoria/:slug" element={<CategoryPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
      <Modals />
    </div>
  );
}

export default App;
