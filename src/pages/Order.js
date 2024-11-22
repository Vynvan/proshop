import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductList from '../components/ProductList';
import useCart from "../hooks/CartProvider";
import useFetch from '../hooks/useFetch';

export default function Order() {
   const { cart } = useCart();
   const { error, fetchUrl, loading, result } = useFetch();
   const { id } = useParams();
   const [address, setAddress] = useState(null);
   const [newOrder, setNewOrder] = useState(false);
   const [order, setOrder] = useState(null);

   useEffect(() => {
      if (id) fetchUrl(`orders/${id}`);
      else {
         setNewOrder(true);
         setOrder({ items: cart });
      }
   }, [cart, id, setNewOrder]);

   useEffect(() => {
      if (result?.order) setOrder(result.order);
      console.log(result?.order)
   }, [result, setOrder]);

   if (error && id) return (
      <div className='my-3 container-fluid d-flex'>
         <p className='mb-3 mx-auto'>Bestellung konnte nicht geladen werden.</p>
      </div>
   );

   return (
      <Container fluid='md'>
         {order && <ProductList products={order.items} />}
      </Container>
   );
}