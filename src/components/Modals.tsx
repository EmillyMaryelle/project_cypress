import NavModal from './NavModal';
import CartModal from './CartModal';
import LoginModal from './LoginModal';
import CadastroModal from './CadastroModal';
import { useCategorias } from '@/hooks/useApi';

export default function Modals() {
  const { categorias } = useCategorias();
  return (
    <>
      <NavModal categorias={categorias} />
      <CartModal />
      <LoginModal />
      <CadastroModal />
    </>
  );
}
