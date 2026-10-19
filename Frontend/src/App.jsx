import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import CartDrawer from "./components/layout/CartDrawer";
import Footer from "./components/layout/Footer";
import Intro from "./components/layout/Intro";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Receipt from "./pages/Receipt";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css';

const introSeen = () => {
  try { return sessionStorage.getItem('introSeen') === '1'; } catch { return false; }
};

function App() {
  const [showIntro, setShowIntro] = useState(() => !introSeen());
  const [revealing, setRevealing] = useState(false);

  const handleDone = () => {
    try { sessionStorage.setItem('introSeen', '1'); } catch { /* ignore */ }
    setShowIntro(false);
  };

  return (
    <div className="app">
      {showIntro && <Intro onOpen={() => setRevealing(true)} onDone={handleDone} />}

      <Navbar />
      <CartDrawer />

      <main className={revealing ? 'reveal' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Navigate to="/shop" replace />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;