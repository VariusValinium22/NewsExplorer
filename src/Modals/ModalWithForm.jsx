import "./ModalWithForm.css";
import close from "../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  toggleModal,
  toggleText,
  isSubmitDisabled,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      {isOpen && (
        <div className="modal__mobile">
          <span className="modal__mobile-title">NewsExplorer</span>
          <button onClick={onClose} type="button" className="modal__close">
            <img src={close} alt="close" className="modal__image" />
          </button>
        </div>
      )}
      <div className="modal__content">
        <div className="modal__container">
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button onClick={onClose} type="button" className="modal__close modal__close-desktop">
              <img src={close} alt="close" className="modal__image" />
            </button>
          </div>
          <form className="modal__form" onSubmit={onSubmit}>
            {children}
            <div className="modal__submit_container">
              <button type="submit" className={`modal__submit${isSubmitDisabled ? " modal__submit_disabled" : ""}`}
              disabled={isSubmitDisabled}
              >
                {buttonText}
              </button>
              {toggleModal && (
                <div className="modal__toggle-wrapper">
                  <span className="modal_or">or</span>
                  <button
                    type="button"
                    className="modal__toggle"
                    onClick={toggleModal}
                  >
                    {toggleText}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
