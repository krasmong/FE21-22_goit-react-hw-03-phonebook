import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import s from '../ContactForm/ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleSubmit = e => {
    e.preventDefault();

    this.props.OnSaveContacts(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className={s.container}>
        <form onSubmit={this.handleSubmit}>
          <label className={s.label} htmlFor={this.nameInputId}>
            Name
            <input
              className={s.input}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              id={this.nameInputId}
            />
          </label>
          <label className={s.label} htmlFor={this.numberInputId}>
            Number
            <input
              className={s.input}
              type="text"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              id={this.numberInputId}
            />
          </label>

          <button className={s.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactForm;
