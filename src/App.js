<<<<<<< HEAD
import React, { useState, useMemo, useEffect, useRef } from 'react';
import './App.css'; // Importa os nossos novos estilos

// --- Função para gerar ID único (compatível com todos os navegadores) ---
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

=======
import React, { useState, useMemo } from 'react';
import './App.css'; // Importa os nossos novos estilos

>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
// --- Componentes de Ícones ---
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17H6v-6l7-4v6h5v6h-4z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 17H4a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
<<<<<<< HEAD
const ArchiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
=======
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const Spinner = () => <div className="spinner"></div>;

// --- Componente do Cabeçalho ---
function Header() {
    return (
        <header className="app-header">
            <img src="/logo.png" alt="Central Peças e Baterias Logo" className="app-logo" />
        </header>
    );
}

// --- Componente Principal ---
export default function App() {
    const [view, setView] = useState('list');
    const [deliveries, setDeliveries] = useState([]);
<<<<<<< HEAD
    const [archive, setArchive] = useState([]);
=======
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
    const [newDeliveryInfo, setNewDeliveryInfo] = useState(null);
    const [totalRoutes, setTotalRoutes] = useState(0);
    const [currentRouteNumber, setCurrentRouteNumber] = useState(1);
    const [modalState, setModalState] = useState({ isOpen: false, message: '', action: null, confirmType: 'danger' });
<<<<<<< HEAD
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [showArchive, setShowArchive] = useState(false);
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
    const [statusFilters, setStatusFilters] = useState({
        'Pendente': true,
        'Em Rota': true,
        'Finalizada': true,
        'Cancelada': true,
    });
    const password = "1234"; // Senha para o arquivo secreto

    const handleStartNewDelivery = (deliveryData) => {
        setNewDeliveryInfo({ ...deliveryData, batchId: generateUniqueId() });
=======

    const handleStartNewDelivery = (deliveryData) => {
        setNewDeliveryInfo({ ...deliveryData, batchId: crypto.randomUUID() });
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
        setTotalRoutes(deliveryData.routeCount);
        setCurrentRouteNumber(1);
        setView('addClient');
    };

    const handleSaveClientRoute = (clientData) => {
        const finalDeliveryData = {
<<<<<<< HEAD
            id: generateUniqueId(),
=======
            id: crypto.randomUUID(),
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
            ...newDeliveryInfo,
            ...clientData,
            createdAt: new Date().toISOString(),
            status: newDeliveryInfo.status,
<<<<<<< HEAD
            startTime: newDeliveryInfo.status === 'Em Rota' ? new Date().toISOString() : null,
            endTime: null,
            totalTime: null,
        };
        // Adiciona em ambas as listas: ativa e arquivada
        setDeliveries(prev => [...prev, finalDeliveryData]);
        setArchive(prev => [...prev, finalDeliveryData]);

=======
        };
        setDeliveries(prev => [...prev, finalDeliveryData]);
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
        if (currentRouteNumber < totalRoutes) {
            setCurrentRouteNumber(prev => prev + 1);
        } else {
            setView('list');
            setNewDeliveryInfo(null);
            setTotalRoutes(0);
            setCurrentRouteNumber(1);
        }
    };

    const handleUpdateStatus = (id, newStatus) => {
<<<<<<< HEAD
        let updatedDelivery = null;
        const newDeliveries = deliveries.map(d => {
            if (d.id === id) {
                updatedDelivery = { ...d, status: newStatus };
                if (newStatus === 'Em Rota' && !d.startTime) {
                    updatedDelivery.startTime = new Date().toISOString();
                }
                if (newStatus === 'Finalizada' || newStatus === 'Cancelada') {
                    updatedDelivery.endTime = new Date().toISOString();
                    if (updatedDelivery.startTime) {
                        const start = new Date(updatedDelivery.startTime);
                        const end = new Date(updatedDelivery.endTime);
                        const diffMs = end - start;
                        const diffMins = Math.round(diffMs / 60000);
                        updatedDelivery.totalTime = `${diffMins} minutos`;
                    }
                }
                return updatedDelivery;
            }
            return d;
        });

        setDeliveries(newDeliveries);

        if (updatedDelivery) {
            const newArchive = archive.map(d => d.id === id ? updatedDelivery : d);
            setArchive(newArchive);
        }
    };

    const handleDelete = (id) => {
        // Apenas remove da lista de entregas ativas, mantém no arquivo
=======
        setDeliveries(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    };

    const handleDelete = (id) => {
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
        setDeliveries(prev => prev.filter(d => d.id !== id));
    };

    const goBack = () => {
        setView('list');
<<<<<<< HEAD
        setShowArchive(false);
=======
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
        setNewDeliveryInfo(null);
        setTotalRoutes(0);
        setCurrentRouteNumber(1);
    };

<<<<<<< HEAD
    const handleShowArchive = () => {
        setPasswordModalOpen(true);
    };
    
    const handlePasswordSubmit = () => {
        if (passwordInput === password) {
            setPasswordModalOpen(false);
            setPasswordInput('');
            setShowArchive(true);
            setView('archive');
        } else {
            alert("Senha incorreta!");
            setPasswordInput('');
        }
    };

=======
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
    const requestConfirmation = (message, action, confirmType = 'danger') => {
        setModalState({ isOpen: true, message, action, confirmType });
    };

    const handleModalConfirm = () => {
        if (modalState.action) {
            modalState.action();
        }
        setModalState({ isOpen: false, message: '', action: null, confirmType: 'danger' });
    };

    const handleModalCancel = () => {
        setModalState({ isOpen: false, message: '', action: null, confirmType: 'danger' });
    };

    const renderView = () => {
<<<<<<< HEAD
        if (showArchive) {
            return <SecretArchive archive={archive} onBack={goBack} filterDate={filterDate} setFilterDate={setFilterDate} statusFilters={statusFilters} setStatusFilters={setStatusFilters} />;
        }
=======
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
        switch (view) {
            case 'addDelivery':
                return <AddDeliveryForm onSave={handleStartNewDelivery} onBack={goBack} />;
            case 'addClient':
                return <AddClientForm onSave={handleSaveClientRoute} onBack={goBack} routeNumber={currentRouteNumber} totalRoutes={totalRoutes} />;
            default:
<<<<<<< HEAD
                return <DeliveryList deliveries={deliveries} onAdd={() => setView('addDelivery')} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} requestConfirmation={requestConfirmation} onShowArchive={handleShowArchive} filterDate={filterDate} setFilterDate={setFilterDate} statusFilters={statusFilters} setStatusFilters={setStatusFilters} />;
=======
                return <DeliveryList deliveries={deliveries} onAdd={() => setView('addDelivery')} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} requestConfirmation={requestConfirmation} />;
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
        }
    };

    return (
        <>
            <Header />
            <main className="app-container">
                {renderView()}
                <ConfirmationModal
                    isOpen={modalState.isOpen}
                    message={modalState.message}
                    onConfirm={handleModalConfirm}
                    onCancel={handleModalCancel}
                    confirmType={modalState.confirmType}
                />
<<<<<<< HEAD
                <PasswordModal
                    isOpen={passwordModalOpen}
                    onClose={() => {
                        setPasswordModalOpen(false);
                        setPasswordInput('');
                    }}
                    onSubmit={handlePasswordSubmit}
                    password={passwordInput}
                    setPassword={setPasswordInput}
                />
=======
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
            </main>
        </>
    );
}

<<<<<<< HEAD
// --- Componente do Modal de Senha ---
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


// --- Componente do Dropdown de Filtro ---
function FilterDropdown({ title, options, selectedOptions, onSelectionChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleOptionChange = (option) => {
        onSelectionChange({ ...selectedOptions, [option]: !selectedOptions[option] });
    };

    const handleSelectAll = () => {
        const allSelected = Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: true }), {});
        onSelectionChange(allSelected);
    };

    const handleClear = () => {
        const allCleared = Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: false }), {});
        onSelectionChange(allCleared);
    };

    const selectedCount = Object.values(selectedOptions).filter(Boolean).length;
    const buttonText = selectedCount === 0 ? `Nenhum ${title}` : `${selectedCount} ${title}(s) selecionado(s)`;

    return (
        <div className="filter-dropdown" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="filter-button">
                {buttonText}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-actions">
                        <button onClick={handleSelectAll}>Selecionar Todos</button>
                        <button onClick={handleClear}>Limpar</button>
                    </div>
                    {Object.keys(options).map(option => (
                        <label key={option} className="dropdown-item">
                            <input
                                type="checkbox"
                                checked={selectedOptions[option]}
                                onChange={() => handleOptionChange(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

// --- Componente do Arquivo Secreto ---
function SecretArchive({ archive, onBack, filterDate, setFilterDate, statusFilters, setStatusFilters }) {
    const filteredArchive = useMemo(() => {
        return archive.filter(d => {
            const isDateMatch = !filterDate || d.createdAt.split('T')[0] === filterDate;
            const isStatusMatch = statusFilters[d.status];
            return isDateMatch && isStatusMatch;
        });
    }, [archive, filterDate, statusFilters]);

    return (
        <div>
            <header className="list-header">
                <button onClick={onBack} className="back-button"><ArrowLeftIcon /></button>
                <h1>Arquivo de Entregas</h1>
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

=======
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
// --- Componente do Pop-up de Confirmação ---
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


<<<<<<< HEAD
function DeliveryList({ deliveries, onAdd, onUpdateStatus, onDelete, requestConfirmation, onShowArchive, filterDate, setFilterDate, statusFilters, setStatusFilters }) {
    const filteredDeliveries = useMemo(() => {
        return deliveries.filter(d => {
            const isDateMatch = !filterDate || d.createdAt.split('T')[0] === filterDate;
            const isStatusMatch = statusFilters[d.status];
            return isDateMatch && isStatusMatch;
        });
    }, [deliveries, filterDate, statusFilters]);

    const sortedDeliveries = useMemo(() => {
        return [...filteredDeliveries].sort((a, b) => {
            const statusOrder = { 'Em Rota': 1, 'Pendente': 2, 'Finalizada': 3, 'Cancelada': 4 };
            return (statusOrder[a.status] - statusOrder[b.status]) || (new Date(b.createdAt) - new Date(a.createdAt));
        });
    }, [filteredDeliveries]);
=======
function DeliveryList({ deliveries, onAdd, onUpdateStatus, onDelete, requestConfirmation }) {
    const sortedDeliveries = useMemo(() => {
        return [...deliveries].sort((a, b) => {
            const statusOrder = { 'Em Rota': 1, 'Pendente': 2, 'Finalizada': 3, 'Cancelada': 4 };
            return (statusOrder[a.status] - statusOrder[b.status]) || (new Date(b.createdAt) - new Date(a.createdAt));
        });
    }, [deliveries]);
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7

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
        <div>
            <header className="list-header">
                <h1>Controle de Entregas</h1>
<<<<<<< HEAD
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
            </div>
=======
            </header>
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
            <div className="deliveries-list">
                {sortedDeliveries.length > 0 ? sortedDeliveries.map(d => (
                    <div key={d.id} className={`delivery-card ${getStatusClass(d.status)}`}>
                        <div className="card-content">
                            <div className="card-info">
                                <p className="client-name">{d.clientName}</p>
                                <p className="item-info">Item: {d.itemType} (Qtd: {d.itemQuantity})</p>
                                <div className="driver-info">
                                    <span><UserIcon /> {d.driver}</span>
                                    <span><TruckIcon /> {d.vehicle}</span>
                                </div>
                            </div>
                            <div className="card-actions">
                                <span className={`status-badge ${getStatusClass(d.status)}`}>{d.status}</span>
                                <div className="action-buttons">
                                    {d.status === 'Pendente' && (
                                        <>
                                            <button onClick={() => onUpdateStatus(d.id, 'Em Rota')} className="icon-button btn-start-route" title="Iniciar Rota"><TruckIcon /></button>
                                            <button onClick={() => requestConfirmation('Tem certeza que deseja cancelar este pedido?', () => onUpdateStatus(d.id, 'Cancelada'), 'danger')} className="icon-button btn-warning" title="Cancelar Pedido"><XIcon /></button>
                                        </>
                                    )}
                                    {d.status === 'Em Rota' && (
                                        <>
                                            <button onClick={() => requestConfirmation('Tem certeza que deseja finalizar este pedido?', () => onUpdateStatus(d.id, 'Finalizada'), 'success')} className="icon-button btn-success" title="Marcar como Finalizada"><CheckIcon /></button>
                                            <button onClick={() => requestConfirmation('Tem certeza que deseja cancelar este pedido?', () => onUpdateStatus(d.id, 'Cancelada'), 'danger')} className="icon-button btn-warning" title="Cancelar Pedido"><XIcon /></button>
                                        </>
                                    )}
<<<<<<< HEAD
                                    <button onClick={() => requestConfirmation('Tem certeza que deseja remover esta entrega da lista ativa?', () => onDelete(d.id), 'danger')} className="icon-button btn-danger" title="Remover da Lista"><TrashIcon /></button>
=======
                                    <button onClick={() => requestConfirmation('Tem certeza que deseja apagar esta entrega? Esta ação não pode ser desfeita.', () => onDelete(d.id), 'danger')} className="icon-button btn-danger" title="Apagar Entrega"><TrashIcon /></button>
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="empty-state">
<<<<<<< HEAD
                        <h3>Nenhuma entrega encontrada para os filtros selecionados.</h3>
                        <p>Clique no botão '+' para adicionar uma nova entrega.</p>
=======
                        <h3>Nenhuma entrega encontrada.</h3>
                        <p>Clique no botão '+' para adicionar a primeira!</p>
>>>>>>> fac3731b5969b2c5d5f931bb19d88985964592f7
                    </div>
                )}
            </div>
            <button onClick={onAdd} className="add-button"><PlusIcon /></button>
        </div>
    );
}

function AddDeliveryForm({ onSave, onBack }) {
    const [driver, setDriver] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [routeCount, setRouteCount] = useState(1);
    const [status, setStatus] = useState('Pendente');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (driver && vehicle && routeCount > 0) {
            onSave({ driver, vehicle, routeCount: parseInt(routeCount), status });
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <button onClick={onBack} className="back-button"><ArrowLeftIcon /></button>
                <h2>Adicionar Leva de Entregas</h2>
            </div>
            <form onSubmit={handleSubmit} className="form-body">
                <div className="form-group">
                    <label htmlFor="driver">Entregador</label>
                    <input type="text" id="driver" value={driver} onChange={e => setDriver(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicle">Veículo (Placa)</label>
                    <input type="text" id="vehicle" value={vehicle} onChange={e => setVehicle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="routeCount">Quantidade de Rotas</label>
                    <input type="number" id="routeCount" value={routeCount} onChange={e => setRouteCount(e.target.value)} min="1" required />
                </div>
                <div className="form-group">
                    <label>Status Inicial</label>
                    <div className="status-toggle">
                        <button type="button" onClick={() => setStatus('Pendente')} className={status === 'Pendente' ? 'active' : ''}>Pendente</button>
                        <button type="button" onClick={() => setStatus('Em Rota')} className={status === 'Em Rota' ? 'active' : ''}>Em Rota</button>
                    </div>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onBack} className="btn-secondary">Cancelar</button>
                    <button type="submit" className="btn-primary">Próximo</button>
                </div>
            </form>
        </div>
    );
}

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
