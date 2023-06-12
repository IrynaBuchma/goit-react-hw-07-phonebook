import {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { selectContacts } from 'redux/selectors';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { addContact } from 'redux/operations';

export default function ContactForm() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();

    const onAddContact = (name, phone) => dispatch(addContact(name, phone));

    const handleSubmit = e => {
        e.preventDefault();

        const isAdded = name => 
        contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
        
        if(isAdded(name)) {
            return alert(`${name} is already in contacts`);
        } else {
            onAddContact(name, phone);
        }

        setName(''); 
        setPhone('');
    }

        return (
          <>
            <form className={css.form} onSubmit={e => handleSubmit(e)} autoComplete="off">
                <label className={css.label} id="name" htmlFor="name">Name
                  <input className={css.input}
                    type="text"
                    name="name"
                    value={name}
                    id="name"
                    onChange={e => setName(e.target.value)}
                    // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    // required
                  />
                </label>
                <label className={css.label} id="phone" htmlFor="phone">phone
                    <input className={css.input}
                        type="tel"
                        name="phone"
                        value={phone}
                        id="phone"
                        onChange={e => setPhone(e.target.value)}
                        // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        // title="Phone phone must be digits and can contain spaces, dashes, parentheses and can start with +"
                        // required
                    />
                </label>
              <button type="submit" disabled={!(name && phone)}>Add contact</button>
            </form>
          </>
        );
      }

ContactForm.propTyps = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAddContact: PropTypes.func.isRequired, 
}