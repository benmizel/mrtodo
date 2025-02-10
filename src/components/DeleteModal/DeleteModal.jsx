import ReactModal from "react-modal";
import "./DeleteModal.scss";

const DeleteModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  message,
  loading,
  title,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title || "Delete Confirmation"}
      className="delete-modal"
      overlayClassName="delete-modal-overlay"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div className="delete-modal__content">
        {title && <h3 className="delete-modal__title">{title}</h3>}
        <p className="delete-modal__message">{message}</p>
        <div className="delete-modal__actions">
          <button
            className="delete-modal__cancel-button"
            onClick={onRequestClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="delete-modal__delete-button"
            onClick={onConfirm}
            disabled={loading}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
