import './App.css';
import { BrowserRouter as Router, Route, Navigate} from 'react-router-dom';
import RoutesWithNotFound from './utilities/RoutesWithNotFound';
import { PrivateRoutes, PublicRoutes } from './consts/Constants.js';
import AuthGuard from './guards/AuthGuard';
import { Suspense, lazy } from 'react';
import Loader from './components/Loader/Loader';
import { UserProvider } from './contexts/UserContext';
import Wrapper from './wrapper/Wrapper';
import CreatePost from './components/CreatePost/CreatePost';
import PostInvite from './pages/PostInvite/PostInvite';

const Login = lazy(()=> import("./pages/Login/Login"))
const Register = lazy(()=> import('./pages/Register/Register'))
const Home = lazy(()=>import('./pages/Home/Home'))
const Inventory = lazy(()=>import('./pages/Inventory/Inventory'))

function App() {

  return (
    <div className='bg-dark min-vh-100'>
    <UserProvider>
      <Suspense fallback={<Loader/>}>
        <Router>
          <RoutesWithNotFound>
            <Route exact path='/' element={<Navigate replace to={PrivateRoutes.HOME}/>}/>
            <Route exact path={PublicRoutes.LOGIN} element={<Login/>} />
            <Route exact path={PublicRoutes.REGISTER} element={<Register/>} />
            <Route element={<AuthGuard/>}>
                <Route element={<Wrapper/>}>
                <Route exact path={PrivateRoutes.HOME} element={<Home/>} />
                <Route exact path={PrivateRoutes.INVENTORY} element={<Inventory/>}/>
                <Route exact path={PrivateRoutes.CREATE_POST} element={<CreatePost/>}/>
                <Route path='/post-invite/:id' element={<PostInvite/>}/>
              </Route>
            </Route>
          </RoutesWithNotFound>
        </Router>
      </Suspense>
    </UserProvider>
    </div>
  );
}

export default App;
