import { useEffect } from 'react';
import useAppRoute from './hooks/useAppRoute';
import useVerifyToken from './hooks/useVerifyToken';

function App() {
    const routes = useAppRoute();
    const verifyToken = useVerifyToken();
    useEffect(() => verifyToken, []);

    return <>{routes}</>;
}

export default App;
