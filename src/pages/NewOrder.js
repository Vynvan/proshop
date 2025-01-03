import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, FormSelect } from "react-bootstrap";
import AddressSelect from "../components/AddressSelect";
import ProductList from '../components/ProductList';
import useCart from "../hooks/CartProvider";
import useFetch from '../hooks/useFetch';

/**
 * Order page handles the order process, including selecting products, delivery address, and payment method.
 *
 * @returns {JSX.Element} The rendered Order component.
 */
function NewOrder() {
   const { cart, clearCart } = useCart();
   const { error, fetchUrl, loading, result } = useFetch();
   const [address, setAddress] = useState(null);
   const [order, setOrder] = useState(null);
   const navigate = useNavigate();
   const noProducts = cart === undefined || cart === null || cart.length === 0;

   useEffect(() => {
      setOrder(prev => ({ ...prev, products: cart }));
   }, [cart, setOrder]);

   useEffect(() => {
      if (address) setOrder(prev => ({ ...prev, addressId: address.id }));
   }, [address, setOrder]);

   useEffect(() => {
      if (result?.orderId) {
         clearCart();
         navigate(`/order/${result.orderId}`);
      };
   }, [clearCart, navigate, result]);

   const buy = async () => {
      const cleanProducts = order.products.map(p => ({ id: p.id, quantity: p.quantity }));
      const sum = order.products.map(p => p.price * p.quantity).reduce((prev, curr) => prev + curr).toFixed(2);
      fetchUrl('orders', 'POST', { ...order, products: cleanProducts, sumPrice: sum });
   }

   // Displays a message, if the buy request errors out.
   if (error) return (
      <Container fluid="md" className="my-3 d-flex">
         <p className="mb-3 mx-auto">Bestellung konnte nicht versandt werden. Bitte versuchen Sie es erneut.</p>
      </Container>
   );

   // Displays a message, if the cart is empty.
   if (noProducts) return (
      <Container fluid="md" className="my-3 d-flex">
         <p className="mb-3 mx-auto">Sie haben noch keine Artikel im Warenkorb.</p>
      </Container>
   );

   return (
      <Container fluid='md'>
         <h3 className="mt-5 mb-2 px-1">Artikel</h3>
         {order && <ProductList products={order.products} />}
         <h3 className="mt-5 mb-2 px-1">Lieferadresse</h3>
         <AddressSelect setAddress={(address) => setAddress(address)} />
         <h3 className="mt-5 mb-2 px-1">Zahlungsart</h3>
         <FormSelect>
            <option>Rechnung</option>
         </FormSelect>
         <Container fluid="md" className="my-3 d-flex justify-content-center">
            <Button className="mx-3 my-2 px-3" onClick={() => buy()}>Bestellung abschicken</Button>
         </Container>
      </Container>
   );
}

export default NewOrder;
