import { useEffect } from 'react';

import useAppRoute from './hooks/useAppRoute';
import useVerifyToken from './hooks/useVerifyToken';
import Layout from './hooks/WebsiteLayout/Layout';

function App() {
    const routes = useAppRoute();
    const verifyToken = useVerifyToken();
    useEffect(() => verifyToken, []);

    return <Layout>{routes}</Layout>;
}

export default App;
