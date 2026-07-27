export default function Footer() {
  return (
    <footer data-cy="footer" className="mt-20 border-t border-dark/5 bg-gradient-to-b from-primary to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div data-cy="footer-about">
          <p className="font-display text-xl font-bold text-dark mb-2">
            Bella Store
          </p>
          <p className="text-muted/80 leading-relaxed">
            Uma loja pensada para quem ama Praticidade, Conforto e Estilo.
          </p>
        </div>
        <div data-cy="footer-nav">
          <p className="font-semibold text-dark mb-3 uppercase tracking-wide text-xs">
            Navegacao
          </p>
          <ul className="space-y-2 text-muted/80">
            <li>Home</li>
            <li>Roupas</li>
            <li>Acessorios</li>
            <li>Eletronicos</li>
            <li>Casa</li>
          </ul>
        </div>
        <div data-cy="footer-contact">
          <p className="font-semibold text-dark mb-3 uppercase tracking-wide text-xs">
            Contato
          </p>
          <ul className="space-y-2 text-muted/80">
            <li>contato@exemplo.com</li>
            <li>(99) 90000-0000</li>
            <li>Totalmente Online</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
