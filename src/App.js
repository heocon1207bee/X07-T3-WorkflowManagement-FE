import useAppRoute from './hooks/useAppRoute';

function App() {
    const routes = useAppRoute();
    return <>{routes}</>;
}

export default App;
