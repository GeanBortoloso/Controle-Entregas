import React, { useMemo } from 'react';
import { ArrowLeftIcon, ExportIcon } from '../assets/icons';
import FilterDropdown from '../components/FilterDropdown';
import { TruckIcon, UserIcon } from '../assets/icons';

function SecretArchive({ archive, onBack, filterDate, setFilterDate, statusFilters, setStatusFilters, clientNameFilter, setClientNameFilter }) {
    const filteredArchive = useMemo(() => {
        return archive.filter(d => {
            const isDateMatch = !filterDate || d.createdAt.split('T')[0] === filterDate;
            const isStatusMatch = statusFilters[d.status];
            const isClientMatch = !clientNameFilter || d.clientName.toLowerCase().includes(clientNameFilter.toLowerCase());
            return isDateMatch && isStatusMatch && isClientMatch;
        });
    }, [archive, filterDate, statusFilters, clientNameFilter]);

    const handleExportCSV = () => {
        if (!filteredArchive.length) {
            alert("Não há dados para exportar com os filtros atuais.");
            return;
        }

        const headers = [
            "Cliente", "Status", "Entregador", "Veículo", "Item", "Quantidade", 
            "Data de Criação", "Início da Rota", "Fim da Rota", "Tempo Total de Rota"
        ];

        const escapeCSV = (value) => `"${String(value).replace(/"/g, '""')}"`;

        const csvRows = [
            headers.join(';'),
            ...filteredArchive.map(row => {
                const values = [
                    escapeCSV(row.clientName),
                    escapeCSV(row.status),
                    escapeCSV(row.driver),
                    escapeCSV(row.vehicle),
                    escapeCSV(row.itemType),
                    row.itemQuantity,
                    escapeCSV(new Date(row.createdAt).toLocaleString('pt-BR')),
                    escapeCSV(row.startTime ? new Date(row.startTime).toLocaleString('pt-BR') : 'N/A'),
                    escapeCSV(row.endTime ? new Date(row.endTime).toLocaleString('pt-BR') : 'N/A'),
                    escapeCSV(row.totalTime || 'N/A')
                ];
                return values.join(';');
            })
        ];

        const csvString = "\uFEFF" + csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'arquivo_entregas.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <header className="list-header">
                <button onClick={onBack} className="back-button"><ArrowLeftIcon /></button>
                <h1>Arquivo de Entregas</h1>
                <button onClick={handleExportCSV} className="icon-button export-button" title="Exportar para CSV"><ExportIcon /></button>
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
                {filteredArchive.length > 0 ? filteredArchive.map(d => (
                    <div key={d.id} className={`delivery-card status-${d.status.toLowerCase()}`}>
                        <div className="card-content">
                            <div className="card-info">
                                <p className="client-name">{d.clientName}</p>
                                <p className="item-info">Item: {d.itemType} (Qtd: {d.itemQuantity})</p>
                                <div className="driver-info">
                                    <span><UserIcon /> {d.driver}</span>
                                    <span><TruckIcon /> {d.vehicle}</span>
                                </div>
                                <div className="item-info" style={{marginTop: '1rem', fontSize: '0.8rem'}}>
                                    <p><strong>Criado em:</strong> {new Date(d.createdAt).toLocaleString()}</p>
                                    <p><strong>Início da Rota:</strong> {d.startTime ? new Date(d.startTime).toLocaleString() : 'N/A'}</p>
                                    <p><strong>Fim da Rota:</strong> {d.endTime ? new Date(d.endTime).toLocaleString() : 'N/A'}</p>
                                    <p><strong>Tempo Total de Rota:</strong> {d.totalTime || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="card-actions">
                                <span className={`status-badge status-${d.status.toLowerCase()}`}>{d.status}</span>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="empty-state">
                        <h3>Nenhuma entrega encontrada para os filtros selecionados.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SecretArchive;