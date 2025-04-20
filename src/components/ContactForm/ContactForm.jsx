import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';


const UserSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[^0-9]*$/, 'Name should not contain numbers')
    .min(3, 'Must be min 3 chars')
    .max(50, 'Must be max of 50 chars')
    .required('This field is required'),
  number: Yup.string()
    .matches(/^[\d\-\+\(\)0-9]{10,15}$/, 'Invalid phone number')
    .required('This field is required'),
});

export default function ContactForm() {
  const userId = nanoid();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addContact(values));
  }
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
      validationSchema={UserSchema}
    >
      <Form className={css.form}>
        <div className={css.fieldGroup}>
          <label htmlFor={`${userId}-name`}>Name:</label>
          <Field 
          id={`${userId}-name`} 
          type="text" name="name" 
          className={css.input} 
          />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor={`${userId}-number`}>Number:</label>
          <Field 
          id={`${userId}-number`} 
          type="text" name="number" 
          className={css.input} 
          />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>

        <button type="submit" className={css.button}>Submit</button>
      </Form>
    </Formik>
  );
}
