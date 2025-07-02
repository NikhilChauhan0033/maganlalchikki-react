import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import RedHeader from "./components/RedHeader/RedHeader";
import GrayHeader from "./components/GrayHeader/GrayHeader";
import LogoHeader from "./components/LogoHeader/LogoHeader";
import DepartmentsHeader from "./components/DepartmentsHeader/DepartmentsHeader";
import Footer from "./components/Footer/Footer";

import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import HomePagesComponent from "./components/HomePagesComponent/HomePagesComponent";
import ShopUs from "./components/ShopUsSection/ShopUs";
import WishListComponent from "./components/WishList/WishListComponent";
import CartComponent from "./components/CartComponent/CartComponent";
import CardDetails from "./components/CardDetails/CardDetails";
import SearchProducts from "./components/SearchProductsComponent/SearchProducts";
import PageNotFound from "./PagenotFound";
import SignUp from "./components/SignUp_SignIn/SignUp";
import SignIn from "./components/SignUp_SignIn/SignIn";
import MyAccountDetails from "./components/MyAccountDetails/MyAccountDetails";

function MainLayout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/signin"; // Hide on SignUp page

  return (
    <div style={{ width: "100%" }}>
      {!hideHeaderFooter && (
        <>
          <RedHeader />
          <GrayHeader />
          <LogoHeader />
          <DepartmentsHeader />
        </>
      )}

      <Routes>
        <Route path="/" element={<HomePagesComponent />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shop" element={<ShopUs />} />
        <Route path="/wishlist" element={<WishListComponent />} />
        <Route path="/cart" element={<CartComponent />} />
        <Route path="/carddetails" element={<CardDetails />} />
        <Route path="/searchproducts" element={<SearchProducts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/myaccount" element={<MyAccountDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
