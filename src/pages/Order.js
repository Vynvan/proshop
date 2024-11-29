import { useEffect, useMemo, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddressDisplay from "../components/AddressDisplay";
import ProductList from '../components/ProductList';
import useFetch from '../hooks/useFetch';

/**
 * Order component fetches and displays the details of a specific order, 
 * including the products, delivery address, and order status.
 *
 * @returns {JSX.Element} The rendered Order component.
 */
function Order() {
   const { error, fetchUrl, loading, result } = useFetch();
   const { id } = useParams();
   const [order, setOrder] = useState(null);

   const address = useMemo(() => ({
      name: order?.address_name,
      street: order?.street,
      city: order?.city,
      postal: order?.postal,
      state: order?.state,
      country: order?.country
   }), [order]);

   /**
    * DROPPED FEATURE: This is to show the current state of the order, 
    * that has to be set by an admin in the admin section, that was dropped due time reasons.
    */
   const status = useMemo(() => order ? 
      order.status === 0 ? 'Ausstehend' :
      order.status === 1 ? 'Zahlung Ausstehend' :
      order.status === 2 ? 'Zahlung Bestätigt' :
      order.status === 3 ? 'In Bearbeitung' :
      order.status === 4 ? 'Versandt' :
      order.status === 5 ? 'Teilweise Versandt' :
      order.status === 6 ? 'Angekommen' :
      order.status === 7 ? 'Zurückgestellt' :
      order.status === 8 ? 'Storniert' :
      order.status === 9 ? 'In Rücksendung' :
      order.status === 10 ? 'Rückerstattung Ausstehend' :
      order.status === 11 ? 'Rückerstattet' :
      order.status === 12 ? 'Lieferung Ausstehend' :
      order.status === 13 ? 'Lieferung Fehlgeschlagen' :
      'Unbekannt' : '', [order]);

   useEffect(() => {
      if (id) fetchUrl(`orders/${id}`);
   }, [id, setOrder]);

   useEffect(() => {
      if (result?.order) setOrder(result.order);
   }, [result, setOrder]);

   // Displays a message, if the order request errors out or no order was responded.
   if (!order || error) return (
      <div className='my-3 container-fluid d-flex'>
         <p className='mb-3 mx-auto'>Bestellung konnte nicht geladen werden.</p>
      </div>
   );

   // Display a loading spinner while the order is being fetched
   if (loading) return (
      <Container fluid="md" className="my-3 d-flex">
         <Spinner className="mx-auto" animation="border" variant="primary" />
      </Container>
   );

   return (
      <Container fluid='md'>
         <h3 className="mt-5 mb-3">Bestellung vom <i>{new Date(order.createdAt).toLocaleDateString()}</i></h3>
         {order && <ProductList products={order.products} />}
         <h3 className="mt-5 mb-3">Lieferung an: <i>{address.name}</i></h3>
         <AddressDisplay address={address} centered={false} />
         <h3 className="mt-5 mb-3">Status: <i>{status}</i></h3>
      </Container>
   );
}

export default Order;
