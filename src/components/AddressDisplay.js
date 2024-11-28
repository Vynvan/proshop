/**
 * @module Components
 */

import { Container } from "react-bootstrap";

/**
 * AddressDisplay is a React component that displays an address within a container.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.address - The address object containing the address details.
 * @param {string} props.address.street - The street of the address.
 * @param {string} props.address.postal - The postal code of the address.
 * @param {string} props.address.city - The city of the address.
 * @param {string} props.address.state - The state of the address.
 * @param {string} props.address.country - The country of the address.
 * @param {boolean} [props.centered=true] - Indicates whether the address should be displayed centered. Default is true.
 * @returns {JSX.Element|null} Returns a JSX element that displays the address, or null if no address is provided.
 * @example
 * // Example usage of AddressDisplay component
 * const address = {
 *   street: '123 Main St',
 *   postal: '12345',
 *   city: 'Anytown',
 *   state: 'CA',
 *   country: 'USA'
 * }; *
 * <AddressDisplay address={address} centered={true} />
 */
function AddressDisplay({ address, centered=true }) {
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

export default AddressDisplay;
