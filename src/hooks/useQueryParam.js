import { useLocation, useNavigate } from 'react-router-dom';

export default function useQueryParam (paramName) {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const setQueryParam = (value) => {
        query.set(paramName, value);
        navigate(`?${query.toString()}`);
    };
    return [query.get(paramName), setQueryParam];
};
