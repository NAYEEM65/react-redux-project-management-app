import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthRoute = ({ children }) => {
    const auth =  useAuth();
    
    return !auth ? children : <Navigate to="/teams" />;
};

export default AuthRoute;
