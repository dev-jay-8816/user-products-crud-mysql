import App from '@/app';
import UserRoutes from './routes/user.routes';
import AuthRoutes from './routes/auth.routes';
import ProductRoutes from './routes/product.routes';

const appServer = new App([
    new AuthRoutes(),
    new UserRoutes(),
    new ProductRoutes()
]);
appServer.listen();