import React from 'react';

function ConfirmationModal({ isOpen, message, onConfirm, onCancel, confirmType }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="btn-secondary">Cancelar</button>
                    <button onClick={onConfirm} className={`btn-confirm btn-confirm-${confirmType}`}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;