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
        {title && <h3>{title}</h3>}
        <p>{message}</p>
        <div className="delete-modal__actions">
          <button onClick={onRequestClose} disabled={loading}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}>
            Yes, Delete
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
