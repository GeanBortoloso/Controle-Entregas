import React from 'react';

function PasswordModal({ isOpen, onClose, onSubmit, password, setPassword }) {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Acesso Restrito</h3>
                <p>Por favor, digite a senha para acessar o arquivo.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="password-input"
                            autoFocus
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                        <button type="submit" className="btn-primary">Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PasswordModal;