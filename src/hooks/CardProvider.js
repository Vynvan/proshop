import { createContext, useContext, useEffect, useReducer } from 'react';
import useUser from './UserProvider';

const CartContext = createContext();

export function CardProvider({ children }) {
   const { user } = useUser();
   const initialState = user && localStorage.getItem(`cart-${user.id}`) ? JSON.parse(localStorage.getItem(`cart-${user.id}`)) : [];
   const [cart, dispatch] = useReducer((state, action) => {
      console.log('Dispatch: state:', state, 'action: ', action)
      switch (action.type) {
         case 'INCREMENT':
         case 'ADD':
            const articleInCart = state.find(item => item.product_id === action.id);
            if (articleInCart) {
               articleInCart.quantity += 1;
               return state;
            }
            else return [...state, { ...action.article, quantity: 1 }];
         case 'DECREMENT':
            const articleToDecrement = state.find(item => item.product_id === action.id);
            if (articleToDecrement && articleToDecrement.quantity > 1) {
               articleToDecrement.quantity -= 1;
               return state;
            }
         case 'REMOVE':
            return state.filter(item => item.product_id === action.id);
         default:
            return state;
      }
   }, initialState);

   useEffect(() => {
      console.log('UseEffect Cardprovider: ', cart);
      if (cart) localStorage.setItem(`cart-${user.id}`, JSON.stringify(cart));
      else localStorage.removeItem(`cart-${user.id}`);
   }, [cart, user]);

   function addArticle(article) {
      dispatch({ id: article.product_id, article, type: 'ADD' });
   }

   function decrement(article) {
      dispatch({ id: article.product_id, type: 'DECREMENT' });
   }

   function increment(article) {
      dispatch({ id: article.product_id, type: 'INCREMENT' });
   }

   function removeArticle(article) {
      dispatch({ id: article.product_id, type: 'REMOVE' });
   }

   return <CartContext.Provider value={{ cart, addArticle, decrement, increment, removeArticle }}>
      {children}
   </CartContext.Provider>;
};

export default function useCart () {
   return useContext(CartContext);
};
