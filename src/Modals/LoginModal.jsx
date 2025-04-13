// src/components/Modals/LoginModal.jsx
import { useState } from "react";
import ModalWithForm from "./ModalWithForm";

const LoginModal = ({
  closeActiveModal,
  isOpen,
  onLogin,
  setActiveModal,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    onLogin(email, password).catch(() =>
      setErrorMessage("Incorrect email or password")
    );
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText={isLoading ? "Signing in..." : "Sign in"}
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      toggleModal={() => setActiveModal("register")}
      toggleText="or Sign up"
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          id="login-email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        {errorMessage ? (
          <p className="modal__error">{errorMessage}</p>
        ) : (
          <p>Password</p>
        )}
        <input
          type="password"
          id="login-password"
          className={`modal__input ${errorMessage && "modal__input_error"}`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
