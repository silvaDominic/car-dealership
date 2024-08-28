import React, { useState } from 'react';
import './Register.css';

const FORM_FIELDS_REGISTER = {
  USERNAME: 'username',
  PASSWORD: 'password',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
}

export function Register() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  function updateForm(e) {
    const fieldName = e.target.name;
    const newValue = e.target.value;
    switch (fieldName) {
      case FORM_FIELDS_REGISTER.USERNAME:
        setUserName(newValue);
        break;
      case FORM_FIELDS_REGISTER.PASSWORD:
        setPassword(newValue);
        break;
      case FORM_FIELDS_REGISTER.FIRST_NAME:
        setFirstName(newValue);
        break;
      case FORM_FIELDS_REGISTER.LAST_NAME:
        setLastName(newValue);
        break;
      case FORM_FIELDS_REGISTER.EMAIL:
        setEmail(newValue);
        break;
    }
  }

   async function onSubmit(e) {
    e.preventDefault();

    // Configure request
    let registerURL = `${window.location.origin}/djangoapp/register`;
    const payload = JSON.stringify({
      userName: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    // Make registration request
    const res = await fetch(registerURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: payload,
    });

    // Add session data to session storage if successful
    // Otherwise, display an error
    const data = await res.json();
    if (data.status) {
      sessionStorage.setItem('username', data.userName);
      alert('User successfully registered! Redirecting to Homepage...')
      window.location.href = window.location.origin;
    } else if (data.error === 'Already Registered.') {
      alert('A user with the same username already exists! Try again');
    }
  }

  return (
    <div className='register_container'>
      <form id="" onSubmit={ onSubmit }>
        <div className='input_field'>
          <label htmlFor="username-field">Username</label>
          <input id='username-field' className='input' name={ FORM_FIELDS_REGISTER.USERNAME } type="text" required
                 onChange={ updateForm }/>
        </div>

        <div className='input_field'>
          <label htmlFor="password-field">Password</label>
          <input id='password-field' className='input' name={ FORM_FIELDS_REGISTER.PASSWORD } type="password" required onChange={ updateForm }/>
        </div>

        <div className='input_field'>
          <label htmlFor="firstName-field">First Name</label>
          <input id='firstName-field' className='input' name={ FORM_FIELDS_REGISTER.FIRST_NAME } type="text" required onChange={ updateForm }/>
        </div>

        <div className='input_field'>
          <label htmlFor="lastName-field">Last Name</label>
          <input id='lastName-field' className='input' name={ FORM_FIELDS_REGISTER.LAST_NAME } type="text" required onChange={ updateForm }/>
        </div>

        <div className='input_field'>
          <label htmlFor="email-field">Email</label>
          <input id='email-field' className='input' name={ FORM_FIELDS_REGISTER.EMAIL } type="email" required onChange={ updateForm }/>
        </div>

        <div className='submit_panel'>
          <button className='submit'>Register</button>
        </div>
      </form>
    </div>
  );
}
