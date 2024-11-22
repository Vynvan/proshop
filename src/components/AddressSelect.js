import { FormSelect } from "react-bootstrap";

export default function AddressSelect({ addresses }) {
   const { error, fetchUrl, loading, result } = useFetch();
   const { user } = useUser();
   const [addresses, setAddresses] = useState([]);

   return (
      <FormSelect>
         <span>1</span>
         <span>2</span>
      </FormSelect>
   );
}