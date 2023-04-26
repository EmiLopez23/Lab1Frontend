import './App.css';
import { BrowserRouter as Router, Route, Navigate} from 'react-router-dom';
import RoutesWithNotFound from './utilities/RoutesWithNotFound';
import { PrivateRoutes, PublicRoutes } from './routes/Routes';
import AuthGuard from './guards/AuthGuard';
import { Suspense, lazy } from 'react';
import Loader from './components/Loader/Loader';
import { UserProvider } from './contexts/UserContext';
import AddGame from './components/AddGame/AddGame';
import Navbar from './components/navbar/Navbar';
import Wrapper from './wrapper/Wrapper';

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
              <Route exact path="/add" element={<AddGame/>}/>
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
