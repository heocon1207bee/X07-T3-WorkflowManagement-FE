import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProjectListPage from '../pages/ProjectListPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import RolePage from '../pages/RolePage/RolePage';

export default [
    {
        path: '/',
        element: <ProjectListPage />,
        // element: <PrivateRoute component={ProjectListPage} />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/role',
        element: <RolePage />,
    }
];
