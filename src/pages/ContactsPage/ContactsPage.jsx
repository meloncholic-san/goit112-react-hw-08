import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "../ContactsPage/ContactsPage.module.css"
import { fetchContacts } from "../../redux/contacts/operations";


export default function ContactsPage () {

    
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchContacts());
    },[dispatch]);

    return (
        <div className={css.container}>
        <ContactForm  />
        <SearchBox  />
        <ContactList />
        </div>
    )
}