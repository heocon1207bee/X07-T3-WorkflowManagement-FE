const PrivateRoute = ({ component: Component }) => {
    console.log('is Token valid:::');

    return <Component />;
};

export default PrivateRoute;
