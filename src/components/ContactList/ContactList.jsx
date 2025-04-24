import Contact from "../Contact/Contact";
import css from './ContactList.module.css';

import { selectIsLoading, selectVisibleContacts, selectIsError } from '../../redux/contacts/selectors'
import { useSelector } from "react-redux";


export default function ContactList() {

  const filteredContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  return (
    <>
    {isError && <b>Please reload this page!</b>}
    {isLoading ? (<b>Loading!</b>) : 
    (<ul className={css.list}>
      {filteredContacts.map((contact) => (
        <li key={contact.id} className={css.listItem}>
          <Contact contact={contact}/>
        </li>
      ))}
    </ul>)}
    </>
  );
}