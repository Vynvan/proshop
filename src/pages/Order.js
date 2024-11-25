import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddressDisplay from "../components/AddressDisplay";
import ProductList from '../components/ProductList';
import useFetch from '../hooks/useFetch';
import useAddresses from "../hooks/useAddresses";

export default function Order() {
   const { error, fetchUrl, loading, result } = useFetch();
   const { id } = useParams();
   const { addresses, error: errorAddresses, loading: loadingAddresses, setAddresses, reload } = useAddresses();
   const [order, setOrder] = useState(null);

   useEffect(() => {
      if (id) fetchUrl(`orders/${id}`);
   }, [id, setOrder]);

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
         <AddressDisplay />
      </Container>
   );
}