import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProjectListPage from '../pages/ProjectListPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import RolePage from '../pages/RolePage/RolePage';
import ProjectDetail from '../pages/ProjectDetail/ProjectDetail';

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
        path: '/user/project/:projectId',
        element: <PrivateRoute component={ProjectDetail} />,
    },
    {
        path: '/role',
        element: <RolePage/>,
    }
];
