import {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { selectContacts } from 'redux/selectors';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { addContact } from 'redux/operations';

export default function ContactForm() {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();

    const onAddContact = (name, number) => dispatch(addContact(name, number));

    const handleSubmit = e => {
        e.preventDefault();

        const isAdded = name => 
        contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
        
        if(isAdded(name)) {
            return alert(`${name} is already in contacts`);
        } else {
            onAddContact(name, number);
        }

        setName(''); 
        setNumber('');
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
                    required
                  />
                </label>
                <label className={css.label} id="number" htmlFor="number">Number
                    <input className={css.input}
                        type="tel"
                        name="number"
                        value={number}
                        id="number"
                        onChange={e => setNumber(e.target.value)}
                        // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
              <button type="submit" disabled={!(name && number)}>Add contact</button>
            </form>
          </>
        );
      }

ContactForm.propTyps = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAddContact: PropTypes.func.isRequired, 
}