
import { useEffect, Suspense, lazy } from "react";
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing, selectUserToken } from '../../redux/auth/authSelectors'
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";




const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'))


export default function App() {

  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);

  useEffect(()=> {
    if (userToken) {
      dispatch(refreshUser());
    }

  },[dispatch, userToken]);

  return isRefreshing ? ( <b>Refreshing... please wait!</b> ) :(
    <Layout>
    <Suspense>
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route 
        path = "login" 
        element={ <RestrictedRoute component={ <LoginPage />} redirectTo="/contacts" />} 
        />
        <Route path = "register"
        element = { <RestrictedRoute component={<RegisterPage/>} redirectTo = "/contacts"/>}
        />
        <Route 
        path = "contacts" 
        element = {<PrivateRoute component={<ContactsPage/>} redirectTo = "/login"/>}
        //ВАЖЛИВО
        //ОСЬ ТУТ Я РОБИВ ПЕРЕХОД НА "/", але коли я залогінен і знаходжусь на /contacts, то після
        //перезавантаження мене все ще перекидує на головну сторінку, хоча повинен залишатись на цій самій сторінці
        //Можливо refreshUser не встигає записати до стану дані, але ж для цього ми навмисно не рендеремо
        //контент, доки не отримуєм 1 - isRefreshing = false; , а отже і 2 - isLoggedIn = true.
        //В обхід цьому я зробив redirectTo = "/login" який в свою чергу редіректить на contacts
        //Це "костиль", і як зробити по нормальному? Де у мене помилка? 
        />
      </Routes>
    </Suspense>
      
    </Layout>
  );
}
