import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CardLayout from './components/CardLayout';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { CardProvider } from './hooks/CardProvider';
import { UserProvider } from './hooks/UserProvider';
import Address from './pages/Address';
import Articles from './pages/Articles';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
   return (
   <UserProvider>
      <CardProvider>
         <BrowserRouter>
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
                     <Articles />
                  } />
                  <Route path='/address' element={
                     <Address />
                  } />
                  <Route path='/cart' element={
                     <Cart />
                  } />
               </Route>
            </Routes>
            <Footer />
         </BrowserRouter>
      </CardProvider>
   </UserProvider>
   );
}

export default App;
