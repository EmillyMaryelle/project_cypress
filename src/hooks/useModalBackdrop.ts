import { useEffect } from 'react';
import { useUiStore } from '@/stores/uiStore';

export function useModalBackdropFecha() {
  const { modalAberto, fecharModal } = useUiStore();

  useEffect(() => {
    if (!modalAberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharModal();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modalAberto, fecharModal]);
}
