import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/auth/AuthRoute';
import PrivateAuth from './components/auth/PrivateRoute';
import useAuthChecked from './hooks/useAuthChecked';
import Login from './pages/Login';
import Teams from './pages/Teams';
import { Toaster } from 'react-hot-toast';
import Projects from './pages/Projects';
import Register from './pages/Register';
import Loader from './components/common/Loader';

function App() {
    const authCheck = useAuthChecked();

    return !authCheck ? (
        <p>Loading...</p>
    ) : (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
                <Route
                    path="login"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
                <Route
                    path="teams"
                    element={
                        <PrivateAuth>
                            <Teams />
                        </PrivateAuth>
                    }
                />
                <Route
                    path="projects"
                    element={
                        <PrivateAuth>
                            <Projects />
                        </PrivateAuth>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <AuthRoute>
                            <Register />
                        </AuthRoute>
                    }
                />
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
