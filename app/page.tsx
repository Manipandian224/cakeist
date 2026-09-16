'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Upload,
  X,
} from 'lucide-react'

type Category = 'All' | 'Cakes' | 'Brownies' | 'Cookies' | 'Savories'
type Product = { id: number; name: string; description: string; price: number; category: Exclude<Category, 'All'>; rating: number; tag?: string; image: string }
type CartItem = Product & { quantity: number }

const products: Product[] = [
  { id: 1, name: 'Butter Almond Cookies', description: 'Melt-in-the-mouth cookies, topped with roasted almonds.', price: 280, category: 'Cookies', rating: 5, tag: 'Freshly Baked', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Quad-Flavor Brownie Box', description: 'Fudgy brownies with four irresistible chocolate toppings.', price: 450, category: 'Brownies', rating: 5, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Fresh Mango Dessert Tub', description: 'Layers of soft sponge, mango glaze and clouds of cream.', price: 220, category: 'Cakes', rating: 4.9, tag: 'Seasonal', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Classic Chocolate Chip Cookies', description: 'Golden, crisp-edged cookies studded with chocolate chips.', price: 250, category: 'Cookies', rating: 5, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Signature Sliced Butter Cake', description: 'An airy tea cake with a tender crumb and buttery finish.', price: 320, category: 'Cakes', rating: 4.8, tag: 'Signature', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Indulgent Chocolate Tub Cake', description: 'Rich chocolate sponge, silky ganache and pure comfort.', price: 260, category: 'Cakes', rating: 5, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Cheesy Mushroom Pizza', description: 'Personal artisan pizza with mushrooms and melted cheese.', price: 290, category: 'Savories', rating: 4.9, tag: 'Savory Pick', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85' },
]

const whatsapp = '919025658985'
const money = (value: number) => `₹${value.toLocaleString('en-IN')}`

export default function Page() {
  const [category, setCategory] = useState<Category>('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [delivery, setDelivery] = useState<'Pickup' | 'Delivery'>('Pickup')
  const [slide, setSlide] = useState(0)

  const filtered = products.filter((product) => (category === 'All' || product.category === category) && product.name.toLowerCase().includes(search.toLowerCase()))
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = (product: Product) => {
    setCart((current) => current.some((item) => item.id === product.id) ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }])
    setCartOpen(true)
  }
  const updateQuantity = (id: number, delta: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0))
  const orderUrl = useMemo(() => {
    const lines = cart.map((item) => `• ${item.name} x${item.quantity} — ${money(item.price * item.quantity)}`).join('%0A')
    return `https://wa.me/${whatsapp}?text=Hello%20The%20Cakeist%20Hestia!%0A%0AI'd%20like%20to%20order:%0A${lines}%0A%0ASubtotal:%20${money(subtotal)}%0AOption:%20${delivery}`
  }, [cart, subtotal, delivery])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="announcement">Freshly baked with love in Madurai <span>·</span> Order 24 hours ahead for custom cakes</div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="The Cakeist Hestia home"><span className="brand-mark">H</span><span>The Cakeist <em>Hestia</em></span></a>
        <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`}>
          {['Home', 'Menu', 'Story', 'Order Custom Cake', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMobileOpen(false)}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <label className="search-box"><Search size={16} /><input aria-label="Search menu" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bakes..." /></label>
          <button className="icon-button cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${count} items`}><ShoppingBag size={19} />{count > 0 && <span>{count}</span>}</button>
          <a className="whatsapp-button desktop-whatsapp" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">Order via WhatsApp <ArrowRight size={16} /></a>
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      <section id="home" className="hero section-shell">
        <div className="hero-copy"><p className="eyebrow">A little sweetness from our home to yours</p><h1>Handmade bakes,<br /><i>made with heart.</i></h1><p className="hero-text">Crafting fresh, homemade cakes & desserts with love in Madurai. Small-batch treats for your everyday celebrations.</p><div className="hero-actions"><a className="primary-button" href="#menu">Order Fresh Bakes <ArrowRight size={17} /></a><a className="text-link" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp <span>↗</span></a></div><div className="hero-note"><div className="mini-avatars"><span>♡</span><span>★</span><span>+</span></div><p><strong>Loved by 100+ dessert people</strong><br /><span>in and around Madurai</span></p></div></div>
        <div className="hero-visual"><div className="hero-image" style={{ backgroundImage: `url(${products[slide].image})` }}><div className="image-label"><span>01 / 03</span><strong>Made fresh,<br />just for you.</strong></div></div><button className="slider-button prev" onClick={() => setSlide((slide + 2) % 3)} aria-label="Previous hero image"><ChevronLeft size={18} /></button><button className="slider-button next" onClick={() => setSlide((slide + 1) % 3)} aria-label="Next hero image"><ChevronRight size={18} /></button><div className="hero-stamp"><span>BAKED</span><strong>with<br />love</strong><span>✦</span></div></div>
      </section>

      <section className="feature-strip"><div><span className="feature-icon">✦</span><p><strong>100% Homemade</strong><br />Made from our kitchen</p></div><div><span className="feature-icon">◒</span><p><strong>Freshly Baked</strong><br />Small batches, always</p></div><div><span className="feature-icon">♡</span><p><strong>Made with Love</strong><br />For your special moments</p></div><div><span className="feature-icon">⌁</span><p><strong>Madurai Delivery</strong><br />Pickup or local delivery</p></div></section>

      <section id="menu" className="catalog section-shell"><div className="section-heading"><div><p className="eyebrow">The good stuff</p><h2>Something sweet<br /><i>for every mood.</i></h2></div><p className="section-intro">From our oven to your table — explore our little collection of homemade favourites.</p></div><div className="catalog-toolbar"><div className="filter-pills">{(['All', 'Cakes', 'Brownies', 'Cookies', 'Savories'] as Category[]).map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><span className="result-count">{filtered.length} treats</span></div><div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>{product.tag && <span className="product-tag">{product.tag}</span>}<button className="heart-button" aria-label={`Save ${product.name}`}><Heart size={17} /></button></div><div className="product-content"><div className="rating"><span>{'★'.repeat(Math.floor(product.rating))}</span> {product.rating}</div><h3>{product.name}</h3><p>{product.description}</p><div className="product-footer"><strong>{money(product.price)}</strong><button className="add-button" onClick={() => addToCart(product)}><Plus size={15} /> Add</button></div><button className="direct-order" onClick={() => window.open(`https://wa.me/${whatsapp}?text=Hello!%20I'd%20like%20to%20order%20${encodeURIComponent(product.name)}`, '_blank')}>Direct order via WhatsApp <span>↗</span></button></div></article>)}</div></section>

      <section id="story" className="story section-shell"><div className="story-image"><div className="story-photo" /><span className="story-caption">From Sasmitha's kitchen<br /><i>Madurai, Tamil Nadu</i></span></div><div className="story-copy"><p className="eyebrow">The heart behind the bakes</p><h2>Hi, I&apos;m <i>Sasmitha.</i></h2><p className="large-copy">An engineering student by day, a passionate home baker by heart.</p><p>What started as a love for making cakes for family slowly became The Cakeist Hestia — a tiny home bakery built on the belief that the best desserts are made slowly, thoughtfully, and with a whole lot of love.</p><p>Every order is baked fresh in small batches, so you get that just-out-of-the-oven feeling in every bite.</p><a className="text-link" href="#contact">Get to know my story <span>↗</span></a></div></section>

      <section id="order-custom-cake" className="custom-section"><div className="section-shell custom-grid"><div><p className="eyebrow">Make it yours</p><h2>A cake as <i>special</i><br />as the moment.</h2><p>Tell us a little about your celebration and we&apos;ll get back to you with something deliciously personal.</p><div className="custom-perks"><span><Check size={15} /> Freshly made to order</span><span><Check size={15} /> Designs made with care</span><span><Check size={15} /> Friendly Madurai delivery</span></div></div><form className="custom-form" onSubmit={(e) => { e.preventDefault(); window.open(`https://wa.me/${whatsapp}?text=Hello!%20I'd%20like%20a%20custom%20cake.`, '_blank') }}><div className="form-row"><label>Event date<input type="date" required /></label><label>Flavour preference<select defaultValue="Chocolate"><option>Chocolate</option><option>Vanilla</option><option>Red velvet</option><option>Mango</option><option>Something else</option></select></label></div><div className="form-row"><label>Weight / size<select defaultValue="1 kg"><option>0.5 kg</option><option>1 kg</option><option>1.5 kg</option><option>2 kg+</option></select></label><label>Your name<input placeholder="Your name" required /></label></div><label>Tell us about your cake<textarea placeholder="Theme, message, colours, and any little details..." rows={3} /></label><label className="upload-field"><Upload size={17} /> <span>Upload a reference image <small>(optional)</small></span><input type="file" accept="image/*" /></label><button className="primary-button" type="submit">Send cake request <ArrowRight size={17} /></button></form></div></section>

      <section id="contact" className="contact-section section-shell"><div><p className="eyebrow">Come say hello</p><h2>Let&apos;s make<br /><i>something lovely.</i></h2></div><div className="contact-details"><div><MapPin size={18} /><p><strong>Find us in Madurai</strong><br />Home bakery · Local delivery available</p></div><div><Clock3 size={18} /><p><strong>Taking orders</strong><br />Mon – Sat · 10:00 AM – 7:00 PM</p></div><a className="primary-button" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">WhatsApp us <ArrowRight size={17} /></a></div></section>

      <footer><div className="footer-main section-shell"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark">H</span><span>The Cakeist <em>Hestia</em></span></a><p>Homemade bakes, made with heart<br />in Madurai, Tamil Nadu.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#order-custom-cake">Custom cakes</a></div><div><strong>Say hello</strong><a href={`https://wa.me/${whatsapp}`}>+91 90256 58985</a><a href="mailto:hello@thecakeisthestia.in">hello@thecakeisthestia.in</a><div className="socials"><a href="#contact" aria-label="Instagram">ig</a><a href="#contact" aria-label="Facebook">fb</a><a href="#contact" aria-label="YouTube">yt</a></div></div></div></div><div className="footer-bottom section-shell"><span>© 2025 The Cakeist Hestia. Baked with love.</span><span>Made for sweet moments.</span></div></footer>

      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="cart-header"><div><p className="eyebrow">Your little basket</p><h2>Your cart <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={36} /><h3>Your basket is waiting.</h3><p>Add a few fresh bakes and they&apos;ll appear here.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore the menu</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div className="cart-thumb" style={{ backgroundImage: `url(${item.image})` }} /><div className="cart-item-info"><h3>{item.name}</h3><strong>{money(item.price * item.quantity)}</strong><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div><button className="remove-button" onClick={() => updateQuantity(item.id, -item.quantity)} aria-label={`Remove ${item.name}`}><Trash2 size={15} /></button></div>)}</div><div className="delivery-options"><p>How would you like it?</p><div><button className={delivery === 'Pickup' ? 'selected' : ''} onClick={() => setDelivery('Pickup')}>Madurai Pickup <small>Free</small></button><button className={delivery === 'Delivery' ? 'selected' : ''} onClick={() => setDelivery('Delivery')}>Local Delivery <small>On request</small></button></div></div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Final delivery charges will be confirmed on WhatsApp.</p><a className="primary-button full-button" href={orderUrl} target="_blank" rel="noreferrer">Order on WhatsApp <ArrowRight size={17} /></a></div></>}</aside></div>}
    </main>
  )
}
