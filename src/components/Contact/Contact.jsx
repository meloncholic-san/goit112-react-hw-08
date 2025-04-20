import css from './Contact.module.css';


import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ contact: { id, name, number }}) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.contact}>
      <div>
        <p className={css.name}>Name: {name}</p>
        <p className={css.phone}>Phone: {number}</p>
      </div>
      <button className={css.button} onClick={handleDelete}>Delete</button>
    </div>
  );
}
