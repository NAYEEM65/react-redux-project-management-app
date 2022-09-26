import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateAuth = ({ children }) => {
    const auth = useAuth();
    
    return auth ? children : <Navigate to="/login" />;
};

export default PrivateAuth;
