import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CardLayout from './components/CardLayout';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './components/UserProvider';
import Articles from './pages/Articles';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
   return (
   <UserProvider>
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
            </Route>
         </Routes>
         <Footer />
      </BrowserRouter>
   </UserProvider>
   );
}

export default App;
