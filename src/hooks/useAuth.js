import { useSelector } from 'react-redux';

const useAuth = () => {
    const { user, accessToken } = useSelector((state) => state.auth) || {};

    return user && accessToken ? true : false;
};

export default useAuth;
