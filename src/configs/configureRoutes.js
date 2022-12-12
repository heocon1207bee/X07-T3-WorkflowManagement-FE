import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProjectListPage from '../pages/ProjectListPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import RolePage from '../pages/RolePage/RolePage';
import CardModal from '../components/Card/CardModal';

export default [
    {
        path: '/',
        element: <PrivateRoute component={ProjectListPage} />,
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
    },
    {
        path: '/user/project/card',
        element: <PrivateRoute component={CardModal} />,
    },
];
