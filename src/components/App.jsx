import Layout from './Layout/Layout';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';

const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Layout>
      <div className='section'>
        <h1>Phonebook</h1>
        <ContactForm/>
        {isLoading && !error && <b>Request in progress...</b>}
      </div>
      {contacts.length ? (
        <div className='section'>
          <h2>Contacts</h2>
          <Filter/>
          <ContactList/>
        </div>
      ) : null}
    </Layout>
  );
};

export default App;
