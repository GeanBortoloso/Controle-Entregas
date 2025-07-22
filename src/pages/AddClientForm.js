import React, { useState } from 'react';
import { ArrowLeftIcon, Spinner } from '../assets/icons';

function AddClientForm({ onSave, onBack, routeNumber, totalRoutes }) {
    const [clientName, setClientName] = useState('');
    const [itemTypes, setItemTypes] = useState({ pecas: false, baterias: false });
    const [itemQuantity, setItemQuantity] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

    const handleItemTypeToggle = (itemName) => {
        setItemTypes(prev => ({ ...prev, [itemName]: !prev[itemName] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedItems = Object.entries(itemTypes)
            .filter(([, isSelected]) => isSelected)
            .map(([itemName]) => itemName.charAt(0).toUpperCase() + itemName.slice(1))
            .join(', ');

        if (clientName && selectedItems && itemQuantity > 0) {
            setIsSaving(true);
            setTimeout(() => {
                onSave({ clientName, itemType: selectedItems, itemQuantity: parseInt(itemQuantity) });
                if (routeNumber < totalRoutes) {
                    setClientName('');
                    setItemTypes({ pecas: false, baterias: false });
                    setItemQuantity(1);
                }
                setIsSaving(false);
            }, 300);
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <button onClick={onBack} className="back-button"><ArrowLeftIcon /></button>
                <h2>Dados da Rota ({routeNumber}/{totalRoutes})</h2>
            </div>
            <form onSubmit={handleSubmit} className="form-body">
                <div className="form-group">
                    <label htmlFor="clientName">Nome do Cliente</label>
                    <input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Tipo de Item</label>
                    <div className="item-type-toggle">
                        <button type="button" onClick={() => handleItemTypeToggle('pecas')} className={itemTypes.pecas ? 'active' : ''}>
                            Peças
                        </button>
                        <button type="button" onClick={() => handleItemTypeToggle('baterias')} className={itemTypes.baterias ? 'active' : ''}>
                            Baterias
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="itemQuantity">Quantidade</label>
                    <input type="number" id="itemQuantity" value={itemQuantity} onChange={e => setItemQuantity(e.target.value)} min="1" required />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onBack} className="btn-secondary">Cancelar Leva</button>
                    <button type="submit" disabled={isSaving} className="btn-primary">
                        {isSaving ? <Spinner /> : (routeNumber < totalRoutes ? 'Salvar e Próxima Rota' : 'Salvar e Finalizar')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddClientForm;