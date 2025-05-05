// src/components/Modals/RegisterModal.jsx
import { useState } from 'react';
import ModalWithForm from './ModalWithForm.jsx';
import { useModal } from '../contexts/ModalContext.jsx';

const RegisterModal = ({ onRegister, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const { activeModal, openModal, closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password || !name) {
      setErrorMessage('All fields are required.');
      return;
    }

    onRegister(email, password, name);
    // comment out to simulate Registration
    /*       .then(() => setErrorMessage(""))
      .catch((error) => {
        console.error("Registration Error: ", error);
        setErrorMessage("Registration failed. Please try again.");
      }); */
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (!value.includes('@')) {
      setEmailError('Invalid email address.');
    } else {
      setEmailError('');
    }
  };

  const isFormValid = email.includes('@') && password.length >= 4 && name.length > 0;

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? 'Signing up...' : 'Sign up'}
      isOpen={activeModal === 'register'}
      onClose={closeModal}
      onSubmit={handleSubmit}
      toggleModal={() => openModal('login')}
      toggleText="Sign in"
      isSubmitDisabled={!isFormValid || isLoading}
      onChange={handleEmailChange}
    >
      <label htmlFor="register-email" className="modal__label">
        Email *{' '}
        <input
          type="email"
          id="register-email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={isLoading}
          required
        />
        {emailError && <span className="modal__error">{emailError}</span>}
      </label>
      <label htmlFor="register-password" className="modal__label">
        {errorMessage ? (
          <p className="modal__error">{errorMessage}</p>
        ) : (
          <p>Password *</p>
        )}
        <input
          type="password"
          id="register-password"
          className={`modal__input ${errorMessage && 'modal__input_error'}`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name *{' '}
        <input
          type="text"
          id="register-name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          disabled={isLoading}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
