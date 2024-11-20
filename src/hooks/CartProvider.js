import { createContext, useContext, useEffect, useReducer } from 'react';
import useUser from './UserProvider';

const CartContext = createContext();

export function CartProvider({ children }) {
   const { user } = useUser();
   const initialState = user && localStorage.getItem(`cart-${user.userId}`) ? JSON.parse(localStorage.getItem(`cart-${user.userId}`)) : [];
   
   const [cart, dispatch] = useReducer((state, action) => {
      console.log('Dispatch: state:', state, 'action: ', action)
      switch (action.type) {
         case 'ADD':
            const inCart = state.find(item => item.id === action.id);
            if (inCart) {
               inCart.quantity += 1;
               console.log(`${inCart.title}: ${inCart.quantity}`)
               return [...state];
            }
            else return [...state, { ...action.product, quantity: action.quantity || 1 }];
         case 'DECREMENT':
            const toDecrement = state.find(item => item.id === action.id);
            if (toDecrement && toDecrement.quantity > 1) {
               toDecrement.quantity -= 1;
               return [...state];
            }
            else return state;
         case 'REMOVE':
            return state.filter(item => item.id !== action.id);
         default:
            console.log('Invalid dispatch!')
            return state;
      }
   }, initialState);

   useEffect(() => {
      console.log('UseEffect Cardprovider: ', cart);
      if (user && cart) localStorage.setItem(`cart-${user.userId}`, JSON.stringify(cart));
      else if (user) localStorage.removeItem(`cart-${user.userId}`);
   }, [cart, user]);

   function addToCart(product, quantity) {
      dispatch({ id: product.id, product, quantity, type: 'ADD' });
   }

   function decrement({ id }) {
      dispatch({ id, type: 'DECREMENT' });
   }

   function removeFromCart({ id }) {
      dispatch({ id, type: 'REMOVE' });
   }

   return <CartContext.Provider value={{ cart, addToCart, decrement, removeFromCart }}>
      {children}
   </CartContext.Provider>;
};

export default function useCart () {
   return useContext(CartContext);
};
