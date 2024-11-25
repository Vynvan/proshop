import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CardLayout from './components/CardLayout';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './hooks/CartProvider';
import { UserProvider } from './hooks/UserProvider';
import { ProductProvider } from './hooks/ProductProvider';
import Address from './pages/Address';
import Cart from './pages/Cart';
import Login from './pages/Login';
import NewOrder from './pages/NewOrder';
import Order from './pages/Order';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';

function App() {
   return (
   <BrowserRouter>
      <UserProvider>
         <ProductProvider>
            <CartProvider>
               <Navigation />
               <Routes>
                  <Route path="/login" element={
                     <CardLayout>
                        <Login />
                     </CardLayout>
                  } />
                  <Route path="/register" element={
                     <CardLayout>
                        <Register />
                     </CardLayout>
                  } />
                  <Route element={<ProtectedRoute />}>
                     <Route path="/" element={
                        <Products />
                     } />
                     <Route path='/address' element={
                        <Address />
                     } />
                     <Route path='/cart' element={
                        <Cart />
                     } />
                     <Route path='/neworder' element= {
                        <NewOrder />
                     } />
                     <Route path='/order/:id' element= {
                        <Order />
                     } />
                     <Route path='/:id' element={
                        <ProductDetails />
                     } />

                  </Route>
               </Routes>
               <Footer />
            </CartProvider>
         </ProductProvider>
      </UserProvider>
   </BrowserRouter>
   );
}

export default App;
