// import { useState } from "react";


// function App() {
//   const [editStudent, setEditStudent] = useState();
//   const [students, setStudents] = useState([
//     { name: "atif", id: "01" },
//     { name: "awais", id: "02" },
//   ]);

//   const changeName = (e) => {
//     setEditStudent({ ...editStudent, name: e.target.value });
//   };

// const updateStudent= () => {
//   const allStudents = students.map((s) => { return s.id === editStudent.id ? editStudent : s })
//   setStudents(allStudents)
//   setEditStudent()
 
  
// }

//   return (
//     <div>
//       {editStudent !== undefined ? (
//         <div>
//          {editStudent.id} <input type="text" onChange={changeName} value={editStudent.name} />
//          <button onClick={updateStudent}>update</button>
//         </div>
//       ) : null}
//       {students.map((s) => {
//         return (
//           <div>
//             <h1>
//               {s.name} , {s.id}
//             </h1>
//             <button onClick={() => setEditStudent(s)}>edit</button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// export default App;

// import StudentCard from "./components/studentCard";
// function App() {
//     return <StudentCard/>;

    
// }
// export default App;

//     import React from "react";
//     import Test from "./Components/Test";

// function App() {
//   return (
//     <div>
//         <Test/>
//     </div>
//   );
    
// }

// export defaulf App;


                


// import React from "react";
// import { createRoot } from "react-dom/client";
// import Gym from "./Components/Gym";
// import "./App.css";

// function App() {
//   return <Gym />;
// }

// export default App;




// import React from "react";
// import Snooker from "./Components/Snooker";
// import "./App.css";

// function App() {
//   return <Snooker />;
// }

// export default App;





import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  products as initialProducts,
  categories as initialCategories,
  campaigns,
  lookbook,
  formatPrice
} from "./cloth.jsx";
import "./App.css";

const WHATSAPP_NUMBER = "923207080695";

const KEYS = {
  products: "kpro_products_v1",
  cart: "kpro_cart_v1",
  orders: "kpro_orders_v1",
  wishlist: "kpro_wishlist_v1",
  reviews: "kpro_reviews_v1",
  coupons: "kpro_coupons_v1",
  returns: "kpro_returns_v1"
};

const SIZES = ["S", "M", "L", "XL", "XXL"];

const readStore = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const saveStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("KPRO storage error:", error);
  }
};

const normalizeProduct = (product) => {
  const colors = Array.isArray(product.colors)
    ? product.colors.filter((item) => typeof item === "string" && item.trim())
    : [typeof product.color === "string" ? product.color : "Black"];

  const sizes = Array.isArray(product.sizes) && product.sizes.length
    ? product.sizes
    : SIZES;

  const stock = {};
  sizes.forEach((size) => {
    stock[size] = Math.max(0, Number(product.stock?.[size] ?? 5) || 0);
  });

  return {
    ...product,
    id: product.id ?? `product-${Date.now()}`,
    name: String(product.name || "KPRO Product"),
    category: String(product.category || "Gents"),
    price: Math.max(0, Number(product.price) || 0),
    oldPrice: Math.max(0, Number(product.oldPrice) || Number(product.price) || 0),
    image: String(product.image || ""),
    front: String(product.front || product.image || ""),
    description: String(product.description || "Premium KPRO fashion collection."),
    colors: colors.length ? colors : ["Black"],
    color: colors[0] || "Black",
    sizes,
    stock,
    tag: String(product.tag || "KPRO EDIT"),
    material: String(product.material || "Premium fabric"),
    fit: String(product.fit || "Regular fit"),
    washing: String(product.washing || "Wash according to garment care label"),
    gallery: Array.isArray(product.gallery) ? product.gallery : [],
    isNew: Boolean(product.isNew || product.tag === "NEW")
  };
};

const categoryNames = initialCategories
  .map((item) => typeof item === "string" ? item : item?.name)
  .filter(Boolean);

const CATEGORIES = ["All", ...new Set(categoryNames)];
const initialProductsReady = initialProducts.map(normalizeProduct);

const defaultCoupons = [
  {
    id: "WELCOME10",
    code: "WELCOME10",
    type: "percent",
    value: 10,
    active: true,
    expiry: ""
  }
];

function Image({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <img
      className={className}
      src={failed || !src
        ? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
        : src}
      alt={alt || "KPRO fashion"}
      loading="lazy"
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ProductCard({ product, onOpen, onWish, wished, rating }) {
  const stock = Object.values(product.stock || {}).reduce(
    (sum, value) => sum + Number(value || 0),
    0
  );

  return (
    <article className="product-card">
      <div className="product-image-wrap" onClick={() => onOpen(product)}>
        <Image src={product.image} alt={product.name} />
        <span className="product-tag">{product.tag}</span>

        <button
          className={`wish-button ${wished ? "active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            onWish(product.id);
          }}
          aria-label="Add to wishlist"
        >
          {wished ? "♥" : "♡"}
        </button>

        <button
          className="quick-view"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(product);
          }}
        >
          VIEW DETAILS ↗
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 onClick={() => onOpen(product)}>{product.name}</h3>

        <div className="price-line">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice > product.price && (
            <del>{formatPrice(product.oldPrice)}</del>
          )}
        </div>

        <div className="product-rating">
          <span>★★★★★</span>
          <small>{rating ? `${rating.toFixed(1)} / 5` : "New"}</small>
        </div>

        <span className={`stock-note ${stock === 0 ? "out" : ""}`}>
          {stock === 0 ? "Out of stock" : `${stock} available`}
        </span>

        <button className="card-details-button" onClick={() => onOpen(product)}>
          VIEW DETAILS ↗
        </button>
      </div>
    </article>
  );
}

/* MANUAL ROPE HANGER — HAND DRAG ONLY, NO ARROWS OR AUTO SLIDE */

function RopeCollection({ title, subtitle, items, onOpen, onWish, wishlist }) {
  const trackRef = useRef(null);
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0
  });

  const pointerDown = (event) => {
    if (!trackRef.current || event.button !== 0) return;

    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: trackRef.current.scrollLeft
    };

    trackRef.current.setPointerCapture(event.pointerId);
    trackRef.current.classList.add("dragging");
  };

  const pointerMove = (event) => {
    if (!drag.current.active || !trackRef.current) return;

    const distance = event.clientX - drag.current.startX;
    if (Math.abs(distance) > 5) drag.current.moved = true;

    if (drag.current.moved) {
      trackRef.current.scrollLeft = drag.current.scrollLeft - distance;
    }
  };

  const pointerUp = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove("dragging");
  };

  const openProduct = (event, product) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
      return;
    }
    onOpen(product);
  };

  return (
    <section className="rope-section">
      <div className="rope-heading">
        <div>
          <span className="eyebrow">THE KPRO HANGER EDIT</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      <div
        className="hanger-track"
        ref={trackRef}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
        onLostPointerCapture={pointerUp}
      >
        <div className="hanger-track-inner">
          <div className="rope-line"><span /></div>

          {items.map((product) => (
            <div className="hanger-item" key={product.id}>
              <div className="hanger-hook" />

              <button
                className="hanger-card"
                onClick={(event) => openProduct(event, product)}
                draggable="false"
              >
                <Image src={product.image} alt={product.name} />
                <span className="hanger-name">{product.name}</span>
                <strong>{formatPrice(product.price)}</strong>
                <span className="hanger-view">VIEW PIECE ↗</span>
              </button>

              <button
                className={`hanger-heart ${wishlist.includes(product.id) ? "active" : ""}`}
                onClick={(event) => {
                  if (drag.current.moved) {
                    event.preventDefault();
                    event.stopPropagation();
                    drag.current.moved = false;
                    return;
                  }
                  onWish(product.id);
                }}
              >
                {wishlist.includes(product.id) ? "♥" : "♡"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="drag-hint">DRAG LEFT OR RIGHT TO EXPLORE</p>
    </section>
  );
}

function SizeGuide({ onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="size-guide-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <span className="eyebrow">KPRO FIT GUIDE</span>
        <h2>SIZE GUIDE</h2>
        <p>Measurements are approximate. For the best fit, compare with a garment you already own.</p>

        <div className="admin-table-wrap">
          <table className="admin-table size-guide-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (in)</th>
                <th>Length (in)</th>
                <th>Shoulder (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>S</td><td>36–38</td><td>26</td><td>16</td></tr>
              <tr><td>M</td><td>38–40</td><td>27</td><td>17</td></tr>
              <tr><td>L</td><td>40–42</td><td>28</td><td>18</td></tr>
              <tr><td>XL</td><td>42–44</td><td>29</td><td>19</td></tr>
              <tr><td>XXL</td><td>44–46</td><td>30</td><td>20</td></tr>
            </tbody>
          </table>
        </div>

        <p className="size-guide-note">
          These are general guide measurements. Product fit can vary by style and fabric.
        </p>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAdd, onBuy, reviews, onReview, rating }) {
  const [size, setSize] = useState(product.sizes?.[0] || "M");
  const [color, setColor] = useState(product.colors?.[0] || "Black");
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(5);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const gallery = [product.image, ...(product.gallery || [])].filter(Boolean);
  const stock = Number(product.stock?.[size] || 0);

  const productReviews = reviews.filter(
    (review) =>
      String(review.productId) === String(product.id) &&
      review.status === "approved"
  );

  useEffect(() => {
    setSize(product.sizes?.[0] || "M");
    setColor(product.colors?.[0] || "Black");
    setQuantity(1);
    setGalleryIndex(0);
  }, [product.id]);

  const submitReview = (event) => {
    event.preventDefault();
    if (!reviewText.trim()) return;

    onReview({
      id: `review-${Date.now()}`,
      productId: product.id,
      stars: reviewStars,
      text: reviewText.trim(),
      status: "pending",
      createdAt: new Date().toISOString()
    });

    setReviewText("");
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="product-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-image">
          <Image src={gallery[galleryIndex]} alt={product.name} />

          {gallery.length > 1 && (
            <div className="product-gallery-thumbs">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={galleryIndex === index ? "active" : ""}
                  onClick={() => setGalleryIndex(index)}
                >
                  <Image src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-details">
          <span className="eyebrow">{product.category} / KPRO COLLECTION</span>
          <h2>{product.name}</h2>

          <div className="modal-price">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice > product.price && <del>{formatPrice(product.oldPrice)}</del>}
          </div>

          <div className="product-modal-rating">
            <span>★★★★★</span>
            <small>{rating ? `${rating.toFixed(1)} / 5` : "No approved reviews yet"}</small>
          </div>

          <p>{product.description}</p>

          <div className="product-extra-details">
            <p><strong>Fabric:</strong> {product.material}</p>
            <p><strong>Fit:</strong> {product.fit}</p>
            <p><strong>Care:</strong> {product.washing}</p>
          </div>

          <div className="size-label-row">
            <label>SELECT SIZE</label>
            <button type="button" onClick={() => setShowSizeGuide(true)}>SIZE GUIDE ↗</button>
          </div>

          <div className="size-options">
            {product.sizes.map((item) => (
              <button
                key={item}
                className={size === item ? "selected" : ""}
                onClick={() => {
                  setSize(item);
                  setQuantity(1);
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <label>SELECT COLOUR — {color}</label>
          <div className="color-options">
            {product.colors.map((item) => (
              <button
                key={item}
                className={`color-dot color-${item.toLowerCase().replace(/[^a-z0-9]/g, "")} ${color === item ? "selected" : ""}`}
                title={item}
                onClick={() => setColor(item)}
              />
            ))}
          </div>

          <div className="modal-stock">
            {stock > 0 ? `${stock} available in size ${size}` : `Size ${size} is out of stock`}
          </div>

          <div className="quantity-row">
            <span>QUANTITY</span>
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <strong>{quantity}</strong>
              <button
                disabled={quantity >= stock}
                onClick={() => setQuantity(Math.min(stock, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-modal-actions">
            <button
              className="primary-button full-button"
              disabled={stock <= 0 || quantity > stock}
              onClick={() => onAdd(product, size, color, quantity)}
            >
              {stock <= 0 ? "OUT OF STOCK" : "ADD TO CART"}
            </button>

            <button
              className="primary-button full-button buy-now-button"
              disabled={stock <= 0 || quantity > stock}
              onClick={() => onBuy(product, size, color, quantity)}
            >
              BUY NOW ↗
            </button>
          </div>

          <div className="review-area">
            <h3>Customer Reviews</h3>

            {productReviews.length ? productReviews.map((review) => (
              <div className="review-item" key={review.id}>
                <span>{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</span>
                <p>{review.text}</p>
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
              </div>
            )) : <p>No approved reviews yet. Be the first to review.</p>}

            <form onSubmit={submitReview}>
              <label>Your rating</label>
              <select
                value={reviewStars}
                onChange={(event) => setReviewStars(Number(event.target.value))}
              >
                {[5, 4, 3, 2, 1].map((number) => (
                  <option key={number} value={number}>{number} stars</option>
                ))}
              </select>

              <textarea
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Write your review..."
                required
              />

              <button className="primary-button" type="submit">SUBMIT FOR APPROVAL</button>
            </form>
          </div>
        </div>
      </div>

      {showSizeGuide && <SizeGuide onClose={() => setShowSizeGuide(false)} />}
    </div>
  );
}

function CartDrawer({ cart, onClose, onChangeQty, onRemove, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-heading">
          <div>
            <span className="eyebrow">KPRO CHECKOUT</span>
            <h2>Your Shopping Bag</h2>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <span>♡</span>
            <p>Your bag is waiting for something beautiful.</p>
            <button className="primary-button" onClick={onClose}>CONTINUE SHOPPING</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={`${item.id}-${item.size}-${item.color}`}>
                  <Image src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span>Size: {item.size} · {item.color}</span>
                    <strong>{formatPrice(item.price)}</strong>

                    <div className="cart-qty">
                      <button onClick={() => onChangeQty(item, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => onChangeQty(item, 1)}>+</button>
                      <button className="remove-item" onClick={() => onRemove(item)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Delivery</span><span>Calculated at checkout</span></div>
              <div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
              <button className="primary-button full-button" onClick={onCheckout}>CHECKOUT</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function CheckoutModal({ cart, coupons, onClose, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dubai",
    payment: "COD"
  });
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;

    const amount = appliedCoupon.type === "percent"
      ? subtotal * Number(appliedCoupon.value) / 100
      : Number(appliedCoupon.value);

    return Math.min(subtotal, Math.max(0, amount));
  }, [appliedCoupon, subtotal]);

  const total = Math.max(0, subtotal - discount);

  const update = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    const coupon = coupons.find((item) =>
      item.active &&
      String(item.code).toUpperCase() === code &&
      (!item.expiry || new Date(item.expiry + "T23:59:59") >= new Date())
    );

    if (!coupon) {
      setAppliedCoupon(null);
      setCouponMessage("Invalid, expired or inactive coupon code.");
      return;
    }

    setAppliedCoupon(coupon);
    setCouponMessage(
      coupon.type === "percent"
        ? `${coupon.value}% discount applied.`
        : `${formatPrice(coupon.value)} discount applied.`
    );
  };

  const submit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please complete your name, phone and address.");
      return;
    }

    onPlaceOrder(form, {
      code: appliedCoupon?.code || "",
      discount,
      subtotal,
      total
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="checkout-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <span className="eyebrow">SECURE CHECKOUT EXPERIENCE</span>
        <h2>CHECKOUT</h2>

        <form onSubmit={submit} className="checkout-form">
          <label>Full name</label>
          <input name="name" value={form.name} onChange={update} placeholder="Your full name" required />

          <label>Phone number</label>
          <input name="phone" value={form.phone} onChange={update} placeholder="Your phone number" required />

          <label>Delivery address</label>
          <textarea name="address" value={form.address} onChange={update} placeholder="Street, building, apartment..." required />

          <label>City / Emirate</label>
          <select name="city" value={form.city} onChange={update}>
            {["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"].map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>

          <label>Payment method</label>
          <select name="payment" value={form.payment} onChange={update}>
            <option value="COD">Cash on Delivery</option>
            <option value="ONLINE">Online Payment (Demo)</option>
          </select>

          {form.payment === "ONLINE" && (
            <p className="demo-payment-note">
              Online payment gateway is not connected. No payment will be charged.
            </p>
          )}

          <div className="coupon-checkout">
            <label>Discount coupon</label>
            <div className="coupon-input-row">
              <input
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value)}
                placeholder="Enter coupon code"
              />
              <button type="button" className="primary-button" onClick={applyCoupon}>APPLY</button>
            </div>
            {couponMessage && <p className="coupon-message">{couponMessage}</p>}
          </div>

          <div className="checkout-price-breakdown">
            <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div><span>Discount</span><strong>- {formatPrice(discount)}</strong></div>
            <div className="checkout-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          </div>

          {error && <p className="form-error">{error}</p>}
          <button className="primary-button full-button" type="submit">PLACE ORDER</button>
        </form>
      </div>
    </div>
  );
}

function DeliveryRide() {
  return (
    <section className="delivery-ride-section">
      <div className="delivery-ride-copy">
        <span className="eyebrow">KPRO DELIVERY SERVICE</span>
        <h2>Your style is on its way.</h2>
        <p>From our collection to your doorstep. Follow your order and enjoy a smooth delivery experience.</p>
        <a href="#track" className="delivery-track-link">TRACK YOUR ORDER ↗</a>
      </div>

      <div className="rider-scene" aria-label="Animated delivery rider on a motorcycle">
        <div className="rider-skyline"><i /><i /><i /><i /><i /></div>
        <div className="rider-road"><span /></div>
        <div className="delivery-bike">
          <div className="bike-wheel wheel-back" />
          <div className="bike-wheel wheel-front" />
          <div className="bike-frame" />
          <div className="bike-seat" />
          <div className="bike-handle" />
          <div className="bike-box">KPRO</div>
          <div className="rider-body">
            <div className="rider-leg rider-leg-back" />
            <div className="rider-leg rider-leg-front" />
            <div className="rider-torso" />
            <div className="rider-arm" />
            <div className="rider-head"><span className="rider-helmet" /></div>
          </div>
        </div>
        <span className="ride-caption">DELIVERING YOUR LOOK</span>
      </div>
    </section>
  );
}

function AdminPanel({
  products,
  setProducts,
  orders,
  setOrders,
  reviews,
  setReviews,
  coupons,
  setCoupons,
  returns,
  setReturns,
  customers,
  onClose,
  onLogout
}) {
  const [tab, setTab] = useState("overview");
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({
    name: "",
    category: "Gents",
    price: "",
    oldPrice: "",
    image: "",
    color: "Black",
    stock: 5,
    description: "",
    material: "",
    fit: "",
    washing: "",
    gallery: ""
  });
  const [couponDraft, setCouponDraft] = useState({
    code: "",
    type: "percent",
    value: "",
    expiry: ""
  });
  const fileRef = useRef(null);

  const totalSales = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const soldUnits = orders.reduce(
    (sum, order) => sum + (order.items || []).reduce((qty, item) => qty + Number(item.qty || 0), 0),
    0
  );

  const lowStock = products.filter((product) =>
    Object.values(product.stock || {}).reduce((sum, value) => sum + Number(value || 0), 0) <= 5
  );

  const pendingOrders = orders.filter((order) =>
    !["Delivered", "Cancelled"].includes(order.status)
  );

  const pendingReviews = reviews.filter((review) => review.status === "pending");

  const today = new Date().toDateString();
  const todayOrders = orders.filter((order) =>
    new Date(order.createdAt).toDateString() === today
  );

  const todaySales = todayOrders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));

    const amount = orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          order.status !== "Cancelled" &&
          orderDate.getMonth() === date.getMonth() &&
          orderDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((sum, order) => sum + Number(order.total || 0), 0);

    return {
      label: date.toLocaleDateString("en", { month: "short" }),
      amount
    };
  });

  const maxSales = Math.max(...monthlyData.map((item) => item.amount), 1);

  const saveProduct = (event) => {
    event.preventDefault();
    if (!draft.name.trim() || !draft.price) return;

    const gallery = draft.gallery
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (editing) {
      setProducts((current) => current.map((item) =>
        item.id === editing
          ? normalizeProduct({
              ...item,
              name: draft.name,
              category: draft.category,
              price: Number(draft.price),
              oldPrice: Number(draft.oldPrice || draft.price),
              image: draft.image || item.image,
              description: draft.description,
              material: draft.material,
              fit: draft.fit,
              washing: draft.washing,
              gallery,
              colors: [draft.color],
              color: draft.color,
              stock: Object.fromEntries(
                item.sizes.map((size) => [size, Number(draft.stock) || 0])
              )
            })
          : item
      ));
    } else {
      const newProduct = normalizeProduct({
        id: `admin-${Date.now()}`,
        name: draft.name,
        category: draft.category,
        price: Number(draft.price),
        oldPrice: Number(draft.oldPrice || draft.price),
        image: draft.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
        color: draft.color,
        colors: [draft.color],
        sizes: SIZES,
        stock: Object.fromEntries(SIZES.map((size) => [size, Number(draft.stock) || 0])),
        description: draft.description || "A new product from the KPRO collection.",
        material: draft.material,
        fit: draft.fit,
        washing: draft.washing,
        gallery,
        tag: "NEW",
        isNew: true
      });

      setProducts((current) => [newProduct, ...current]);
    }

    setEditing(null);
    setDraft({
      name: "",
      category: "Gents",
      price: "",
      oldPrice: "",
      image: "",
      color: "Black",
      stock: 5,
      description: "",
      material: "",
      fit: "",
      washing: "",
      gallery: ""
    });
    setTab("products");
  };

  const editProduct = (product) => {
    setEditing(product.id);
    setDraft({
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      color: product.colors?.[0] || "Black",
      stock: product.stock?.S || 0,
      description: product.description || "",
      material: product.material || "",
      fit: product.fit || "",
      washing: product.washing || "",
      gallery: (product.gallery || []).join(", ")
    });
    setTab("add");
  };

  const updateStock = (product, size, value) => {
    setProducts((current) => current.map((item) =>
      item.id === product.id
        ? normalizeProduct({
            ...item,
            stock: {
              ...item.stock,
              [size]: Math.max(0, Number(value) || 0)
            }
          })
        : item
    ));
  };

  const updateOrderStatus = (id, status) => {
    setOrders((current) => current.map((order) =>
      order.id === id ? { ...order, status } : order
    ));
  };

  const saveCoupon = (event) => {
    event.preventDefault();

    const code = couponDraft.code.trim().toUpperCase();
    const value = Number(couponDraft.value);

    if (!code || !value || value <= 0) return;

    if (couponDraft.type === "percent" && value > 100) {
      alert("Percentage coupon cannot be greater than 100.");
      return;
    }

    setCoupons((current) => [
      ...current.filter((item) => item.code !== code),
      {
        id: `coupon-${Date.now()}`,
        code,
        type: couponDraft.type,
        value,
        expiry: couponDraft.expiry,
        active: true
      }
    ]);

    setCouponDraft({ code: "", type: "percent", value: "", expiry: "" });
  };

  const exportBackup = () => {
    const backup = {
      products,
      orders,
      reviews,
      coupons,
      returns,
      customers,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kpro-backup-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const backup = JSON.parse(reader.result);

        if (Array.isArray(backup.products)) setProducts(backup.products.map(normalizeProduct));
        if (Array.isArray(backup.orders)) setOrders(backup.orders);
        if (Array.isArray(backup.reviews)) setReviews(backup.reviews);
        if (Array.isArray(backup.coupons)) setCoupons(backup.coupons);
        if (Array.isArray(backup.returns)) setReturns(backup.returns);

        alert("Backup restored successfully.");
      } catch {
        alert("Invalid backup file.");
      }

      event.target.value = "";
    };

    reader.readAsText(file);
  };

  const updateReviewStatus = (id, status) => {
    setReviews((current) => current.map((review) =>
      review.id === id ? { ...review, status } : review
    ));
  };

  const updateReturnStatus = (id, status) => {
    setReturns((current) => current.map((request) =>
      request.id === id ? { ...request, status } : request
    ));
  };

  const toggleCoupon = (id) => {
    setCoupons((current) => current.map((coupon) =>
      coupon.id === id ? { ...coupon, active: !coupon.active } : coupon
    ));
  };

  const tabs = [
    ["overview", "Overview"],
    ["products", "Products & Stock"],
    ["add", "Add Product"],
    ["orders", "Orders"],
    ["customers", "Customers"],
    ["reviews", `Reviews (${pendingReviews.length})`],
    ["coupons", "Coupons"],
    ["returns", `Returns (${returns.filter((item) => item.status === "Pending").length})`],
    ["backup", "Backup & Restore"]
  ];

  const heading = {
    overview: "Dashboard Overview",
    products: "Products & Inventory",
    add: editing ? "Edit Product" : "Add New Product",
    orders: "Customer Orders",
    customers: "Customers",
    reviews: "Review Moderation",
    coupons: "Discount Coupons",
    returns: "Return & Exchange Requests",
    backup: "Backup & Restore"
  };

  return (
    <div className="admin-overlay">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">KPRO<span>ADMIN</span></div>

          {tabs.map(([value, label]) => (
            <button
              key={value}
              className={tab === value ? "active" : ""}
              onClick={() => {
                if (value === "add") {
                  setEditing(null);
                  setDraft({
                    name: "",
                    category: "Gents",
                    price: "",
                    oldPrice: "",
                    image: "",
                    color: "Black",
                    stock: 5,
                    description: "",
                    material: "",
                    fit: "",
                    washing: "",
                    gallery: ""
                  });
                }
                setTab(value);
              }}
            >
              {label}
            </button>
          ))}

          <button className="admin-logout" onClick={onLogout}>Logout</button>
          <button className="admin-close" onClick={onClose}>Back to Store</button>
        </aside>

        <main className="admin-content">
          <div className="admin-topbar">
            <div>
              <span className="eyebrow">KPRO STORE MANAGEMENT</span>
              <h1>{heading[tab]}</h1>
            </div>
            <span className="admin-status">LOCAL STORAGE MODE</span>
          </div>

          {tab === "overview" && (
            <>
              <div className="admin-stats">
                <div><span>Total Products</span><strong>{products.length}</strong></div>
                <div><span>Total Orders</span><strong>{orders.length}</strong></div>
                <div><span>Pending Orders</span><strong>{pendingOrders.length}</strong></div>
                <div><span>Units Sold</span><strong>{soldUnits}</strong></div>
                <div><span>Total Sales</span><strong>{formatPrice(totalSales)}</strong></div>
                <div><span>Today's Sales</span><strong>{formatPrice(todaySales)}</strong></div>
                <div><span>Customers</span><strong>{customers.length}</strong></div>
                <div><span>Pending Reviews</span><strong>{pendingReviews.length}</strong></div>
              </div>

              <div className="admin-card">
                <h3>Monthly Sales Report</h3>
                <div className="sales-chart">
                  {monthlyData.map((item) => (
                    <div className="sales-chart-column" key={item.label}>
                      <strong>{formatPrice(item.amount)}</strong>
                      <div className="sales-chart-bar-wrap">
                        <div
                          className="sales-chart-bar"
                          style={{
                            height: `${Math.max(4, (item.amount / maxSales) * 100)}%`
                          }}
                        />
                      </div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card">
                <h3>Low Stock Alerts</h3>
                {lowStock.length ? lowStock.map((product) => (
                  <div className="admin-order-row" key={product.id}>
                    <strong>{product.name}</strong>
                    <span className="low-stock-label">LOW STOCK</span>
                  </div>
                )) : <p>All products have sufficient stock.</p>}
              </div>

              <div className="admin-card">
                <h3>Recent Orders</h3>
                {orders.slice(0, 6).map((order) => (
                  <div className="admin-order-row" key={order.id}>
                    <div>
                      <strong>{order.customer?.name}</strong>
                      <small>{order.id} · {order.status}</small>
                    </div>
                    <strong>{formatPrice(order.total)}</strong>
                  </div>
                ))}
                {!orders.length && <p>No orders received yet.</p>}
              </div>
            </>
          )}

          {tab === "products" && (
            <div className="admin-card">
              <h3>Inventory Management</h3>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock by size</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>
                          <div className="stock-edit-grid">
                            {product.sizes.map((size) => (
                              <label key={size}>
                                {size}
                                <input
                                  type="number"
                                  min="0"
                                  value={product.stock?.[size] ?? 0}
                                  onChange={(event) => updateStock(product, size, event.target.value)}
                                />
                              </label>
                            ))}
                          </div>
                        </td>
                        <td className="admin-actions">
                          <button onClick={() => editProduct(product)}>Edit</button>
                          <button
                            className="danger-button"
                            onClick={() => {
                              if (window.confirm("Delete this product?")) {
                                setProducts((current) =>
                                  current.filter((item) => item.id !== product.id)
                                );
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "add" && (
            <form className="admin-card admin-product-form" onSubmit={saveProduct}>
              <h3>{editing ? "Update product details" : "Create a new product"}</h3>

              <label>Product Name</label>
              <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required />

              <label>Category</label>
              <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>
                {CATEGORIES.filter((item) => item !== "All").map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <label>Price</label>
              <input type="number" min="0" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} required />

              <label>Old Price</label>
              <input type="number" min="0" value={draft.oldPrice} onChange={(event) => setDraft({ ...draft, oldPrice: event.target.value })} />

              <label>Colour</label>
              <input value={draft.color} onChange={(event) => setDraft({ ...draft, color: event.target.value })} />

              <label>Image URL</label>
              <input value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} placeholder="Paste product image URL" />

              <label>Extra Gallery Image URLs (comma separated)</label>
              <textarea value={draft.gallery} onChange={(event) => setDraft({ ...draft, gallery: event.target.value })} placeholder="https://image1.jpg, https://image2.jpg" />

              <label>Product Description</label>
              <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />

              <label>Fabric / Material</label>
              <input value={draft.material} onChange={(event) => setDraft({ ...draft, material: event.target.value })} placeholder="Cotton, polyester..." />

              <label>Fit</label>
              <input value={draft.fit} onChange={(event) => setDraft({ ...draft, fit: event.target.value })} placeholder="Regular, slim, oversized..." />

              <label>Washing Instructions</label>
              <input value={draft.washing} onChange={(event) => setDraft({ ...draft, washing: event.target.value })} />

              <label>Stock per size</label>
              <input type="number" min="0" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: event.target.value })} />

              <button className="primary-button" type="submit">
                {editing ? "SAVE CHANGES" : "ADD PRODUCT"}
              </button>
            </form>
          )}

          {tab === "orders" && (
            <div className="admin-card">
              <h3>All Customer Orders</h3>
              {!orders.length && <p>No customer orders yet.</p>}

              {orders.map((order) => (
                <div className="admin-order-card" key={order.id}>
                  <div className="admin-order-row">
                    <div>
                      <strong>{order.customer?.name}</strong>
                      <small>{order.id} · {new Date(order.createdAt).toLocaleString()}</small>
                    </div>
                    <strong>{formatPrice(order.total)}</strong>
                  </div>

                  <p>{order.customer?.phone} · {order.customer?.city}</p>
                  <p>{order.customer?.address}</p>
                  <p>Payment: {order.customer?.payment === "COD" ? "Cash on Delivery" : "Online demo — unpaid"}</p>

                  {(order.discount || 0) > 0 && (
                    <p>Coupon: {order.couponCode} · Discount: {formatPrice(order.discount)}</p>
                  )}

                  <ul>
                    {(order.items || []).map((item, index) => (
                      <li key={index}>
                        {item.name} · {item.size} · {item.color} × {item.qty}
                      </li>
                    ))}
                  </ul>

                  <div className="order-status-control">
                    <label>Order status</label>
                    <select
                      value={order.status || "Received"}
                      onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                    >
                      {["Received", "Confirmed", "Processing", "Dispatched", "Delivered", "Cancelled"].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "customers" && (
            <div className="admin-card">
              <h3>Customer Records</h3>
              {!customers.length && <p>Customer details will appear after orders are placed.</p>}

              {customers.map((customer, index) => (
                <div className="admin-order-row" key={`${customer.phone}-${index}`}>
                  <div>
                    <strong>{customer.name}</strong>
                    <small>{customer.phone} · {customer.city}</small>
                  </div>
                  <span>{customer.orders} order(s)</span>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div className="admin-card">
              <h3>Customer Review Approval</h3>
              {!reviews.length && <p>No reviews submitted yet.</p>}

              {reviews.map((review) => {
                const product = products.find((item) => String(item.id) === String(review.productId));

                return (
                  <div className="admin-order-card" key={review.id}>
                    <div className="admin-order-row">
                      <strong>{product?.name || "Product removed"}</strong>
                      <span className={`review-status ${review.status}`}>
                        {review.status || "pending"}
                      </span>
                    </div>
                    <p className="admin-review-stars">
                      {"★".repeat(Number(review.stars || 0))}
                      {"☆".repeat(5 - Number(review.stars || 0))}
                    </p>
                    <p>{review.text}</p>
                    <small>{new Date(review.createdAt).toLocaleString()}</small>

                    {review.status === "pending" && (
                      <div className="admin-actions review-admin-actions">
                        <button onClick={() => updateReviewStatus(review.id, "approved")}>Approve</button>
                        <button className="danger-button" onClick={() => updateReviewStatus(review.id, "rejected")}>Reject</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "coupons" && (
            <>
              <form className="admin-card admin-product-form" onSubmit={saveCoupon}>
                <h3>Create Discount Coupon</h3>

                <label>Coupon Code</label>
                <input
                  value={couponDraft.code}
                  onChange={(event) => setCouponDraft({ ...couponDraft, code: event.target.value.toUpperCase() })}
                  placeholder="KPRO20"
                  required
                />

                <label>Discount Type</label>
                <select
                  value={couponDraft.type}
                  onChange={(event) => setCouponDraft({ ...couponDraft, type: event.target.value })}
                >
                  <option value="percent">Percentage (%)</option>
                  <option value="fixed">Fixed amount</option>
                </select>

                <label>Discount Value</label>
                <input
                  type="number"
                  min="1"
                  value={couponDraft.value}
                  onChange={(event) => setCouponDraft({ ...couponDraft, value: event.target.value })}
                  required
                />

                <label>Expiry Date (optional)</label>
                <input
                  type="date"
                  value={couponDraft.expiry}
                  onChange={(event) => setCouponDraft({ ...couponDraft, expiry: event.target.value })}
                />

                <button className="primary-button" type="submit">CREATE COUPON</button>
              </form>

              <div className="admin-card">
                <h3>Available Coupons</h3>
                {!coupons.length && <p>No coupons created.</p>}

                {coupons.map((coupon) => (
                  <div className="admin-order-row" key={coupon.id}>
                    <div>
                      <strong>{coupon.code}</strong>
                      <small>
                        {coupon.type === "percent" ? `${coupon.value}% off` : `${formatPrice(coupon.value)} off`}
                        {coupon.expiry ? ` · Expires ${coupon.expiry}` : ""}
                      </small>
                    </div>
                    <div className="admin-actions">
                      <span>{coupon.active ? "Active" : "Inactive"}</span>
                      <button onClick={() => toggleCoupon(coupon.id)}>
                        {coupon.active ? "Disable" : "Enable"}
                      </button>
                      <button
                        className="danger-button"
                        onClick={() => setCoupons((current) => current.filter((item) => item.id !== coupon.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "returns" && (
            <div className="admin-card">
              <h3>Return & Exchange Requests</h3>
              {!returns.length && <p>No return or exchange requests received.</p>}

              {returns.map((request) => (
                <div className="admin-order-card" key={request.id}>
                  <div className="admin-order-row">
                    <strong>{request.customerName}</strong>
                    <span className={`review-status ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </div>
                  <p>Order: {request.orderId}</p>
                  <p>Phone: {request.phone}</p>
                  <p>Request: {request.type}</p>
                  <p>Reason: {request.reason}</p>
                  <small>{new Date(request.createdAt).toLocaleString()}</small>

                  <div className="order-status-control">
                    <label>Request status</label>
                    <select
                      value={request.status}
                      onChange={(event) => updateReturnStatus(request.id, event.target.value)}
                    >
                      {["Pending", "Approved", "Rejected", "Completed"].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "backup" && (
            <div className="admin-card backup-card">
              <h3>Store Backup & Restore</h3>
              <p>Download a backup of products, orders, reviews, coupons and return requests.</p>
              <button className="primary-button" onClick={exportBackup}>DOWNLOAD BACKUP</button>

              <div className="backup-upload">
                <label>Restore from backup file</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={importBackup}
                />
              </div>

              <p className="backup-warning">
                Restoring a backup replaces the current saved store data.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = readStore(KEYS.products, null);
    return Array.isArray(saved) ? saved.map(normalizeProduct) : initialProductsReady;
  });

  const [cart, setCart] = useState(() => readStore(KEYS.cart, []));
  const [orders, setOrders] = useState(() => readStore(KEYS.orders, []));
  const [wishlist, setWishlist] = useState(() => readStore(KEYS.wishlist, []));
  const [reviews, setReviews] = useState(() => {
    const saved = readStore(KEYS.reviews, []);
    return Array.isArray(saved)
      ? saved.map((item) => ({ ...item, status: item.status || "approved" }))
      : [];
  });

  const [coupons, setCoupons] = useState(() => {
    const saved = readStore(KEYS.coupons, null);
    return Array.isArray(saved) ? saved : defaultCoupons;
  });

  const [returns, setReturns] = useState(() => readStore(KEYS.returns, []));

  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [returnForm, setReturnForm] = useState({
    orderId: "",
    name: "",
    phone: "",
    type: "Return",
    reason: ""
  });
  const [returnMessage, setReturnMessage] = useState("");
  const [toast, setToast] = useState("");

  const customers = useMemo(() => {
    const map = new Map();

    orders.forEach((order) => {
      const phone = order.customer?.phone || "unknown";
      const existing = map.get(phone);

      map.set(phone, {
        name: order.customer?.name || "Customer",
        phone,
        city: order.customer?.city || "",
        orders: (existing?.orders || 0) + 1
      });
    });

    return Array.from(map.values());
  }, [orders]);

  useEffect(() => saveStore(KEYS.products, products), [products]);
  useEffect(() => saveStore(KEYS.cart, cart), [cart]);
  useEffect(() => saveStore(KEYS.orders, orders), [orders]);
  useEffect(() => saveStore(KEYS.wishlist, wishlist), [wishlist]);
  useEffect(() => saveStore(KEYS.reviews, reviews), [reviews]);
  useEffect(() => saveStore(KEYS.coupons, coupons), [coupons]);
  useEffect(() => saveStore(KEYS.returns, returns), [returns]);

  useEffect(() => {
    if (!campaigns?.length) return;

    const timer = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % campaigns.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;

      const searchMatch = `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, category, search, sort]);

  const getProducts = (name) => products.filter((item) => item.category === name);

  const featuredProducts = useMemo(() => {
    const marked = products.filter((item) =>
      item.featured === true ||
      /featured|best seller|bestseller|editor.?s pick/i.test(String(item.tag || ""))
    );

    return (marked.length ? marked : products).slice(0, 4);
  }, [products]);

  const ratingFor = (productId) => {
    const list = reviews.filter((item) =>
      String(item.productId) === String(productId) &&
      item.status === "approved"
    );

    if (!list.length) return 0;

    return list.reduce((sum, item) => sum + Number(item.stars || 0), 0) / list.length;
  };

  const addToCart = (product, size, color, quantity) => {
    const available = Number(product.stock?.[size] || 0);

    if (quantity > available || available <= 0) {
      alert("Sorry, this size is out of stock.");
      return;
    }

    setCart((current) => {
      const key = `${product.id}-${size}-${color}`;
      const existing = current.find((item) =>
        `${item.id}-${item.size}-${item.color}` === key
      );

      if (existing) {
        return current.map((item) =>
          `${item.id}-${item.size}-${item.color}` === key
            ? { ...item, qty: Math.min(available, item.qty + quantity) }
            : item
        );
      }

      return [...current, {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size,
        color,
        qty: quantity
      }];
    });

    setSelectedProduct(null);
    setCartOpen(true);
    setToast("Added to your shopping bag.");
  };

  const buyNow = (product, size, color, quantity) => {
    const available = Number(product.stock?.[size] || 0);

    if (available <= 0 || quantity > available) {
      alert("Sorry, this size is out of stock.");
      return;
    }

    setCart((current) => {
      const key = `${product.id}-${size}-${color}`;
      const existing = current.find((item) =>
        `${item.id}-${item.size}-${item.color}` === key
      );

      if (existing) {
        return current.map((item) =>
          `${item.id}-${item.size}-${item.color}` === key
            ? { ...item, qty: Math.min(available, item.qty + quantity) }
            : item
        );
      }

      return [...current, {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size,
        color,
        qty: quantity
      }];
    });

    setSelectedProduct(null);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const changeCartQty = (cartItem, change) => {
    setCart((current) => current.map((item) => {
      if (
        item.id !== cartItem.id ||
        item.size !== cartItem.size ||
        item.color !== cartItem.color
      ) return item;

      const product = products.find((productItem) => productItem.id === item.id);
      const max = Number(product?.stock?.[item.size] || 0);

      return { ...item, qty: Math.max(1, Math.min(max, item.qty + change)) };
    }));
  };

  const removeCartItem = (cartItem) => {
    setCart((current) => current.filter((item) => !(
      item.id === cartItem.id &&
      item.size === cartItem.size &&
      item.color === cartItem.color
    )));
  };

  const toggleWishlist = (id) => {
    setWishlist((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]
    );
  };

  const placeOrder = (customer, priceInfo) => {
    const valid = cart.every((item) => {
      const product = products.find((productItem) => productItem.id === item.id);
      return product && Number(product.stock?.[item.size] || 0) >= item.qty;
    });

    if (!valid) {
      alert("Some products no longer have enough stock. Please review your bag.");
      setCheckoutOpen(false);
      return;
    }

    const order = {
      id: `KPRO-${Date.now().toString().slice(-7)}`,
      createdAt: new Date().toISOString(),
      customer,
      items: cart,
      subtotal: priceInfo.subtotal,
      discount: priceInfo.discount,
      couponCode: priceInfo.code,
      total: priceInfo.total,
      status: "Received"
    };

    setProducts((current) => current.map((product) => {
      const ordered = cart.filter((item) => item.id === product.id);
      if (!ordered.length) return product;

      const nextStock = { ...product.stock };

      ordered.forEach((item) => {
        nextStock[item.size] = Math.max(
          0,
          Number(nextStock[item.size] || 0) - item.qty
        );
      });

      return normalizeProduct({ ...product, stock: nextStock });
    }));

    setOrders((current) => [order, ...current]);
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setSuccessOrder(order);
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();

    if (login.username.trim() === "admin" && login.password === "KPRO2026") {
      setAdminLoggedIn(true);
      setLoginOpen(false);
      setAdminOpen(true);
      setLoginError("");
      setLogin({ username: "", password: "" });
    } else {
      setLoginError("Incorrect username or password.");
    }
  };

  const openAdmin = () => {
    if (adminLoggedIn) setAdminOpen(true);
    else setLoginOpen(true);
  };

  const openShop = (name = "All") => {
    setCategory(name);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const reviewProduct = (review) => {
    setReviews((current) => [review, ...current]);
    setToast("Your review has been submitted and is waiting for admin approval.");
  };

  const hero = campaigns?.[heroIndex] || campaigns?.[0];

  const trackOrder = (event) => {
    event.preventDefault();

    const result = orders.find((order) =>
      order.id.toLowerCase() === trackingNumber.trim().toLowerCase()
    );

    setTrackingResult(result || false);

    if (result) {
      setReturnForm((current) => ({
        ...current,
        orderId: result.id,
        name: result.customer?.name || "",
        phone: result.customer?.phone || ""
      }));
    }
  };

  const submitReturnRequest = (event) => {
    event.preventDefault();

    const order = orders.find((item) =>
      item.id.toLowerCase() === returnForm.orderId.trim().toLowerCase()
    );

    if (!order) {
      setReturnMessage("Order number not found. Track your order first.");
      return;
    }

    if (["Cancelled"].includes(order.status)) {
      setReturnMessage("A cancelled order cannot be returned.");
      return;
    }

    const request = {
      id: `RETURN-${Date.now()}`,
      orderId: order.id,
      customerName: returnForm.name,
      phone: returnForm.phone,
      type: returnForm.type,
      reason: returnForm.reason,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    setReturns((current) => [request, ...current]);
    setReturnMessage("Your request has been submitted. Our team will review it.");
    setReturnForm({
      orderId: "",
      name: "",
      phone: "",
      type: "Return",
      reason: ""
    });
  };

  return (
    <div
      className={`kpro-app ${language === "ar" ? "rtl-mode" : ""}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="announcement-bar">
        <span>COMPLIMENTARY STYLE INSPIRATION · UAE FASHION EDIT</span>
        <span>PREMIUM COLLECTIONS / NEW SEASON</span>
      </div>

      <header className="main-header">
        <a className="brand-logo" href="#home">KPRO<span>.</span></a>

        <nav className="main-nav">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#gents">Gents</a>
          <a href="#ladies">Ladies</a>
          <a href="#kids">Kids</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#track">Track Order</a>
        </nav>

        <div className="header-actions">
          <label className="header-search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCategory("All");
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
              }}
              placeholder="Search products..."
            />
          </label>

          <button
            className="language-button"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          >
            {language === "en" ? "عربي" : "EN"}
          </button>

          <button className="icon-action" onClick={() => setCartOpen(true)} aria-label="Open cart">
            ♧ <span className="cart-count">{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
          </button>

          <button className="icon-action admin-nav-button" onClick={openAdmin}>Admin</button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <Image
            src={hero?.image}
            alt="KPRO premium fashion campaign"
            className="hero-image"
          />
          <div className="hero-shade" />

          <div className="hero-content">
            <span className="hero-kicker">KPRO / DUBAI COLLECTION</span>
            <h1>{hero?.title || "STYLE THAT SPEAKS"}</h1>
            <p>{hero?.subtitle || "Discover premium fashion for every moment."}</p>
            <button className="light-button" onClick={() => openShop("All")}>SHOP NOW ↗</button>
          </div>

          <div className="hero-bottom">
            <span>0{heroIndex + 1} — 0{campaigns?.length || 1} / NEW SEASON</span>
            <div className="hero-dots">
              {(campaigns || []).map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  className={heroIndex === index ? "active" : ""}
                  onClick={() => setHeroIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <span>CURATED FOR YOUR EVERYDAY</span>
          <p>Style is personal. Make every look yours.</p>
          <span>EST. KPRO / UAE</span>
        </section>

        <section className="category-section">
          <SectionTitle
            eyebrow="EXPLORE KPRO"
            title="SHOP BY COLLECTION"
            text="Discover a collection made for every style and every generation."
          />

          <div className="category-grid">
            {initialCategories.map((item) => {
              const name = typeof item === "string" ? item : item?.name;
              const image = typeof item === "object" ? item.image : null;

              if (!name) return null;

              return (
                <button className="category-tile" key={name} onClick={() => openShop(name)}>
                  <Image src={image || getProducts(name)[0]?.image} alt={name} />
                  <div>
                    <span>{getProducts(name).length} STYLES</span>
                    <h3>{name}</h3>
                    <b>EXPLORE ↗</b>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="featured-section" id="featured">
          <div className="featured-heading">
            <div>
              <span className="eyebrow">THE KPRO SELECTION</span>
              <h2>Featured pieces</h2>
              <p>Standout styles selected from the latest KPRO collection.</p>
            </div>
            <button className="featured-shop-link" onClick={() => openShop("All")}>SHOP ALL ↗</button>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((product, index) => (
              <article className="featured-card" key={`featured-${product.id}`}>
                <button className="featured-image" onClick={() => setSelectedProduct(product)}>
                  <Image src={product.image} alt={product.name} />
                  <span>0{index + 1} / KPRO EDIT</span>
                </button>

                <div className="featured-card-info">
                  <div>
                    <small>{product.category}</small>
                    <h3>{product.name}</h3>
                    <strong>{formatPrice(product.price)}</strong>
                  </div>
                  <button onClick={() => setSelectedProduct(product)}>VIEW DETAILS ↗</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div id="gents">
          <RopeCollection
            title="GENTS COLLECTION"
            subtitle="Modern essentials with a confident edge."
            items={getProducts("Gents")}
            onOpen={setSelectedProduct}
            onWish={toggleWishlist}
            wishlist={wishlist}
          />
        </div>

        <div id="ladies">
          <RopeCollection
            title="LADIES COLLECTION"
            subtitle="Effortless pieces for your own kind of statement."
            items={getProducts("Ladies")}
            onOpen={setSelectedProduct}
            onWish={toggleWishlist}
            wishlist={wishlist}
          />
        </div>

        <div id="kids">
          <RopeCollection
            title="KIDS COLLECTION"
            subtitle="Comfort, colour and little moments of style."
            items={getProducts("Kids")}
            onOpen={setSelectedProduct}
            onWish={toggleWishlist}
            wishlist={wishlist}
          />
        </div>

        <section className="product-section" id="shop">
          <SectionTitle
            eyebrow="FIND YOUR NEXT LOOK"
            title="THE KPRO STORE"
            text="Explore the complete collection and choose your favourites."
          />

          <div className="shop-toolbar">
            <div className="filter-tabs">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

            <span>{filteredProducts.length} PRODUCTS</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={setSelectedProduct}
                onWish={toggleWishlist}
                wished={wishlist.includes(product.id)}
                rating={ratingFor(product.id)}
              />
            ))}

            {!filteredProducts.length && (
              <p className="no-results">No products found. Try another search.</p>
            )}
          </div>
        </section>

        <section className="campaign-section">
          {(campaigns || []).map((item, index) => (
            <button
              className="campaign-card"
              key={`${item.title}-${index}`}
              onClick={() => openShop(index === 2 ? "Kids" : "All")}
            >
              <Image src={item.image} alt={item.title} />
              <div>
                <span>THE KPRO EDIT / 0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <b>DISCOVER ↗</b>
              </div>
            </button>
          ))}
        </section>

        <section className="lookbook-section" id="lookbook">
          <SectionTitle
            eyebrow="STYLE NOTES"
            title="LOOKBOOK"
            text="A little inspiration for the way you dress."
          />

          <div className="lookbook-grid">
            {(lookbook || []).map((src, index) => (
              <button key={`${src}-${index}`} onClick={() => openShop("All")}>
                <Image src={src} alt={`KPRO lookbook ${index + 1}`} />
                <span>LOOK 0{index + 1} ↗</span>
              </button>
            ))}
          </div>
        </section>

        <DeliveryRide />

        <section className="track-section" id="track">
          <SectionTitle
            eyebrow="ORDER SUPPORT"
            title="TRACK YOUR ORDER"
            text="Enter your KPRO order number to check its latest status."
          />

          <form className="track-form" onSubmit={trackOrder}>
            <input
              value={trackingNumber}
              onChange={(event) => setTrackingNumber(event.target.value)}
              placeholder="Example: KPRO-1234567"
              required
            />
            <button className="primary-button" type="submit">TRACK ORDER</button>
          </form>

          {trackingResult === false && (
            <p className="form-error">Order number not found. Please check and try again.</p>
          )}

          {trackingResult && trackingResult !== false && (
            <div className="tracking-result">
              <strong>{trackingResult.id}</strong>
              <span>{trackingResult.customer?.name}</span>
              <b>{trackingResult.status}</b>
              <small>{new Date(trackingResult.createdAt).toLocaleString()}</small>

              {trackingResult.status !== "Cancelled" && (
                <div className="tracking-steps">
                  {["Received", "Confirmed", "Processing", "Dispatched", "Delivered"].map((step, index) => {
                    const orderSteps = ["Received", "Confirmed", "Processing", "Dispatched", "Delivered"];
                    const currentIndex = orderSteps.indexOf(trackingResult.status || "Received");

                    return (
                      <div className={`tracking-step ${index <= currentIndex ? "done" : ""}`} key={step}>
                        <i />
                        <span>{step}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {trackingResult.status === "Cancelled" && (
                <p className="tracking-cancelled">This order has been cancelled.</p>
              )}

              <div className="tracking-items">
                {(trackingResult.items || []).map((item, index) => (
                  <span key={`${item.id}-${index}`}>
                    {item.name} · {item.size} · Qty {item.qty}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="return-section" id="returns">
          <SectionTitle
            eyebrow="KPRO CUSTOMER CARE"
            title="RETURN / EXCHANGE REQUEST"
            text="Submit a request for an order you have already placed. Requests are reviewed by the store admin."
          />

          <form className="return-request-form" onSubmit={submitReturnRequest}>
            <label>Order number</label>
            <input
              value={returnForm.orderId}
              onChange={(event) => setReturnForm({ ...returnForm, orderId: event.target.value })}
              placeholder="KPRO-1234567"
              required
            />

            <label>Your name</label>
            <input
              value={returnForm.name}
              onChange={(event) => setReturnForm({ ...returnForm, name: event.target.value })}
              placeholder="Full name"
              required
            />

            <label>Phone number</label>
            <input
              value={returnForm.phone}
              onChange={(event) => setReturnForm({ ...returnForm, phone: event.target.value })}
              placeholder="Phone number"
              required
            />

            <label>Request type</label>
            <select
              value={returnForm.type}
              onChange={(event) => setReturnForm({ ...returnForm, type: event.target.value })}
            >
              <option>Return</option>
              <option>Exchange</option>
            </select>

            <label>Reason</label>
            <textarea
              value={returnForm.reason}
              onChange={(event) => setReturnForm({ ...returnForm, reason: event.target.value })}
              placeholder="Please explain the reason..."
              required
            />

            <button className="primary-button" type="submit">SUBMIT REQUEST</button>
            {returnMessage && <p className="return-message">{returnMessage}</p>}
          </form>
        </section>

        <section className="newsletter-section">
          <span className="eyebrow">THE KPRO LETTER</span>
          <h2>Stay in the style loop.</h2>
          <p>New collections, fresh edits and fashion inspiration.</p>

          <form onSubmit={(event) => {
            event.preventDefault();
            alert("Thank you for joining the KPRO list!");
            event.target.reset();
          }}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">SUBSCRIBE ↗</button>
          </form>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-main">
          <div>
            <a className="footer-logo" href="#home">KPRO<span>.</span></a>
            <p>Premium fashion. Made for your moment.</p>
          </div>

          <div>
            <h4>EXPLORE</h4>
            <a href="#gents">Gents</a>
            <a href="#ladies">Ladies</a>
            <a href="#kids">Kids</a>
            <a href="#shop">Shop All</a>
          </div>

          <div>
            <h4>HELP & SUPPORT</h4>
            <a href="#track">Track Order</a>
            <a href="#returns">Returns & Exchanges</a>
            <button className="footer-text-button" onClick={() => setSizeGuideOpen(true)}>Size Guide</button>
          </div>

          <div>
            <h4>CONTACT</h4>
            <p>UAE / Dubai</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              WhatsApp Us ↗
            </a>
            <p>Premium fashion, thoughtfully selected.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} KPRO. ALL RIGHTS RESERVED.</span>
          <span>MADE FOR MODERN STYLE / UAE</span>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
          onBuy={buyNow}
          reviews={reviews}
          onReview={reviewProduct}
          rating={ratingFor(selectedProduct.id)}
        />
      )}

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeCartQty}
          onRemove={removeCartItem}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          coupons={coupons}
          onClose={() => setCheckoutOpen(false)}
          onPlaceOrder={placeOrder}
        />
      )}

      {sizeGuideOpen && <SizeGuide onClose={() => setSizeGuideOpen(false)} />}

      {successOrder && (
        <div className="success-overlay" onMouseDown={() => setSuccessOrder(null)}>
          <div className="success-card" onMouseDown={(event) => event.stopPropagation()}>
            <div className="success-icon">✓</div>
            <span className="eyebrow">KPRO ORDER CONFIRMED</span>
            <h2>Your order has been received!</h2>
            <p>Thank you, {successOrder.customer.name}. We will contact you about your delivery.</p>

            <div className="order-number">
              <span>YOUR ORDER NUMBER</span>
              <strong>{successOrder.id}</strong>
            </div>

            <div className="success-total">
              <strong>{formatPrice(successOrder.total)}</strong>
              <span> · {successOrder.items.length} item line(s)</span>
            </div>

            <button className="primary-button full-button" onClick={() => setSuccessOrder(null)}>
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      )}

      {loginOpen && (
        <div className="modal-backdrop" onMouseDown={() => setLoginOpen(false)}>
          <form
            className="admin-login-card"
            onSubmit={handleAdminLogin}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={() => setLoginOpen(false)}>×</button>
            <span className="eyebrow">KPRO PRIVATE ACCESS</span>
            <h2>Admin Login</h2>

            <label>Username</label>
            <input
              value={login.username}
              onChange={(event) => setLogin({ ...login, username: event.target.value })}
              placeholder="admin"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={login.password}
              onChange={(event) => setLogin({ ...login, password: event.target.value })}
              placeholder="Password"
              required
            />

            {loginError && <p className="form-error">{loginError}</p>}

            <button className="primary-button full-button" type="submit">LOGIN</button>
            <small>Admin login: admin / KPRO2026</small>
          </form>
        </div>
      )}

      {adminOpen && (
        <AdminPanel
          products={products}
          setProducts={setProducts}
          orders={orders}
          setOrders={setOrders}
          reviews={reviews}
          setReviews={setReviews}
          coupons={coupons}
          setCoupons={setCoupons}
          returns={returns}
          setReturns={setReturns}
          customers={customers}
          onClose={() => setAdminOpen(false)}
          onLogout={() => {
            setAdminLoggedIn(false);
            setAdminOpen(false);
          }}
        />
      )}

      {toast && (
        <div className="kpro-toast" onClick={() => setToast("")}>
          {toast}
          <button onClick={() => setToast("")}>×</button>
        </div>
      )}

      <button className="floating-cart" onClick={() => setCartOpen(true)}>
        BAG / {cart.reduce((sum, item) => sum + item.qty, 0)}
      </button>

      <a
        className="kpro-whatsapp-float"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with KPRO on WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}