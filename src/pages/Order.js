import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddressDisplay from "../components/AddressDisplay";
import ProductList from '../components/ProductList';
import useFetch from '../hooks/useFetch';

export default function Order() {
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

   if (!order || error) return (
      <div className='my-3 container-fluid d-flex'>
         <p className='mb-3 mx-auto'>Bestellung konnte nicht geladen werden.</p>
      </div>
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
