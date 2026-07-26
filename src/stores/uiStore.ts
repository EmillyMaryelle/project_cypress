import { create } from 'zustand';
import type { ModalAberto } from '@shared/types';

interface UiState {
  modalAberto: ModalAberto;
  abrirModal: (modal: Exclude<ModalAberto, null>) => void;
  fecharModal: () => void;
  toggleModal: (modal: Exclude<ModalAberto, null>) => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  modalAberto: null,
  abrirModal: (modal) => set({ modalAberto: modal }),
  fecharModal: () => set({ modalAberto: null }),
  toggleModal: (modal) => {
    const atual = get().modalAberto;
    set({ modalAberto: atual === modal ? null : modal });
  },
}));
