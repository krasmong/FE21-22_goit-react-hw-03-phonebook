import React from 'react';
import PropTypes from 'prop-types';
import s from '../Filter/Filter.module.css';

const Filter = ({ value, OnFilterContacts }) => (
  <>
    <label>
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={OnFilterContacts}
        placeholder=" Fined contacts by name"
      />
    </label>
  </>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  OnFilterContacts: PropTypes.func.isRequired,
};

export default Filter;
