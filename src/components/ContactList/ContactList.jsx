import Contact from "../Contact/Contact";
import css from './ContactList.module.css';

import { selectVisibleContacts } from '../../redux/contactsSlice'
import { useSelector } from "react-redux";


export default function ContactList() {

  const filteredContacts = useSelector(selectVisibleContacts);

  return (
    <ul className={css.list}>
      {filteredContacts.map((contact) => (
        <li key={contact.id} className={css.listItem}>
          <Contact contact={contact}/>
        </li>
      ))}
    </ul>
  );
}