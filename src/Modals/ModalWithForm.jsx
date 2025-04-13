import "./ModalWithForm.css";
import close from "../assets/close.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  toggleModal,
  toggleText,

}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <div className="modal__container">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button onClick={onClose} type="button" className="modal__close">
            <img src={close} alt="close" className="modal__image" />
          </button>
        </div>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__submit_container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {toggleModal && (
                <button
                  type="button"
                  className="modal__toggle"
                  onClick={toggleModal}
                >
                  {toggleText}
                </button>
              )}
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
