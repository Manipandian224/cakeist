'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, Heart, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, Star, Truck, X, CakeSlice, ShieldCheck } from 'lucide-react'

type Category = 'All' | 'Classic Flavors' | 'Premium Chocolate' | 'Fruit & Berry' | 'Indian-Inspired' | 'Special Fusion'
type Product = { id: number; name: string; price: number; category: Exclude<Category, 'All'>; image: string; tag?: string }
type CartItem = Product & { quantity: number; weight: string; totalPrice: number }

const images = {
  pink: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85',
  chocolate: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',
  berry: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85',
  cream: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85',
  rustic: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=85',
}

const productNames: [string, number, Exclude<Category, 'All'>][] = [
  ['Vanilla',450,'Classic Flavors'],['Chocolate',550,'Classic Flavors'],['Black Forest',550,'Classic Flavors'],['White Forest',570,'Classic Flavors'],['Butterscotch',500,'Classic Flavors'],['Pineapple',480,'Classic Flavors'],['Strawberry',480,'Classic Flavors'],['Coffee',480,'Classic Flavors'],['Caramel',500,'Classic Flavors'],
  ['Belgian Chocolate',650,'Premium Chocolate'],['Double Chocolate',650,'Premium Chocolate'],['Chocolate Truffle',650,'Premium Chocolate'],['Nutella Chocolate',680,'Premium Chocolate'],['Ferrero Rocher',750,'Premium Chocolate'],['Oreo Chocolate',600,'Premium Chocolate'],['KitKat Chocolate',650,'Premium Chocolate'],['Kinder Bueno',650,'Premium Chocolate'],['Chocolate Hazelnut',700,'Premium Chocolate'],['Chocolate Coffee',600,'Premium Chocolate'],['Chocolate Caramel',650,'Premium Chocolate'],
  ['Fresh Strawberry',660,'Fruit & Berry'],['Blueberry',680,'Fruit & Berry'],['Raspberry',700,'Fruit & Berry'],['Mixed Berry',650,'Fruit & Berry'],['Mango (Seasonal)',600,'Fruit & Berry'],['Pineapple',550,'Fruit & Berry'],
  ['Rasmalai',680,'Indian-Inspired'],['Gulab Jamun',650,'Indian-Inspired'],['Kesar Pista',680,'Indian-Inspired'],['Rose Milk',600,'Indian-Inspired'],['Badam Milk',600,'Indian-Inspired'],['Motichoor',600,'Indian-Inspired'],['Kulfi',650,'Indian-Inspired'],['Mango Lassi',650,'Indian-Inspired'],
  ['Chocolate + Strawberry',680,'Special Fusion'],['Chocolate + Coffee',650,'Special Fusion'],['Vanilla + Blueberry',650,'Special Fusion'],['Chocolate + Biscoff',650,'Special Fusion'],['Pistachio + Raspberry',680,'Special Fusion'],['Rose + Pistachio',680,'Special Fusion'],['Salted Caramel + Chocolate',650,'Special Fusion'],['Red Velvet + Cream Cheese',680,'Special Fusion'],
]

const categoryImages: Record<Exclude<Category, 'All'>, string> = { 'Classic Flavors': images.pink, 'Premium Chocolate': images.chocolate, 'Fruit & Berry': images.berry, 'Indian-Inspired': images.cream, 'Special Fusion': images.rustic }
const products: Product[] = productNames.map(([name, price, category], index) => ({ id: index + 1, name, price, category, image: categoryImages[category], tag: index < 5 ? 'Bestseller' : index % 7 === 0 ? 'Freshly Baked' : undefined }))
const money = (value: number) => `₹${value.toLocaleString('en-IN')}`
const whatsapp = '919025658985'

export default function Page() {
  const [category, setCategory] = useState<Category>('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [selected, setSelected] = useState<Product | null>(null)
  const [weight, setWeight] = useState('0.5 kg')
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [liked, setLiked] = useState<number[]>([])

  const filtered = useMemo(() => products.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())), [category, search])
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const priceForWeight = (base: number, value = weight) => value === '1 kg' ? base * 2 - 50 : value === '2 kg' ? base * 4 - 100 : base

  const addToCart = (product: Product, chosenWeight = weight) => {
    const totalPrice = priceForWeight(product.price, chosenWeight)
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id && item.weight === chosenWeight)
      return existing ? current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, weight: chosenWeight, totalPrice, quantity: 1 }]
    })
    setSelected(null)
    setCartOpen(true)
  }
  const orderText = cart.map((item) => `• ${item.name} (${item.weight}) x${item.quantity} — ${money(item.totalPrice * item.quantity)}`).join('\n')
  const orderUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello The Cakeist Hestia!\n\nI'd like to order:\n${orderText}\n\nTotal: ${money(subtotal)}`)}`

  return <main>
    <div className="announcement">Delivering happiness to your doorstep! <span>|</span> +91 90256 58985</div>
    <header className="site-header"><a className="brand" href="#home"><span className="brand-mark">C</span><span>CakeShop <em>Hestia</em></span></a><nav className={mobileOpen ? 'main-nav is-open' : 'main-nav'}>{['Home','Menu','Flavors','Custom Cake','Contact'].map((item) => <a key={item} href={`#${item.toLowerCase().replace(' ','-')}`} onClick={() => setMobileOpen(false)}>{item}</a>)}</nav><div className="header-actions"><label className="search-box"><Search /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cakes" aria-label="Search cakes" /></label><button className="icon-button" aria-label="Wishlist"><Heart /></button><button className="icon-button cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag />{count > 0 && <span>{count}</span>}</button><button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button></div></header>

    <section id="home" className="hero section-shell"><div className="hero-copy"><p className="eyebrow">Baked fresh in Madurai</p><h1>Delicious cakes<br /><i>for every occasion.</i></h1><p className="hero-text">Thoughtfully crafted cakes, made with the finest ingredients and a little extra love. Pick your favourite flavour or make it completely yours.</p><div className="hero-actions"><a className="primary-button" href="#menu">Shop now <ArrowRight /></a><a className="outline-button" href="#custom-cake">Custom cake</a></div><div className="hero-note"><Sparkles /> <span>100% fresh · Made to order · Delivered with care</span></div></div><div className="hero-visual"><img src={images.pink} alt="Elegant pink celebration cake" /><div className="hero-card"><span>Our signature</span><strong>Strawberry<br />Velvet</strong><b>from {money(480)}</b></div><div className="hero-badge">BAKED<br /><i>with love</i></div></div></section>

    <section className="feature-strip"><div><Truck /><p><strong>Fast delivery</strong><br />Across Madurai</p></div><div><CakeSlice /><p><strong>Best quality</strong><br />Premium ingredients</p></div><div><Sparkles /><p><strong>100% fresh</strong><br />Baked to order</p></div><div><ShieldCheck /><p><strong>Secure payments</strong><br />Safe & simple checkout</p></div></section>

    <section id="flavors" className="categories section-shell"><div className="section-heading"><div><p className="eyebrow">Find your favourite</p><h2>Shop by <i>category</i></h2></div><p>From familiar classics to flavours that surprise and delight.</p></div><div className="category-grid">{(Object.keys(categoryImages) as Exclude<Category,'All'>[]).map((item) => <button className="category-card" key={item} onClick={() => { setCategory(item); document.getElementById('menu')?.scrollIntoView({behavior:'smooth'}) }}><img src={categoryImages[item]} alt={item} /><span>{item}</span><small>Explore flavours <ArrowRight /></small></button>)}</div></section>

    <section id="menu" className="catalog section-shell"><div className="section-heading"><div><p className="eyebrow">The cake counter</p><h2>Best <i>sellers</i></h2></div><p>Every cake is available in half kg, 1 kg and 2 kg sizes.</p></div><div className="catalog-toolbar"><div className="filter-pills"><button className={category === 'All' ? 'active' : ''} onClick={() => setCategory('All')}>All cakes</button>{(Object.keys(categoryImages) as Exclude<Category,'All'>[]).map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><span>{filtered.length} flavours</span></div><div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={`${product.name} cake`} /><button className={liked.includes(product.id) ? 'heart-button liked' : 'heart-button'} onClick={() => setLiked((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} aria-label={`Wishlist ${product.name}`}><Heart /></button>{product.tag && <span className="product-tag">{product.tag}</span>}</div><div className="product-content"><div className="rating"><span><Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /></span> 5.0</div><h3>{product.name}</h3><p>Freshly baked with layers of flavour and creamy goodness.</p><div className="product-footer"><strong>{money(product.price)} <small>/ 0.5 kg</small></strong><button className="add-button" onClick={() => setSelected(product)}><Plus /> Add</button></div><button className="direct-order" onClick={() => window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello! I'd like to order ${product.name}.`)}`, '_blank')}>Order via WhatsApp <ArrowRight /></button></div></article>)}</div></section>

    <section id="custom-cake" className="custom-section"><div className="section-shell custom-grid"><div><p className="eyebrow">Your vision, our craft</p><h2>Make it<br /><i>unforgettable.</i></h2><p>Share your idea, theme, or favourite flavour. We&apos;ll turn it into a cake that feels uniquely yours.</p><div className="custom-perks"><span><Check /> Freshly made to order</span><span><Check /> Personalised designs</span><span><Check /> Easy WhatsApp ordering</span></div></div><form className="custom-form" onSubmit={(event) => { event.preventDefault(); window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello! I'd like to request a custom cake.")}`, '_blank') }}><div className="form-row"><label>Your name<input required placeholder="Your name" /></label><label>Event date<input required type="date" /></label></div><div className="form-row"><label>Flavour<select defaultValue="Chocolate"><option>Chocolate</option><option>Vanilla</option><option>Red Velvet</option><option>Rasmalai</option><option>Something else</option></select></label><label>Weight<select defaultValue="1 kg"><option>0.5 kg</option><option>1 kg</option><option>2 kg</option></select></label></div><label>Tell us about your cake<textarea rows={3} placeholder="Theme, message, colours, and little details..." /></label><button className="primary-button" type="submit">Send cake request <ArrowRight /></button></form></div></section>

    <footer id="contact"><div className="footer-main section-shell"><div><a className="brand" href="#home"><span className="brand-mark">C</span><span>CakeShop <em>Hestia</em></span></a><p>Premium cakes, made fresh in Madurai.<br />For every sweet moment.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#menu">Menu</a><a href="#flavors">Flavours</a><a href="#custom-cake">Custom cakes</a></div><div><strong>Contact</strong><a href={`https://wa.me/${whatsapp}`}>+91 90256 58985</a><a href="mailto:hello@cakeisthestia.in">hello@cakeisthestia.in</a><a href="#home">Instagram ↗</a></div></div></div><div className="footer-bottom section-shell"><span>© 2026 CakeShop Hestia</span><span>Made for sweet moments.</span></div></footer>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close product details"><X /></button><img src={selected.image} alt={selected.name} /><div className="modal-copy"><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><p>Handcrafted to order with soft sponge, luscious layers and our signature cream finish.</p><div className="weight-options"><span>Choose weight</span><div>{['0.5 kg','1 kg','2 kg'].map((item) => <button className={weight === item ? 'selected' : ''} key={item} onClick={() => setWeight(item)}>{item}<small>{money(priceForWeight(selected.price, item))}</small></button>)}</div></div><button className="primary-button full-button" onClick={() => addToCart(selected)}>Add to cart · {money(priceForWeight(selected.price))} <ShoppingBag /></button></div></div></div>}

    {cartOpen && <div className="modal-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="cart-header"><div><p className="eyebrow">Your sweet basket</p><h2>Your cart <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag /><h3>Your basket is waiting.</h3><p>Add a cake and it&apos;ll appear here.</p></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={`${item.id}-${item.weight}`}><img src={item.image} alt="" /><div><h3>{item.name}</h3><span>{item.weight} · {money(item.totalPrice)}</span><div className="quantity"><button onClick={() => setCart((current) => current.map((entry) => entry === item ? {...entry, quantity: entry.quantity - 1} : entry).filter((entry) => entry.quantity > 0))} aria-label="Decrease quantity"><Minus /></button><b>{item.quantity}</b><button onClick={() => setCart((current) => current.map((entry) => entry === item ? {...entry, quantity: entry.quantity + 1} : entry))} aria-label="Increase quantity"><Plus /></button></div></div></div>)}</div><div className="cart-total"><span>Total</span><strong>{money(subtotal)}</strong></div><a className="primary-button full-button" href={orderUrl} target="_blank" rel="noreferrer">Checkout on WhatsApp <ArrowRight /></a></>}</aside></div>}
  </main>
}
