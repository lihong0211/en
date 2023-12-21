import Dashboard from './pages/Dashboard/index';
import Test from './pages/Dashboard/Test/index';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);

export default router;

export const navigate = router.navigate;
