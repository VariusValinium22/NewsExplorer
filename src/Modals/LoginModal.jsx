// src/components/Modals/LoginModal.jsx
import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { useModal } from "../contexts/ModalContext";

const LoginModal = ({
  /* closeModal,
  isOpen,
  setActiveModal, */
  onLogin,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { activeModal, openModal, closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");
    setErrorMessage("");
    onLogin(email, password);
    // comment out to simulate Registration
    /*.catch(() =>
      setErrorMessage("Incorrect email or password")
    ); */
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText={isLoading ? "Signing in..." : "Sign in"}
      /* isOpen={isOpen} */
      isOpen={activeModal === "login"}
      onClose={closeModal}
      onSubmit={handleSubmit}
      /* toggleModal={() => setActiveModal("register")} */
      toggleModal={() => openModal("register")}
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
