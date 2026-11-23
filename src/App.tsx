import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  Coffee,
  Facebook,
  Handshake,
  House,
  ImagePlus,
  Images,
  Instagram,
  Menu,
  MessageCircle,
  Plus,
  ShieldCheck,
  Shirt,
  Star,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ProductCardProps = {
  icon: LucideIcon;
  title: ReactNode;
  productName: string;
  accent?: boolean;
};

type GallerySlotProps = {
  id: string;
  label: string;
  tag: string;
  imageSrc?: string;
  variantClass: string;
};

const PHONE_NUMBER = '5511963317734';

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppButton({
  children,
  message,
  className = '',
  arrow = false,
}: {
  children: ReactNode;
  message: string;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a
      className={`whatsapp-button ${className}`}
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={24} strokeWidth={2.5} className="shrink-0" />
      <span>{children}</span>
      {arrow && <ArrowRight size={22} strokeWidth={2.5} className="shrink-0" />}
    </a>
  );
}

function BrandLogo({ size = 'header' }: { size?: 'header' | 'footer' }) {
  return (
    <div className={`brand brand--${size}`}>
      <img
        src="/assets/images/logo.png"
        alt="Logo Personale World"
        className="brand-logo-img"
      />
      <div className="brand-copy">
        <span>PERSONALE</span>
        <strong>WORLD</strong>
      </div>
    </div>
  );
}

function ProductCard({ icon: Icon, title, productName, accent = false }: ProductCardProps) {
  const message = `Olá! Gostaria de saber mais sobre ${productName} personalizados disponíveis na Personale World.`;
  return (
    <a
      className={`product-card ${accent ? 'product-card--accent' : ''}`}
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Solicitar informações sobre ${productName}`}
    >
      <div className="product-icon">
        <Icon size={44} strokeWidth={1.75} />
      </div>
      <span>{title}</span>
    </a>
  );
}

function GalleryCardSlot({ label, tag, imageSrc, variantClass }: GallerySlotProps) {
  return (
    <div className={`gallery-card ${variantClass}`} data-gallery-slot={label}>
      {/* Div dedicada para inserir a imagem da camisa/produto personalizado */}
      <div className="gallery-image-slot">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={label}
            className="gallery-slot-img"
            loading="lazy"
          />
        ) : (
          <div className="gallery-slot-placeholder">
            <div className="gallery-slot-badge">
              <ImagePlus size={26} strokeWidth={2} />
            </div>
            <span className="gallery-slot-tag">{tag}</span>
            <strong className="gallery-slot-title">{label}</strong>
            <small className="gallery-slot-hint">Adicione sua imagem aqui</small>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');

  const navItems = [
    { label: 'Início', href: '#inicio', icon: House },
    { label: 'Produtos', href: '#produtos', icon: Shirt },
    { label: 'Diferenciais', href: '#diferenciais', icon: Star },
    { label: 'Galeria', href: '#galeria', icon: Images },
    { label: 'Contato', href: '#contato', icon: MessageCircle },
  ];

  const gallerySlots: GallerySlotProps[] = [
    {
      id: 'slot-1',
      label: 'Estampa Anime',
      tag: 'TEMA ANIME',
      variantClass: 'gallery-card--one',
      // imageSrc: '/assets/images/sua-camisa-1.jpg',
    },
    {
      id: 'slot-2',
      label: 'Estampa Gamer',
      tag: 'TEMA GAMER',
      variantClass: 'gallery-card--two',
      // imageSrc: '/assets/images/sua-camisa-2.jpg',
    },
    {
      id: 'slot-3',
      label: 'Uniforme Esportivo',
      tag: 'UNIFORMES',
      variantClass: 'gallery-card--three',
      // imageSrc: '/assets/images/sua-camisa-3.jpg',
    },
    {
      id: 'slot-4',
      label: 'Corporativo & Eventos',
      tag: 'EMPRESAS',
      variantClass: 'gallery-card--four',
      // imageSrc: '/assets/images/sua-camisa-4.jpg',
    },
  ];

  useEffect(() => {
    const sectionIds = ['inicio', 'produtos', 'diferenciais', 'galeria', 'contato'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sectionIds[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#inicio"
            className="brand-link"
            onClick={() => handleNavClick('#inicio')}
            aria-label="Personale World - Início"
          >
            <BrandLogo size="header" />
          </a>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <nav
            className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`}
            aria-label="Navegação principal"
          >
            {navItems.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className={`nav-link ${activeSection === href ? 'nav-link--active' : ''}`}
                onClick={() => handleNavClick(href)}
              >
                <Icon size={17} strokeWidth={2.4} />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION — utiliza topo.jpg como arte de fundo com a curva integrada */}
        <section className="hero" id="inicio">
          <img
            src="/assets/images/topo.jpg"
            alt="Produtos personalizados Personale World — camisetas, caneca e boné"
            className="hero-bg-image"
          />

          <div className="container hero-inner">
            <div className="hero-copy reveal">
              <h1>
                <span>PERSONALE</span>
                <strong>WORLD</strong>
              </h1>

              <p className="hero-tagline">Sua ideia, do seu jeito!</p>
              <div className="yellow-underline yellow-underline--hero" />

              <p className="hero-description">
                Estamparia personalizada com
                <br className="desktop-only" /> qualidade, criatividade e muito estilo!
              </p>

              <WhatsAppButton
                className="hero-cta"
                message="Olá! Conheci a Personale World pelo site e gostaria de solicitar um orçamento para produtos personalizados."
                arrow
              >
                <span>
                  Solicite seu orçamento
                  <br />
                  pelo WhatsApp
                </span>
              </WhatsAppButton>
            </div>

            <div className="hero-right-overlay">
              <div className="vista-marca-badge">
                <span>Vista sua</span>
                <strong>marca!</strong>
                <div className="vista-marca-bar" />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE PRODUTOS — topo reto pois a curva vem de topo.jpg */}
        <section className="products-section" id="produtos">
          <div className="container">
            <div className="section-heading reveal">
              <span className="heading-line" />
              <h2>Nossos Produtos</h2>
              <span className="heading-line" />
            </div>

            <div className="product-grid">
              <ProductCard
                icon={Shirt}
                productName="Camisetas Personalizadas"
                title={
                  <>
                    Camisetas
                    <br />
                    Personalizadas
                  </>
                }
              />
              <ProductCard
                icon={Shirt}
                productName="Polos Personalizadas"
                title={
                  <>
                    Polos
                    <br />
                    Personalizadas
                  </>
                }
              />
              <ProductCard
                icon={Star}
                productName="Bonés Personalizados"
                title={
                  <>
                    Bonés
                    <br />
                    Personalizados
                  </>
                }
              />
              <ProductCard
                icon={Coffee}
                productName="Canecas Personalizadas"
                title={
                  <>
                    Canecas
                    <br />
                    Personalizadas
                  </>
                }
              />
              <ProductCard
                icon={Shirt}
                productName="Uniformes Corporativos"
                title={
                  <>
                    Uniformes
                    <br />
                    Corporativos
                  </>
                }
              />
              <ProductCard
                icon={Plus}
                productName="outros produtos"
                title={<>e muito mais!</>}
                accent
              />
            </div>
          </div>
        </section>

        {/* SEÇÃO DE DIFERENCIAIS E GALERIA */}
        <section className="quality-section" id="diferenciais">
          <div className="quality-splash quality-splash--top" />
          <div className="quality-splash quality-splash--bottom" />

          <div className="container quality-inner">
            <div className="quality-copy reveal">
              <h2>
                Qualidade em
                <br />
                <strong>cada detalhe!</strong>
              </h2>

              <ul className="quality-list">
                {[
                  'Alta qualidade de impressão',
                  'Cores vibrantes e duradouras',
                  'Atendimento personalizado',
                  'Entrega no prazo',
                ].map((item) => (
                  <li key={item}>
                    <span className="check-circle">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="brush-note">
                Transforme suas ideias
                <br />
                em produtos únicos!
              </div>
            </div>

            {/* GALERIA COM DIVS DEDICADAS PARA INSERIR IMAGENS DAS CAMISAS */}
            <div className="gallery-collage" id="galeria">
              {gallerySlots.map((slot, index) => (
                <GalleryCardSlot
                  key={slot.id}
                  {...slot}
                  variantClass={`${slot.variantClass} reveal ${
                    index === 1
                      ? 'reveal--delay'
                      : index >= 2
                        ? 'reveal--delay-two'
                        : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* BARRA DE BENEFÍCIOS */}
        <section className="benefits-section" id="contato">
          <div className="container benefits-inner">
            <div className="benefit-item">
              <ShieldCheck className="benefit-icon" size={40} strokeWidth={1.9} />
              <div>
                <strong>Compra Segura</strong>
                <span>Seu pedido com tranquilidade</span>
              </div>
            </div>

            <div className="benefit-divider" />

            <div className="benefit-item">
              <Zap className="benefit-icon" size={40} strokeWidth={1.9} />
              <div>
                <strong>Atendimento Rápido</strong>
                <span>Resposta ágil no WhatsApp</span>
              </div>
            </div>

            <div className="benefit-divider" />

            <div className="benefit-item">
              <Handshake className="benefit-icon" size={40} strokeWidth={1.9} />
              <div>
                <strong>Parceria de Confiança</strong>
                <span>Qualidade feita para durar</span>
              </div>
            </div>

            <WhatsAppButton
              className="benefits-cta"
              message="Olá! Gostaria de conversar com a Personale World."
              arrow
            >
              Fale Conosco Agora!
            </WhatsAppButton>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-stripes" />
        <div className="container footer-main">
          <a href="#inicio" className="footer-brand" aria-label="Personale World">
            <BrandLogo size="footer" />
          </a>

          <div className="footer-motto">
            <p>Personalização que veste sua ideia!</p>
            <div className="yellow-underline" />
          </div>

          <div className="footer-social">
            <span>Siga-nos nas redes sociais:</span>
            <div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Personale World"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Personale World"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <span>© {new Date().getFullYear()} Personale World — Todos os direitos reservados.</span>
            <span>Estamparia & Produtos Personalizados</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
