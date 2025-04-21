import css from './Contact.module.css';
import DeleteContactModal from '../DeleteContactModal/DeleteContactModal';

import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contactsOps';
import { useEffect, useState } from 'react';

export default function Contact({ contact: { id, name, number }}) {

  const [isModalOpen, SetisModalOpen] = useState(false);
  const dispatch = useDispatch();
  
  const handleDeleteButton = () => {
    SetisModalOpen(true);
  };

  const handleDelete = (id) => {
    SetisModalOpen(false)
    dispatch(deleteContact(id));
  };

  const handleCandel = () => {
    SetisModalOpen(false)
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isModalOpen) return;
      if (event.key === 'Escape') {
        SetisModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className={css.contact}>
      <div>
        <p className={css.name}>Name: {name}</p>
        <p className={css.phone}>Phone: {number}</p>
      </div>
      <button className={css.button} onClick={handleDeleteButton}>Delete</button>
      {isModalOpen && <DeleteContactModal 
      message = {<> Are you sure you want to delete <strong>{name}</strong>?</>} 
      onConfirm={() => handleDelete(id)} 
      onCancel = {handleCandel}/>}
    </div>
  );
}
