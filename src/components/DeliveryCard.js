import React from 'react';
import { TruckIcon, UserIcon, CheckIcon, XIcon, TrashIcon } from '../assets/icons';

function DeliveryCard({ delivery, onUpdateStatus, onDelete, requestConfirmation }) {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Em Rota': return 'status-em-rota';
            case 'Pendente': return 'status-pendente';
            case 'Finalizada': return 'status-finalizada';
            case 'Cancelada': return 'status-cancelada';
            default: return 'status-default';
        }
    };

    return (
        <div className={`delivery-card ${getStatusClass(delivery.status)}`}>
            <div className="card-content">
                <div className="card-info">
                    <p className="client-name">{delivery.clientName}</p>
                    <p className="item-info">Item: {delivery.itemType} (Qtd: {delivery.itemQuantity})</p>
                    <div className="driver-info">
                        <span><UserIcon /> {delivery.driver}</span>
                        <span><TruckIcon /> {delivery.vehicle}</span>
                    </div>
                </div>
                <div className="card-actions">
                    <span className={`status-badge ${getStatusClass(delivery.status)}`}>{delivery.status}</span>
                    <div className="action-buttons">
                        {delivery.status === 'Pendente' && (
                            <>
                                <button onClick={() => onUpdateStatus(delivery.id, 'Em Rota')} className="icon-button btn-start-route" title="Iniciar Rota"><TruckIcon /></button>
                                <button onClick={() => requestConfirmation('Tem certeza que deseja cancelar este pedido?', () => onUpdateStatus(delivery.id, 'Cancelada'), 'danger')} className="icon-button btn-warning" title="Cancelar Pedido"><XIcon /></button>
                            </>
                        )}
                        {delivery.status === 'Em Rota' && (
                            <>
                                <button onClick={() => requestConfirmation('Tem certeza que deseja finalizar este pedido?', () => onUpdateStatus(delivery.id, 'Finalizada'), 'success')} className="icon-button btn-success" title="Marcar como Finalizada"><CheckIcon /></button>
                                <button onClick={() => requestConfirmation('Tem certeza que deseja cancelar este pedido?', () => onUpdateStatus(delivery.id, 'Cancelada'), 'danger')} className="icon-button btn-warning" title="Cancelar Pedido"><XIcon /></button>
                            </>
                        )}
                        <button onClick={() => requestConfirmation('Tem certeza que deseja remover esta entrega da lista ativa?', () => onDelete(delivery.id), 'danger')} className="icon-button btn-danger" title="Remover da Lista"><TrashIcon /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryCard;