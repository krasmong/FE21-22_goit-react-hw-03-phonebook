import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './Components/ContactForm/ContactForm';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/ContactList/ContactList';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const getContacts = localStorage.getItem('contacts');
    console.log(getContacts);

    const parsedContacts = JSON.parse(getContacts);
    console.log(parsedContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле contacts, записываю contacts в хранилище ');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    // console.log(data);

    const myContacts = {
      id: uuidv4(),
      name: data.name,
      number: data.number,
    };

    const getContacts = this.state.contacts.map(contact =>
      contact.name.toLocaleLowerCase(),
    );

    const isGetContactAlready = getContacts.includes(
      data.name.toLocaleLowerCase(),
    );

    if (isGetContactAlready) {
      alert(`${data.name} is already in contacts!`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [myContacts, ...prevState.contacts],
        };
      });
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChangeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  filterContactsByName = () => {
    return this.state.contacts.filter(contact =>
      contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase()),
    );
  };

  render() {
    const contacts = this.filterContactsByName();
    return (
      <>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm OnSaveContacts={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          OnFilterContacts={this.handleChangeFilter}
        />
        <ContactList contacts={contacts} onDeleteContact={this.deleteContact} />
      </>
    );
  }
}

export default App;
