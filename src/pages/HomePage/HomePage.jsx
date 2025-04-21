import { useSelector } from 'react-redux';
import css from './HomePage.module.css'
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSelectors';

export default function HomePage () {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    return (
        <div className={css.container}>
        <h1 className={css.title}>Phonebook Application</h1>
        {isLoggedIn 
        ? (
        <>
        <p className = {css.text}>Hello {user.name}!</p>
        <p className = {css.text}>Click here {<NavLink to={"/contacts"} className={css.link}>Click!</NavLink>} to start working!</p>
        </>) 
        : (
        <>
        <p className={css.text}>
        Already have an account?{' '}
        <NavLink to="/login" className={css.link}>
          Log in
        </NavLink>
        </p>
        <p className={css.text}>
        New user?{' '}
        <NavLink to="/register" className={css.link}>
          Register here
        </NavLink>
        </p>
        </>
        )}


        </div>
    )
}