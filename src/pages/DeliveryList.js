import React, { useMemo } from 'react';
import DeliveryCard from '../components/DeliveryCard';
import FilterDropdown from '../components/FilterDropdown';
import { ArchiveIcon, PlusIcon } from '../assets/icons';

function DeliveryList({ deliveries, onAdd, onUpdateStatus, onDelete, requestConfirmation, onShowArchive, filterDate, setFilterDate, statusFilters, setStatusFilters, clientNameFilter, setClientNameFilter }) {
    const filteredDeliveries = useMemo(() => {
        return deliveries.filter(d => {
            const isDateMatch = !filterDate || d.createdAt.split('T')[0] === filterDate;
            const isStatusMatch = statusFilters[d.status];
            const isClientMatch = !clientNameFilter || d.clientName.toLowerCase().includes(clientNameFilter.toLowerCase());
            return isDateMatch && isStatusMatch && isClientMatch;
        });
    }, [deliveries, filterDate, statusFilters, clientNameFilter]);

    const sortedDeliveries = useMemo(() => {
        return [...filteredDeliveries].sort((a, b) => {
            const statusOrder = { 'Em Rota': 1, 'Pendente': 2, 'Finalizada': 3, 'Cancelada': 4 };
            return (statusOrder[a.status] - statusOrder[b.status]) || (new Date(b.createdAt) - new Date(a.createdAt));
        });
    }, [filteredDeliveries]);

    return (
        <div>
            <header className="list-header">
                <h1>Controle de Entregas</h1>
                <div className="header-controls">
                    <button onClick={onShowArchive} className="icon-button" title="Arquivo Secreto"><ArchiveIcon /></button>
                </div>
            </header>
             <div className="filters-container">
                 <div className="filter-group">
                    <label>Filtrar por Data</label>
                    <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="date-filter"/>
                </div>
                 <div className="filter-group">
                    <label>Filtrar por Status</label>
                    <FilterDropdown title="Status" options={{'Pendente': true, 'Em Rota': true, 'Finalizada': true, 'Cancelada': true}} selectedOptions={statusFilters} onSelectionChange={setStatusFilters} />
                </div>
                <div className="filter-group">
                    <label>Filtrar por Cliente</label>
                    <input type="text" value={clientNameFilter} onChange={(e) => setClientNameFilter(e.target.value)} placeholder="Nome do cliente..." className="text-filter" />
                </div>
            </div>
            <div className="deliveries-list">
                {sortedDeliveries.length > 0 ? sortedDeliveries.map(d => (
                    <DeliveryCard 
                        key={d.id} 
                        delivery={d} 
                        onUpdateStatus={onUpdateStatus} 
                        onDelete={onDelete} 
                        requestConfirmation={requestConfirmation}
                    />
                )) : (
                    <div className="empty-state">
                        <h3>Nenhuma entrega encontrada para os filtros selecionados.</h3>
                        <p>Clique no botão '+' para adicionar uma nova entrega.</p>
                    </div>
                )}
            </div>
            <button onClick={onAdd} className="add-button"><PlusIcon /></button>
        </div>
    );
}

export default DeliveryList;