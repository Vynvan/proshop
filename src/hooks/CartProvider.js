/**
 * @module Hooks
 */

import { createContext, useContext, useEffect, useReducer } from 'react';
import useUser from './UserProvider';

const CartContext = createContext();

/**
 * CartProvider component that provides cart state and actions to its children.
 * 
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components that will have access to the cart context.
 * @returns {JSX.Element} The CartContext provider with the cart state and actions.
 */
export function CartProvider({ children }) {
   const { user } = useUser();
   const initialState = user && localStorage.getItem(`cart-${user.userId}`) ? JSON.parse(localStorage.getItem(`cart-${user.userId}`)) : [];
   
   /**
    * Reducer function to manage cart state.
    *
    * @param {Array} state - The current state of the cart, (i.e. an array of products).
    * @param {Object} action - The action to perform on the state.
    * @param {string} action.type - The type of action to perform (ADD, CLEAR, DECREMENT, REMOVE).
    * @param {string} [action.id] - The ID of the product to modify.
    * @param {Object} [action.product] - The product object to add to the cart (required for ADD action).
    * @param {number} [action.quantity] - The quantity of the product to add (default is 1).
    * @returns {Array} The updated state of the cart after applying the action, (i.e. an array of products).
    */
   const [cart, dispatch] = useReducer((state, action) => {
      switch (action.type) {
         case 'ADD':
            const inCart = state.find(item => item.id === action.id);
            if (inCart) {
               inCart.quantity += 1;
               return [...state];
            }
            else return [...state, { ...action.product, quantity: action.quantity || 1 }];
         case 'CLEAR':
            return [];
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
            return state;
      }
   }, initialState);

   useEffect(() => {
      if (user && cart) localStorage.setItem(`cart-${user.userId}`, JSON.stringify(cart));
      else if (user) localStorage.removeItem(`cart-${user.userId}`);
   }, [cart, user]);

   /**
    * Adds a product to the cart.
    * 
    * @param {Object} product - The product to add to the cart.
    * @param {number} quantity - The quantity of the product to add.
    */
   function addToCart(product, quantity) {
      dispatch({ id: product.id, product, quantity, type: 'ADD' });
   }

   /**
    * Clears all items from the cart.
    */
   function clearCart() {
      dispatch({ type: 'CLEAR' });
   }

   /**
    * Decrements the quantity of a product in the cart.
    * 
    * @param {Object} param - The parameters (a product object).
    * @param {string} param.id - The ID of the product to decrement.
    */
   function decrement({ id }) {
      dispatch({ id, type: 'DECREMENT' });
   }

   /**
    * Removes a product from the cart.
    * 
    * @param {Object} param - The parameters (a product object).
    * @param {string} param.id - The ID of the product to remove.
    */
   function removeFromCart({ id }) {
      dispatch({ id, type: 'REMOVE' });
   }

   return <CartContext.Provider value={{ cart, addToCart, clearCart, decrement, removeFromCart }}>
      {children}
   </CartContext.Provider>;
};

/**
 * Access to the CartProviders context via a hook.
 * 
 * @returns {JSX.Element} A hook to use everything the CartProvider offers.
 */
function useCart () {
   return useContext(CartContext);
};

export default useCart;
