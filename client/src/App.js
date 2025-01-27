import './App.css';
import Header from './components/shared/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import SingleProduct from './components/pages/Home/SingleProduct';
import Cart from './components/pages/Cart/Cart';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import Shop from './components/pages/Shop/Shop';
import Checkout from './components/pages/Checkout/Checkout';
import Error from './components/pages/NotFound/Error';
import OrderComplete from './components/pages/Checkout/OrderComplete';
import { useEffect } from 'react';
import RequireAuth from './components/pages/Auth/RequireAuth';
import Dashboard from './components/pages/Dashboard/Dashboard';
import MyOrders from './components/pages/Dashboard/User/MyOrders';
import MyProfile from './components/pages/Dashboard/MyProfile';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllOrders from './components/pages/Dashboard/Admin/AllOrders';
import CreateProduct from './components/pages/Dashboard/Admin/CreateProduct';
import ManageProducts from './components/pages/Dashboard/Admin/ManageProducts';
import AllUsers from './components/pages/Dashboard/Admin/AllUsers';
import EditProfile from './components/pages/Dashboard/EditProfile';
import EditProduct from './components/pages/Dashboard/Admin/EditProduct';
import { createTheme, ThemeProvider } from '@mui/material';
import SingleArticle from './components/pages/Home/SingleArticle';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './Redux/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommingSoon from './CommingSoon/CommingSoon';
import Recomendations from './components/pages/Recomendations/Recomendations'
import { ukUA } from '@mui/material/locale';

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Mulish'
      },
    },
    ukUA
  });

  const user = useSelector(state => state.allUsers.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe())
    console.log('dispatch')
  }, [dispatch])


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/cart' element={
            <RequireAuth> <Cart /> </RequireAuth>
          }></Route>
          <Route path='/product/:id' element={<SingleProduct />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/shop' element={<Shop />}></Route>
          <Route path='/recomendations' element={<Recomendations />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/checkout' element={
            <RequireAuth> <Checkout /> </RequireAuth>
          }></Route>
          <Route path='/orderComplete' element={
            <RequireAuth> <OrderComplete /> </RequireAuth>
          }></Route>
          <Route path='/*' element={<Error />}></Route>
          <Route path='/soon' element={<CommingSoon />}></Route>

          <Route path='/dashboard' element={<RequireAuth><Dashboard /> </RequireAuth>}>
            {
              user?.role === 'admin' ?
                <>
                  <Route index element={<CreateProduct />}></Route>
                  <Route path='orderDetails' element={<AllOrders />}></Route>
                  <Route path='manageProducts' element={<ManageProducts />}></Route>
                  <Route path='allUsers' element={<AllUsers />}></Route>
                  <Route path='editProduct/:id' element={<EditProduct />}></Route>
                </>
                :
                <Route index element={<MyOrders />}></Route>

            }
            <Route path='profile' element={<RequireAuth> <MyProfile /> </RequireAuth>}></Route>
            <Route path='profile/edit' element={<RequireAuth> <EditProfile /> </RequireAuth>}></Route>
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </ThemeProvider>

  );
}

export default App;
