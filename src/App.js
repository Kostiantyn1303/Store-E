import React from "react";
import { useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";

import Confirmation from "./scenes/checkout/Confirmation";
import NavBar from "./scenes/global/Navbar";
import Home from "./scenes/home/Home";
import ItemDtails from "./scenes/itemsDetails/ItemDtails";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import NovaPoshtaForm from "./scenes/checkout/Delivery";
import TableSize from "./components/TableSize";
import Payment from "./scenes/checkout/Payment";
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="client" element={<Home />} />
          <Route path="client/item/:itemId" element={<ItemDtails />} />
          <Route path="client/payment" element={<Payment />} />
          <Route path="client/payment/delivery" element={<NovaPoshtaForm />} />
          <Route
            path="client/payment/delivery/succsess"
            element={<Confirmation />}
          />
          <Route path="client/table" element={<TableSize />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
