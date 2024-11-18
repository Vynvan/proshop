import { createContext, useContext, useEffect, useReducer } from 'react';
import useUser from './UserProvider';

const CartContext = createContext();

export function CardProvider({ children }) {
   const { user } = useUser();
   const initialState = user && localStorage.getItem(`cart-${user.userId}`) ? JSON.parse(localStorage.getItem(`cart-${user.userId}`)) : [];
   const [cart, dispatch] = useReducer((state, action) => {
      console.log('Dispatch: state:', state, 'action: ', action)
      switch (action.type) {
         case 'ADD':
            const articleInCart = state.find(item => item.product_id === action.id);
            if (articleInCart) {
               articleInCart.quantity += 1;
               console.log(`${articleInCart.title}: ${articleInCart.quantity}`)
               return [...state];
            }
            else return [...state, { ...action.article, quantity: 1 }];
         case 'DECREMENT':
            const articleToDecrement = state.find(item => item.product_id === action.id);
            if (articleToDecrement && articleToDecrement.quantity > 1) {
               articleToDecrement.quantity -= 1;
               return [...state];
            }
            else return state;
         case 'REMOVE':
            return state.filter(item => item.product_id !== action.id);
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

   function addArticle(article) {
      dispatch({ id: article.product_id, article, type: 'ADD' });
   }

   function decrement(article) {
      dispatch({ id: article.product_id, type: 'DECREMENT' });
   }

   function removeArticle(article) {
      dispatch({ id: article.product_id, type: 'REMOVE' });
   }

   return <CartContext.Provider value={{ cart, addArticle, decrement, removeArticle }}>
      {children}
   </CartContext.Provider>;
};

export default function useCart () {
   return useContext(CartContext);
};
