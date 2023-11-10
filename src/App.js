import React from "react";
import { useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import NavBar from "./scenes/global/Navbar";
import Home from "./scenes/home/Home";
import ItemDtails from "./scenes/itemsDetails/ItemDtails";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
function App() {
  return (
    <div>
      <BrowserRouter basename="client">
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDtails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
