import { X } from 'lucide-react';
import { useModalBackdropFecha } from '@/hooks/useModalBackdrop';

interface Props {
  children: React.ReactNode;
  aoFechar: () => void;
  posicao?: 'right' | 'center';
  largura?: string;
  title?: string;
  dataCy?: string;
}

export default function ModalPanel({
  children,
  aoFechar,
  posicao = 'right',
  largura,
  title,
  dataCy,
}: Props) {
  useModalBackdropFecha();

  const isRight = posicao === 'right';
  const larguraClasse =
    largura ?? (isRight ? 'w-full sm:max-w-md md:max-w-lg' : 'w-full sm:max-w-lg');

  const panelStyle = isRight
    ? 'top-0 right-0 h-full rounded-l-3xl animate-[slideInRight_280ms_cubic-bezier(0.16,1,0.3,1)]'
    : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl';

  return (
    <>
      <div
        data-cy={dataCy ? `${dataCy}-backdrop` : 'modal-backdrop'}
        className="modal-backdrop"
        onClick={aoFechar}
        role="presentation"
      />
      <div
        data-cy={dataCy ? `${dataCy}-panel` : 'modal-panel'}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Modal'}
        className={`modal-panel ${larguraClasse} ${panelStyle}`}
      >
        {(title || isRight) && (
          <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3 border-b border-dark/5">
            <h3
              data-cy={dataCy ? `${dataCy}-title` : 'modal-title'}
              className="font-display text-xl sm:text-2xl font-bold text-dark"
            >
              {title ?? 'Menu'}
            </h3>
            <button
              type="button"
              data-cy={dataCy ? `${dataCy}-close` : 'modal-close'}
              onClick={aoFechar}
              className="btn-ghost !p-2"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-dark" strokeWidth={2} />
            </button>
          </div>
        )}
        <div
          className={`${
            isRight ? 'h-[calc(100%-72px)]' : ''
          } overflow-y-auto scrollbar-slim`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
