import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'snackStackCart';
const ORDER_KEY = 'snackStackLastOrder';

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => load(CART_KEY, []));
  const [lastOrder, setLastOrder] = useState(() => load(ORDER_KEY, null));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // the cart and the last order survive a refresh
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cartItems)); } catch { /* ignore */ }
  }, [cartItems]);
  useEffect(() => {
    try { localStorage.setItem(ORDER_KEY, JSON.stringify(lastOrder)); } catch { /* ignore */ }
  }, [lastOrder]);

  const addToCart = (cookie, qty = 1) =>
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === cookie.id);
      if (found) {
        return prev.map((i) =>
          i.id === cookie.id ? { ...i, qty: Math.min(20, i.qty + qty) } : i
        );
      }
      const { id, name, price, dough, edge, chip } = cookie;
      return [...prev, { id, name, price, dough, edge, chip, qty }];
    });

  const updateQty = (id, qty) =>
    setCartItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(20, qty) } : i))
    );

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCartItems([]);

  const count = useMemo(() => cartItems.reduce((n, i) => n + i.qty, 0), [cartItems]);
  const subtotal = useMemo(
    () => cartItems.reduce((n, i) => n + i.qty * i.price, 0),
    [cartItems]
  );

  // demo checkout: saves the receipt, empties the cart, closes the drawer
  const placeOrder = () => {
    setLastOrder({
      number: `SS-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric',
      }),
      items: cartItems,
      total: subtotal,
    });
    setCartItems([]);
    setDrawerOpen(false);
  };

  const value = {
    cartItems, count, subtotal, lastOrder,
    addToCart, updateQty, removeFromCart, clearCart, placeOrder,
    drawerOpen,
    openCart: () => setDrawerOpen(true),
    closeCart: () => setDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}