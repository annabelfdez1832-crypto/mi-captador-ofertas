import { useState } from "react";

const BRAND = {
  name: "AuraPesca",
  tagline: "Tu tienda de pesca online",
  primary: "#1a6b3c",
  primaryDark: "#0f4526",
  primaryLight: "#2d9955",
  accent: "#f5a623",
  accentDark: "#d4891a",
  bg: "#f4f8f5",
  dark: "#1a2e1f",
  text: "#2c3e32",
  textLight: "#6b7c70",
  white: "#ffffff",
  cardBg: "#ffffff",
  border: "#d0e0d6",
};

const PRODUCTS = [
  {
    id: 1,
    name: "Caña de Pesca Telescópica Pro",
    category: "Cañas",
    price: 49.99,
    originalPrice: 79.99,
    image: "https://via.placeholder.com/400x300/1a6b3c/ffffff?text=Caña+Pro",
    badge: "Oferta",
    rating: 4.8,
    reviews: 124,
    description: "Caña telescópica de fibra de carbono, 5 tramos, 4.5m de longitud.",
  },
  {
    id: 2,
    name: "Carrete Spinning Ultra",
    category: "Carretes",
    price: 34.99,
    originalPrice: 55.00,
    image: "https://via.placeholder.com/400x300/1a6b3c/ffffff?text=Carrete+Ultra",
    badge: "Nuevo",
    rating: 4.6,
    reviews: 89,
    description: "Carrete de alta precisión con 12 rodamientos. Ideal para spinning.",
  },
  {
    id: 3,
    name: "Kit de Señuelos Completo",
    category: "Señuelos",
    price: 19.99,
    originalPrice: 35.00,
    image: "https://via.placeholder.com/400x300/2d9955/ffffff?text=Kit+Señuelos",
    badge: "Oferta",
    rating: 4.9,
    reviews: 203,
    description: "Set de 20 señuelos variados: cucharillas, jigs, softbaits y más.",
  },
  {
    id: 4,
    name: "Línea Fluorocarbono 0.30mm",
    category: "Líneas",
    price: 12.99,
    originalPrice: 18.00,
    image: "https://via.placeholder.com/400x300/0f4526/ffffff?text=Línea+FC",
    badge: null,
    rating: 4.7,
    reviews: 56,
    description: "Fluorocarbono invisible bajo el agua. 150m, resistencia 12kg.",
  },
  {
    id: 5,
    name: "Silla de Pesca Plegable",
    category: "Accesorios",
    price: 29.99,
    originalPrice: 45.00,
    image: "https://via.placeholder.com/400x300/1a6b3c/ffffff?text=Silla+Pesca",
    badge: "Top Ventas",
    rating: 4.5,
    reviews: 178,
    description: "Silla ultraligera y resistente, plegable en segundos. Capacidad 120kg.",
  },
  {
    id: 6,
    name: "Anzuelos Offset Pack 50u",
    category: "Anzuelos",
    price: 7.99,
    originalPrice: 12.00,
    image: "https://via.placeholder.com/400x300/2d9955/ffffff?text=Anzuelos",
    badge: "Oferta",
    rating: 4.4,
    reviews: 312,
    description: "Pack de 50 anzuelos offset de acero inoxidable. Talla 2/0 a 6/0.",
  },
  {
    id: 7,
    name: "Chaleco de Pesca Multipocket",
    category: "Ropa",
    price: 44.99,
    originalPrice: 65.00,
    image: "https://via.placeholder.com/400x300/0f4526/ffffff?text=Chaleco",
    badge: "Nuevo",
    rating: 4.7,
    reviews: 67,
    description: "Chaleco con 12 bolsillos y tejido transpirable. Tallas S-XXL.",
  },
  {
    id: 8,
    name: "Cubo Plegable con Tapa",
    category: "Accesorios",
    price: 9.99,
    originalPrice: null,
    image: "https://via.placeholder.com/400x300/1a6b3c/ffffff?text=Cubo",
    badge: null,
    rating: 4.3,
    reviews: 45,
    description: "Cubo de eva plegable 10L con tapa hermética. Ideal para cebo vivo.",
  },
];

const CATEGORIES = ["Todos", "Cañas", "Carretes", "Señuelos", "Líneas", "Accesorios", "Anzuelos", "Ropa"];

const HERO_SLIDES = [
  {
    title: "Temporada de Pesca",
    subtitle: "¡Hasta 40% de descuento en cañas y carretes seleccionados!",
    cta: "Ver Ofertas",
    bg: "#1a6b3c",
    img: "🎣",
  },
  {
    title: "Nuevos Señuelos 2025",
    subtitle: "Descubre la colección más completa para pescar todo tipo de peces.",
    cta: "Ver Novedades",
    bg: "#0f4526",
    img: "🐟",
  },
  {
    title: "Envío Gratis",
    subtitle: "En pedidos superiores a 40€. Recíbelos en 24-48h en toda España.",
    cta: "Comprar Ahora",
    bg: "#2d9955",
    img: "📦",
  },
];

function StarRating({ rating }) {
  return (
    <span style={{ color: BRAND.accent, fontSize: "0.85rem" }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      {"☆".repeat(5 - Math.ceil(rating))}
    </span>
  );
}

function Badge({ text }) {
  const colors = {
    "Oferta": { bg: "#e53e3e", color: "#fff" },
    "Nuevo": { bg: "#3182ce", color: "#fff" },
    "Top Ventas": { bg: BRAND.accent, color: "#fff" },
  };
  const style = colors[text] || { bg: BRAND.primary, color: "#fff" };
  return (
    <span style={{
      background: style.bg,
      color: style.color,
      fontSize: "0.7rem",
      fontWeight: 700,
      padding: "2px 8px",
      borderRadius: 12,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    }}>{text}</span>
  );
}

export default function App() {
  const [page, setPage] = useState("inicio");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [heroSlide, setHeroSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const cartTotal = cart.reduce((a, i) => a + i.price * i.qty, 0);

  function showNotification(msg) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  }

  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showNotification(`¡${product.name} añadido al carrito!`);
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function updateQty(id, delta) {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const styles = {
    app: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: BRAND.bg,
      minHeight: "100vh",
      color: BRAND.text,
    },
    // HEADER
    header: {
      background: BRAND.white,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    headerTop: {
      background: BRAND.primaryDark,
      color: BRAND.white,
      fontSize: "0.78rem",
      textAlign: "center",
      padding: "6px 16px",
    },
    headerMain: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 24px",
      maxWidth: 1200,
      margin: "0 auto",
      gap: 12,
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      textDecoration: "none",
    },
    logoIcon: {
      fontSize: "1.8rem",
    },
    logoText: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: BRAND.primary,
      letterSpacing: "-0.02em",
    },
    searchBar: {
      flex: 1,
      maxWidth: 400,
      display: "flex",
      border: `2px solid ${BRAND.border}`,
      borderRadius: 24,
      overflow: "hidden",
      transition: "border-color 0.2s",
    },
    searchInput: {
      flex: 1,
      border: "none",
      outline: "none",
      padding: "8px 16px",
      fontSize: "0.9rem",
      background: BRAND.bg,
      color: BRAND.text,
    },
    searchBtn: {
      background: BRAND.primary,
      color: BRAND.white,
      border: "none",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "1rem",
    },
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    cartBtn: {
      position: "relative",
      background: BRAND.primary,
      color: BRAND.white,
      border: "none",
      borderRadius: 20,
      padding: "8px 16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontWeight: 600,
      fontSize: "0.9rem",
      transition: "background 0.2s",
    },
    cartBadge: {
      background: BRAND.accent,
      color: BRAND.white,
      borderRadius: "50%",
      width: 18,
      height: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.7rem",
      fontWeight: 800,
    },
    nav: {
      background: BRAND.primary,
      display: "flex",
      justifyContent: "center",
      gap: 0,
    },
    navItem: (active, hovered) => ({
      color: BRAND.white,
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: 600,
      background: (active || hovered) ? BRAND.primaryDark : "transparent",
      border: "none",
      transition: "background 0.2s",
      letterSpacing: "0.01em",
    }),
    // HERO
    hero: {
      background: HERO_SLIDES[heroSlide].bg,
      color: BRAND.white,
      padding: "60px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      minHeight: 280,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    heroContent: {
      maxWidth: 700,
      margin: "0 auto",
    },
    heroEmoji: {
      fontSize: "4rem",
      marginBottom: 16,
      display: "block",
    },
    heroTitle: {
      fontSize: "clamp(1.8rem, 4vw, 3rem)",
      fontWeight: 900,
      marginBottom: 12,
      lineHeight: 1.1,
    },
    heroSubtitle: {
      fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
      opacity: 0.9,
      marginBottom: 24,
      lineHeight: 1.5,
    },
    heroCta: {
      background: BRAND.accent,
      color: BRAND.white,
      border: "none",
      borderRadius: 28,
      padding: "14px 32px",
      fontSize: "1.05rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "background 0.2s, transform 0.1s",
      letterSpacing: "0.02em",
    },
    heroDots: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      marginTop: 24,
    },
    dot: (active) => ({
      width: active ? 24 : 8,
      height: 8,
      borderRadius: 4,
      background: active ? BRAND.white : "rgba(255,255,255,0.4)",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s",
      padding: 0,
    }),
    // MAIN
    main: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "32px 16px",
    },
    // SECTIONS
    sectionTitle: {
      fontSize: "1.6rem",
      fontWeight: 800,
      color: BRAND.dark,
      marginBottom: 8,
    },
    sectionSubtitle: {
      color: BRAND.textLight,
      marginBottom: 24,
      fontSize: "0.95rem",
    },
    // CATEGORIES
    categoryChips: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 24,
    },
    chip: (active, hovered) => ({
      background: active ? BRAND.primary : hovered ? BRAND.border : BRAND.white,
      color: active ? BRAND.white : BRAND.text,
      border: `2px solid ${active ? BRAND.primary : BRAND.border}`,
      borderRadius: 20,
      padding: "6px 16px",
      cursor: "pointer",
      fontSize: "0.85rem",
      fontWeight: 600,
      transition: "all 0.2s",
    }),
    // PRODUCT GRID
    productGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 20,
    },
    productCard: (hovered) => ({
      background: BRAND.white,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: hovered ? "0 8px 30px rgba(0,0,0,0.12)" : "0 2px 10px rgba(0,0,0,0.06)",
      transition: "transform 0.2s, box-shadow 0.2s",
      transform: hovered ? "translateY(-4px)" : "none",
      cursor: "pointer",
      border: `1px solid ${BRAND.border}`,
    }),
    productImg: {
      width: "100%",
      height: 180,
      objectFit: "cover",
      display: "block",
      background: BRAND.bg,
    },
    productBody: {
      padding: "14px",
    },
    productCategory: {
      fontSize: "0.72rem",
      color: BRAND.primaryLight,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 4,
    },
    productName: {
      fontSize: "0.95rem",
      fontWeight: 700,
      color: BRAND.dark,
      marginBottom: 4,
      lineHeight: 1.3,
    },
    productPriceRow: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
    },
    productPrice: {
      fontSize: "1.2rem",
      fontWeight: 800,
      color: BRAND.primary,
    },
    productOriginal: {
      fontSize: "0.85rem",
      color: BRAND.textLight,
      textDecoration: "line-through",
    },
    productDiscount: {
      fontSize: "0.75rem",
      fontWeight: 700,
      color: "#e53e3e",
      background: "#fff5f5",
      borderRadius: 6,
      padding: "1px 5px",
    },
    productRating: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: "0.8rem",
      color: BRAND.textLight,
      marginBottom: 12,
    },
    addBtn: (hovered) => ({
      width: "100%",
      background: hovered ? BRAND.primaryLight : BRAND.primary,
      color: BRAND.white,
      border: "none",
      borderRadius: 10,
      padding: "10px",
      fontWeight: 700,
      fontSize: "0.9rem",
      cursor: "pointer",
      transition: "background 0.2s",
    }),
    // BANNER
    bannerSection: {
      background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
      borderRadius: 20,
      padding: "40px 32px",
      color: BRAND.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 20,
      margin: "40px 0",
    },
    bannerTitle: {
      fontSize: "1.5rem",
      fontWeight: 800,
      marginBottom: 8,
    },
    bannerText: {
      opacity: 0.85,
      fontSize: "0.95rem",
    },
    bannerBtn: {
      background: BRAND.accent,
      color: BRAND.white,
      border: "none",
      borderRadius: 24,
      padding: "12px 28px",
      fontWeight: 700,
      fontSize: "1rem",
      cursor: "pointer",
      flexShrink: 0,
      transition: "background 0.2s",
    },
    // FEATURES
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 20,
      margin: "40px 0",
    },
    featureCard: {
      background: BRAND.white,
      borderRadius: 16,
      padding: "24px",
      textAlign: "center",
      border: `1px solid ${BRAND.border}`,
    },
    featureIcon: {
      fontSize: "2.2rem",
      marginBottom: 12,
    },
    featureTitle: {
      fontWeight: 700,
      color: BRAND.dark,
      marginBottom: 4,
      fontSize: "0.95rem",
    },
    featureText: {
      color: BRAND.textLight,
      fontSize: "0.83rem",
      lineHeight: 1.5,
    },
    // CART DRAWER
    cartOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      zIndex: 200,
    },
    cartDrawer: {
      position: "fixed",
      top: 0,
      right: 0,
      width: "min(400px, 100vw)",
      height: "100vh",
      background: BRAND.white,
      zIndex: 201,
      display: "flex",
      flexDirection: "column",
      boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
    },
    cartHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 20px",
      borderBottom: `1px solid ${BRAND.border}`,
      background: BRAND.primary,
      color: BRAND.white,
    },
    cartHeaderTitle: {
      fontWeight: 800,
      fontSize: "1.1rem",
    },
    closeBtn: {
      background: "rgba(255,255,255,0.2)",
      border: "none",
      color: BRAND.white,
      borderRadius: "50%",
      width: 32,
      height: 32,
      cursor: "pointer",
      fontSize: "1.1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    cartItems: {
      flex: 1,
      overflowY: "auto",
      padding: "16px",
    },
    cartItem: {
      display: "flex",
      gap: 12,
      padding: "12px 0",
      borderBottom: `1px solid ${BRAND.border}`,
      alignItems: "center",
    },
    cartItemImg: {
      width: 60,
      height: 60,
      objectFit: "cover",
      borderRadius: 10,
      background: BRAND.bg,
    },
    cartItemInfo: {
      flex: 1,
    },
    cartItemName: {
      fontWeight: 700,
      fontSize: "0.88rem",
      color: BRAND.dark,
      marginBottom: 4,
    },
    cartItemPrice: {
      color: BRAND.primary,
      fontWeight: 700,
      fontSize: "0.95rem",
    },
    qtyControls: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 6,
    },
    qtyBtn: {
      background: BRAND.bg,
      border: `1px solid ${BRAND.border}`,
      borderRadius: "50%",
      width: 24,
      height: 24,
      cursor: "pointer",
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: BRAND.dark,
      fontWeight: 700,
    },
    qtyNum: {
      fontWeight: 700,
      minWidth: 20,
      textAlign: "center",
      fontSize: "0.9rem",
    },
    removeBtn: {
      background: "none",
      border: "none",
      color: "#e53e3e",
      cursor: "pointer",
      fontSize: "1.1rem",
      padding: 4,
    },
    cartFooter: {
      padding: "20px",
      borderTop: `2px solid ${BRAND.border}`,
      background: BRAND.bg,
    },
    cartTotal: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 800,
      fontSize: "1.1rem",
      color: BRAND.dark,
      marginBottom: 16,
    },
    checkoutBtn: {
      width: "100%",
      background: BRAND.primary,
      color: BRAND.white,
      border: "none",
      borderRadius: 14,
      padding: "14px",
      fontWeight: 800,
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    emptyCart: {
      textAlign: "center",
      padding: "60px 20px",
      color: BRAND.textLight,
    },
    emptyCartIcon: {
      fontSize: "3rem",
      marginBottom: 12,
      display: "block",
    },
    // NOTIFICATION
    notification: {
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: BRAND.primaryDark,
      color: BRAND.white,
      padding: "12px 24px",
      borderRadius: 30,
      fontWeight: 600,
      fontSize: "0.9rem",
      zIndex: 300,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      whiteSpace: "nowrap",
      maxWidth: "90vw",
      textAlign: "center",
    },
    // PRODUCT MODAL
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    modal: {
      background: BRAND.white,
      borderRadius: 20,
      overflow: "hidden",
      width: "100%",
      maxWidth: 540,
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    },
    modalImg: {
      width: "100%",
      height: 240,
      objectFit: "cover",
    },
    modalBody: {
      padding: 24,
    },
    modalName: {
      fontSize: "1.4rem",
      fontWeight: 800,
      color: BRAND.dark,
      marginBottom: 8,
    },
    modalDesc: {
      color: BRAND.textLight,
      lineHeight: 1.6,
      marginBottom: 16,
    },
    modalPrice: {
      fontSize: "1.8rem",
      fontWeight: 900,
      color: BRAND.primary,
      marginBottom: 20,
    },
    modalActions: {
      display: "flex",
      gap: 12,
    },
    modalAddBtn: {
      flex: 1,
      background: BRAND.primary,
      color: BRAND.white,
      border: "none",
      borderRadius: 14,
      padding: "14px",
      fontWeight: 700,
      fontSize: "1rem",
      cursor: "pointer",
    },
    modalCloseBtn: {
      background: BRAND.bg,
      color: BRAND.text,
      border: `1px solid ${BRAND.border}`,
      borderRadius: 14,
      padding: "14px 20px",
      fontWeight: 600,
      cursor: "pointer",
    },
    // FOOTER
    footer: {
      background: BRAND.dark,
      color: "rgba(255,255,255,0.7)",
      padding: "40px 24px 20px",
      marginTop: 60,
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 32,
      maxWidth: 1200,
      margin: "0 auto 32px",
    },
    footerTitle: {
      color: BRAND.white,
      fontWeight: 700,
      marginBottom: 12,
      fontSize: "1rem",
    },
    footerLink: {
      display: "block",
      color: "rgba(255,255,255,0.6)",
      textDecoration: "none",
      marginBottom: 6,
      fontSize: "0.88rem",
      cursor: "pointer",
    },
    footerBottom: {
      borderTop: "1px solid rgba(255,255,255,0.1)",
      paddingTop: 20,
      textAlign: "center",
      fontSize: "0.82rem",
      color: "rgba(255,255,255,0.4)",
      maxWidth: 1200,
      margin: "0 auto",
    },
    // HAMBURGER
    hamburger: {
      background: "none",
      border: "none",
      color: BRAND.primary,
      fontSize: "1.5rem",
      cursor: "pointer",
      display: "none",
      padding: 4,
    },
  };

  const discount = (orig, price) => orig ? `-${Math.round((1 - price / orig) * 100)}%` : null;

  // === PAGES ===

  function PageInicio() {
    const [hoveredChip, setHoveredChip] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredAdd, setHoveredAdd] = useState(null);

    const featuredProducts = PRODUCTS.slice(0, 4);

    return (
      <>
        {/* HERO */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <span style={styles.heroEmoji}>{HERO_SLIDES[heroSlide].img}</span>
            <h1 style={styles.heroTitle}>{HERO_SLIDES[heroSlide].title}</h1>
            <p style={styles.heroSubtitle}>{HERO_SLIDES[heroSlide].subtitle}</p>
            <button
              style={styles.heroCta}
              onClick={() => setPage("catalogo")}
              onMouseEnter={e => e.target.style.background = BRAND.accentDark}
              onMouseLeave={e => e.target.style.background = BRAND.accent}
            >
              {HERO_SLIDES[heroSlide].cta}
            </button>
            <div style={styles.heroDots}>
              {HERO_SLIDES.map((_, i) => (
                <button key={i} style={styles.dot(i === heroSlide)} onClick={() => setHeroSlide(i)} />
              ))}
            </div>
          </div>
        </section>

        <main style={styles.main}>
          {/* FEATURES */}
          <div style={styles.featuresGrid}>
            {[
              { icon: "🚚", title: "Envío Gratis", text: "En pedidos superiores a 40€" },
              { icon: "↩️", title: "Devolución Fácil", text: "30 días para devolver tu compra" },
              { icon: "🔒", title: "Pago Seguro", text: "Encriptado SSL en todos los pagos" },
              { icon: "📞", title: "Atención 24h", text: "Soporte por chat y teléfono" },
            ].map((f, i) => (
              <div key={i} style={styles.featureCard}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <div style={styles.featureTitle}>{f.title}</div>
                <div style={styles.featureText}>{f.text}</div>
              </div>
            ))}
          </div>

          {/* CATEGORÍAS */}
          <h2 style={styles.sectionTitle}>Explora por Categoría</h2>
          <p style={styles.sectionSubtitle}>Encuentra el equipo perfecto para cada tipo de pesca</p>
          <div style={styles.categoryChips}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                style={styles.chip(cat === selectedCategory, hoveredChip === cat)}
                onClick={() => { setSelectedCategory(cat); setPage("catalogo"); }}
                onMouseEnter={() => setHoveredChip(cat)}
                onMouseLeave={() => setHoveredChip(null)}
              >{cat}</button>
            ))}
          </div>

          {/* PRODUCTOS DESTACADOS */}
          <h2 style={{ ...styles.sectionTitle, marginTop: 20 }}>Productos Destacados</h2>
          <p style={styles.sectionSubtitle}>Los más vendidos de esta temporada</p>
          <div style={styles.productGrid}>
            {featuredProducts.map(p => (
              <div
                key={p.id}
                style={styles.productCard(hoveredCard === p.id)}
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedProduct(p)}
              >
                <div style={{ position: "relative" }}>
                  <img src={p.image} alt={p.name} style={styles.productImg} />
                  {p.badge && (
                    <div style={{ position: "absolute", top: 10, left: 10 }}>
                      <Badge text={p.badge} />
                    </div>
                  )}
                </div>
                <div style={styles.productBody}>
                  <div style={styles.productCategory}>{p.category}</div>
                  <div style={styles.productName}>{p.name}</div>
                  <div style={styles.productRating}>
                    <StarRating rating={p.rating} />
                    <span>({p.reviews})</span>
                  </div>
                  <div style={styles.productPriceRow}>
                    <span style={styles.productPrice}>{p.price.toFixed(2)}€</span>
                    {p.originalPrice && (
                      <>
                        <span style={styles.productOriginal}>{p.originalPrice.toFixed(2)}€</span>
                        <span style={styles.productDiscount}>{discount(p.originalPrice, p.price)}</span>
                      </>
                    )}
                  </div>
                  <button
                    style={styles.addBtn(hoveredAdd === p.id)}
                    onMouseEnter={() => setHoveredAdd(p.id)}
                    onMouseLeave={() => setHoveredAdd(null)}
                    onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                  >
                    🛒 Añadir al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BANNER OFERTA */}
          <div style={styles.bannerSection}>
            <div>
              <div style={styles.bannerTitle}>🎣 Temporada de Pesca 2025</div>
              <div style={styles.bannerText}>Hasta 40% de descuento en equipos seleccionados. ¡Oferta por tiempo limitado!</div>
            </div>
            <button
              style={styles.bannerBtn}
              onClick={() => setPage("catalogo")}
              onMouseEnter={e => e.target.style.background = BRAND.accentDark}
              onMouseLeave={e => e.target.style.background = BRAND.accent}
            >
              Ver Todas las Ofertas
            </button>
          </div>
        </main>
      </>
    );
  }

  function PageCatalogo() {
    const [hoveredChip, setHoveredChip] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredAdd, setHoveredAdd] = useState(null);

    return (
      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>Catálogo de Productos</h2>
        <p style={styles.sectionSubtitle}>Encuentra todo lo que necesitas para pescar</p>

        {/* SEARCH + FILTERS */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
          <div style={{ ...styles.searchBar, maxWidth: 320 }}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchBtn}>🔍</button>
          </div>
          <span style={{ color: BRAND.textLight, fontSize: "0.85rem" }}>
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div style={styles.categoryChips}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              style={styles.chip(cat === selectedCategory, hoveredChip === cat)}
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={() => setHoveredChip(cat)}
              onMouseLeave={() => setHoveredChip(null)}
            >{cat}</button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: BRAND.textLight }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>Sin resultados</div>
            <div>Prueba con otra búsqueda o categoría</div>
          </div>
        ) : (
          <div style={styles.productGrid}>
            {filteredProducts.map(p => (
              <div
                key={p.id}
                style={styles.productCard(hoveredCard === p.id)}
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedProduct(p)}
              >
                <div style={{ position: "relative" }}>
                  <img src={p.image} alt={p.name} style={styles.productImg} />
                  {p.badge && (
                    <div style={{ position: "absolute", top: 10, left: 10 }}>
                      <Badge text={p.badge} />
                    </div>
                  )}
                </div>
                <div style={styles.productBody}>
                  <div style={styles.productCategory}>{p.category}</div>
                  <div style={styles.productName}>{p.name}</div>
                  <div style={styles.productRating}>
                    <StarRating rating={p.rating} />
                    <span>({p.reviews})</span>
                  </div>
                  <div style={styles.productPriceRow}>
                    <span style={styles.productPrice}>{p.price.toFixed(2)}€</span>
                    {p.originalPrice && (
                      <>
                        <span style={styles.productOriginal}>{p.originalPrice.toFixed(2)}€</span>
                        <span style={styles.productDiscount}>{discount(p.originalPrice, p.price)}</span>
                      </>
                    )}
                  </div>
                  <button
                    style={styles.addBtn(hoveredAdd === p.id)}
                    onMouseEnter={() => setHoveredAdd(p.id)}
                    onMouseLeave={() => setHoveredAdd(null)}
                    onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                  >
                    🛒 Añadir al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    );
  }

  function PageOfertas() {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredAdd, setHoveredAdd] = useState(null);
    const offerProducts = PRODUCTS.filter(p => p.originalPrice);
    return (
      <main style={styles.main}>
        <div style={{
          background: `linear-gradient(135deg, #e53e3e, #c53030)`,
          borderRadius: 20,
          padding: "32px",
          color: "#fff",
          marginBottom: 32,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>🏷️</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 8 }}>Ofertas Especiales</h2>
          <p style={{ opacity: 0.9 }}>Los mejores precios en equipos de pesca. ¡Aprovecha mientras duren!</p>
        </div>
        <div style={styles.productGrid}>
          {offerProducts.map(p => (
            <div
              key={p.id}
              style={styles.productCard(hoveredCard === p.id)}
              onMouseEnter={() => setHoveredCard(p.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedProduct(p)}
            >
              <div style={{ position: "relative" }}>
                <img src={p.image} alt={p.name} style={styles.productImg} />
                <div style={{ position: "absolute", top: 10, left: 10 }}>
                  <Badge text={p.badge || "Oferta"} />
                </div>
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: "#e53e3e", color: "#fff",
                  borderRadius: 8, padding: "4px 8px",
                  fontSize: "0.8rem", fontWeight: 800,
                }}>
                  {discount(p.originalPrice, p.price)}
                </div>
              </div>
              <div style={styles.productBody}>
                <div style={styles.productCategory}>{p.category}</div>
                <div style={styles.productName}>{p.name}</div>
                <div style={styles.productRating}>
                  <StarRating rating={p.rating} />
                  <span>({p.reviews})</span>
                </div>
                <div style={styles.productPriceRow}>
                  <span style={styles.productPrice}>{p.price.toFixed(2)}€</span>
                  <span style={styles.productOriginal}>{p.originalPrice?.toFixed(2)}€</span>
                  <span style={{ ...styles.productDiscount, background: "#fff5f5" }}>{discount(p.originalPrice, p.price)}</span>
                </div>
                <button
                  style={styles.addBtn(hoveredAdd === p.id)}
                  onMouseEnter={() => setHoveredAdd(p.id)}
                  onMouseLeave={() => setHoveredAdd(null)}
                  onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                >
                  🛒 Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  function PageContacto() {
    const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
    const [sent, setSent] = useState(false);

    function handleSubmit(e) {
      e.preventDefault();
      // TODO: Integrar con servicio de email real (EmailJS, Formspree, etc.)
      setSent(true);
    }

    return (
      <main style={{ ...styles.main, maxWidth: 700 }}>
        <h2 style={styles.sectionTitle}>Contacta con Nosotros</h2>
        <p style={styles.sectionSubtitle}>Estamos aquí para ayudarte. Escríbenos y te respondemos en menos de 24h.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { icon: "📞", label: "Teléfono", value: "+34 900 123 456" },
            { icon: "📧", label: "Email", value: "info@aurapesca.com" },
            { icon: "📍", label: "Dirección", value: "España" },
          ].map((c, i) => (
            <div key={i} style={{ ...styles.featureCard, textAlign: "left" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: BRAND.dark, marginBottom: 2 }}>{c.label}</div>
              <div style={{ color: BRAND.textLight, fontSize: "0.88rem" }}>{c.value}</div>
            </div>
          ))}
        </div>

        {sent ? (
          <div style={{
            background: BRAND.white,
            borderRadius: 16,
            padding: "48px",
            textAlign: "center",
            border: `1px solid ${BRAND.border}`,
          }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: BRAND.dark, marginBottom: 8 }}>
              ¡Mensaje Enviado!
            </h3>
            <p style={{ color: BRAND.textLight }}>Te responderemos en menos de 24 horas. ¡Gracias!</p>
            <button
              onClick={() => setSent(false)}
              style={{ ...styles.checkoutBtn, marginTop: 20, borderRadius: 12 }}
            >Enviar otro mensaje</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: BRAND.white,
            borderRadius: 16,
            padding: "28px",
            border: `1px solid ${BRAND.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}>
            {[
              { name: "nombre", label: "Nombre completo", type: "text", placeholder: "Tu nombre" },
              { name: "email", label: "Correo electrónico", type: "email", placeholder: "tu@email.com" },
              { name: "asunto", label: "Asunto", type: "text", placeholder: "¿En qué te podemos ayudar?" },
            ].map(f => (
              <div key={f.name}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: BRAND.dark, fontSize: "0.9rem" }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                  required
                  style={{
                    width: "100%", border: `1px solid ${BRAND.border}`, borderRadius: 10,
                    padding: "10px 14px", fontSize: "0.9rem", outline: "none",
                    background: BRAND.bg, color: BRAND.text, boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: BRAND.dark, fontSize: "0.9rem" }}>
                Mensaje
              </label>
              <textarea
                placeholder="Escribe tu mensaje aquí..."
                value={form.mensaje}
                onChange={e => setForm({ ...form, mensaje: e.target.value })}
                required
                rows={5}
                style={{
                  width: "100%", border: `1px solid ${BRAND.border}`, borderRadius: 10,
                  padding: "10px 14px", fontSize: "0.9rem", outline: "none",
                  background: BRAND.bg, color: BRAND.text, resize: "vertical",
                  fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
            </div>
            <button type="submit" style={styles.checkoutBtn}>
              📨 Enviar Mensaje
            </button>
          </form>
        )}
      </main>
    );
  }

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "catalogo", label: "Catálogo" },
    { id: "ofertas", label: "🏷️ Ofertas" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <div style={styles.app}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          🚚 Envío GRATIS en pedidos +40€ &nbsp;|&nbsp; 📞 +34 900 123 456 &nbsp;|&nbsp; Lunes–Viernes 9h–19h
        </div>
        <div style={styles.headerMain}>
          <div style={styles.logo} onClick={() => setPage("inicio")}>
            <span style={styles.logoIcon}>🎣</span>
            <span style={styles.logoText}>{BRAND.name}</span>
          </div>
          <div style={{ ...styles.searchBar, display: "flex" }}>
            <input
              type="text"
              placeholder="Buscar productos de pesca..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") setPage("catalogo"); }}
              style={styles.searchInput}
            />
            <button style={styles.searchBtn} onClick={() => setPage("catalogo")}>🔍</button>
          </div>
          <div style={styles.headerActions}>
            <button
              style={styles.cartBtn}
              onClick={() => setCartOpen(true)}
              onMouseEnter={e => e.currentTarget.style.background = BRAND.primaryDark}
              onMouseLeave={e => e.currentTarget.style.background = BRAND.primary}
            >
              🛒
              {cartCount > 0 && (
                <span style={styles.cartBadge}>{cartCount}</span>
              )}
              <span style={{ display: "none" }}>Carrito</span>
            </button>
          </div>
        </div>
        <nav style={styles.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              style={styles.navItem(page === item.id, hoveredNav === item.id)}
              onClick={() => setPage(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* PAGE CONTENT */}
      {page === "inicio" && <PageInicio />}
      {page === "catalogo" && <PageCatalogo />}
      {page === "ofertas" && <PageOfertas />}
      {page === "contacto" && <PageContacto />}

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: BRAND.white, marginBottom: 12 }}>
              🎣 {BRAND.name}
            </div>
            <div style={{ fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 12 }}>
              Tu tienda online especializada en material de pesca. Calidad y precio para todos los pescadores.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["📘", "📸", "▶️"].map((icon, i) => (
                <span key={i} style={{
                  background: "rgba(255,255,255,0.1)", width: 36, height: 36,
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", fontSize: "1rem",
                }}>{icon}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={styles.footerTitle}>Productos</div>
            {["Cañas", "Carretes", "Señuelos", "Líneas", "Accesorios"].map(l => (
              <span key={l} style={styles.footerLink} onClick={() => { setSelectedCategory(l); setPage("catalogo"); }}>{l}</span>
            ))}
          </div>
          <div>
            <div style={styles.footerTitle}>Información</div>
            {["Sobre nosotros", "Envíos y devoluciones", "Política de privacidad", "Términos y condiciones", "Contacto"].map(l => (
              <span key={l} style={styles.footerLink} onClick={() => setPage("contacto")}>{l}</span>
            ))}
          </div>
          <div>
            <div style={styles.footerTitle}>Newsletter</div>
            <div style={{ fontSize: "0.85rem", marginBottom: 12 }}>Suscríbete y recibe ofertas exclusivas</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="tu@email.com"
                style={{
                  flex: 1, padding: "8px 12px", borderRadius: 8, border: "none",
                  fontSize: "0.85rem", outline: "none", minWidth: 0,
                }}
              />
              <button style={{
                background: BRAND.accent, color: "#fff", border: "none",
                borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontWeight: 700,
              }}>OK</button>
            </div>
            {/* TODO: Integrar newsletter con servicio de email marketing */}
          </div>
        </div>
        <div style={styles.footerBottom}>
          © 2025 {BRAND.name}. Todos los derechos reservados. | Hecho con ❤️ para los amantes de la pesca
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <>
          <div style={styles.cartOverlay} onClick={() => setCartOpen(false)} />
          <div style={styles.cartDrawer}>
            <div style={styles.cartHeader}>
              <span style={styles.cartHeaderTitle}>🛒 Carrito ({cartCount} artículo{cartCount !== 1 ? "s" : ""})</span>
              <button style={styles.closeBtn} onClick={() => setCartOpen(false)}>✕</button>
            </div>
            <div style={styles.cartItems}>
              {cart.length === 0 ? (
                <div style={styles.emptyCart}>
                  <span style={styles.emptyCartIcon}>🛒</span>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Tu carrito está vacío</div>
                  <div style={{ fontSize: "0.88rem" }}>Añade productos para empezar a pescar</div>
                  <button
                    onClick={() => { setCartOpen(false); setPage("catalogo"); }}
                    style={{ ...styles.checkoutBtn, marginTop: 20, borderRadius: 12 }}
                  >Ver Catálogo</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <img src={item.image} alt={item.name} style={styles.cartItemImg} />
                    <div style={styles.cartItemInfo}>
                      <div style={styles.cartItemName}>{item.name}</div>
                      <div style={styles.cartItemPrice}>{item.price.toFixed(2)}€</div>
                      <div style={styles.qtyControls}>
                        <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                        <span style={styles.qtyNum}>{item.qty}</span>
                        <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                        <span style={{ marginLeft: 4, color: BRAND.textLight, fontSize: "0.8rem" }}>
                          = {(item.price * item.qty).toFixed(2)}€
                        </span>
                      </div>
                    </div>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑️</button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div style={styles.cartFooter}>
                {cartTotal < 40 && (
                  <div style={{
                    background: "#fff3cd", color: "#856404", borderRadius: 8,
                    padding: "8px 12px", fontSize: "0.82rem", marginBottom: 12,
                  }}>
                    🚚 Te faltan {(40 - cartTotal).toFixed(2)}€ para el envío gratis
                  </div>
                )}
                <div style={styles.cartTotal}>
                  <span>Total:</span>
                  <span style={{ color: BRAND.primary }}>{cartTotal.toFixed(2)}€</span>
                </div>
                <button
                  style={styles.checkoutBtn}
                  // TODO: Integrar con pasarela de pago real (Stripe, PayPal, etc.)
                  onClick={() => showNotification("🔒 Pasarela de pago próximamente")}
                  onMouseEnter={e => e.target.style.background = BRAND.primaryLight}
                  onMouseLeave={e => e.target.style.background = BRAND.primary}
                >
                  🔒 Finalizar Compra
                </button>
                <button
                  onClick={() => setCart([])}
                  style={{
                    width: "100%", background: "none", border: "none",
                    color: "#e53e3e", cursor: "pointer", marginTop: 10,
                    fontSize: "0.85rem", fontWeight: 600,
                  }}
                >Vaciar carrito</button>
              </div>
            )}
          </div>
        </>
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={{ position: "relative" }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={styles.modalImg} />
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: "absolute", top: 12, right: 12,
                  background: "rgba(0,0,0,0.5)", color: "#fff",
                  border: "none", borderRadius: "50%", width: 36, height: 36,
                  cursor: "pointer", fontSize: "1.1rem", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}
              >✕</button>
              {selectedProduct.badge && (
                <div style={{ position: "absolute", top: 12, left: 12 }}>
                  <Badge text={selectedProduct.badge} />
                </div>
              )}
            </div>
            <div style={styles.modalBody}>
              <div style={styles.productCategory}>{selectedProduct.category}</div>
              <h3 style={styles.modalName}>{selectedProduct.name}</h3>
              <div style={{ ...styles.productRating, marginBottom: 12 }}>
                <StarRating rating={selectedProduct.rating} />
                <span style={{ color: BRAND.textLight }}>({selectedProduct.reviews} reseñas)</span>
              </div>
              <p style={styles.modalDesc}>{selectedProduct.description}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={styles.modalPrice}>{selectedProduct.price.toFixed(2)}€</span>
                {selectedProduct.originalPrice && (
                  <>
                    <span style={{ ...styles.productOriginal, fontSize: "1rem" }}>
                      {selectedProduct.originalPrice.toFixed(2)}€
                    </span>
                    <span style={{ ...styles.productDiscount, fontSize: "0.85rem", padding: "3px 8px" }}>
                      {discount(selectedProduct.originalPrice, selectedProduct.price)}
                    </span>
                  </>
                )}
              </div>
              <div style={styles.modalActions}>
                <button
                  style={styles.modalAddBtn}
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                >
                  🛒 Añadir al Carrito
                </button>
                <button style={styles.modalCloseBtn} onClick={() => setSelectedProduct(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div style={styles.notification}>{notification}</div>
      )}
    </div>
  );
}