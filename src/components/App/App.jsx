import ContactForm from '../ContactForm/ContactForm'
import SearchBox from '../SearchBox/SearchBox'
import ContactList from '../ContactList/ContactList'
import css from './App.module.css';

import { useEffect } from "react";
import { fetchContacts } from "../../redux/contactsOps";
import { useDispatch } from "react-redux";

export default function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchContacts());
  },[dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm  />
      <SearchBox  />
      <ContactList />
    </div>
  );
}
