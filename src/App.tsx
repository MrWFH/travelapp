import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ProductCategory from '@/pages/ProductCategory';
import ProductDetail from '@/pages/ProductDetail';
import Flights from '@/pages/Flights';
import FlightDetail from '@/pages/FlightDetail';
import CarRentals from '@/pages/CarRentals';
import CarDetail from '@/pages/CarDetail';
import Checkout from '@/pages/Checkout';
import CheckoutComplete from '@/pages/CheckoutComplete';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import Wishlist from '@/pages/Wishlist';
import Messages from '@/pages/Messages';
import UserProfile from '@/pages/UserProfile';
import AccountSettings from '@/pages/AccountSettings';
import HelpCenter from '@/pages/HelpCenter';
import HostProfile from '@/pages/HostProfile';
import ListProperty from '@/pages/ListProperty';
import ShowMap from '@/pages/ShowMap';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stays" element={<ProductCategory />} />
      <Route path="/stays/:id" element={<ProductDetail />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/flights/:id" element={<FlightDetail />} />
      <Route path="/car-rentals" element={<CarRentals />} />
      <Route path="/car-rentals/:id" element={<CarDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/complete" element={<CheckoutComplete />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/account" element={<AccountSettings />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/host/:id" element={<HostProfile />} />
      <Route path="/list-property" element={<ListProperty />} />
      <Route path="/map" element={<ShowMap />} />
    </Routes>
  );
}

export default App;
