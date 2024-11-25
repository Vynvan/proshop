import { Container } from "react-bootstrap";

export default function AddressDisplay({ address, centered=true }) {
   return (address &&
      <Container>
         <div className={`d-flex ${centered ? 'justify-content-center' : ''}`}>
           <div className={centered ? 'text-center' : ''}>
               <p className="mb-1">{address.street}</p>
               <p className="mb-1">{address.postal} {address.city}</p>
               <p className="mb-3">{address.state} {address.country}</p>
            </div>
         </div>
      </Container>
   );
}
