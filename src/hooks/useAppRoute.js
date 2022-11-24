import { useRoutes } from 'react-router-dom';

import routes from '../configs/configureRoutes';

export default function useAppRoute() {
    return useRoutes(routes);
}
