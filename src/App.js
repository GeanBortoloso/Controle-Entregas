// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Estilos globais
import Header from './components/Header';
import DeliveryList from './pages/DeliveryList';
import AddDeliveryForm from './pages/AddDeliveryForm';
import AddClientForm from './pages/AddClientForm';
import SecretArchive from './pages/SecretArchive';
import ConfirmationModal from './components/ConfirmationModal';
import PasswordModal from './components/PasswordModal';

import { generateUniqueId } from './utils/helpers'; // Importe a função auxiliar
import { PASSWORD } from './utils/constants'; // Importe a senha

// Importação TEMPORÁRIA do deliveryService (ainda sem integração real com API)
import deliveryService from './services/deliveryService';

export default function App() {
    const [view, setView] = useState('list');
    
    // --- Lógica de Persistência com localStorage (Será substituída pela API) ---
    // Por enquanto, mantemos para que o app continue funcionando
    const [deliveries, setDeliveries] = useState(() => {
        const savedDeliveries = localStorage.getItem('deliveries');
        return savedDeliveries ? JSON.parse(savedDeliveries) : [];
    });
    const [archive, setArchive] = useState(() => {
        const savedArchive = localStorage.getItem('archive');
        return savedArchive ? JSON.parse(savedArchive) : [];
    });

    useEffect(() => {
        localStorage.setItem('deliveries', JSON.stringify(deliveries));
    }, [deliveries]);

    useEffect(() => {
        localStorage.setItem('archive', JSON.stringify(archive));
    }, [archive]);
    // --- Fim da Lógica de Persistência TEMPORÁRIA ---

    const [newDeliveryInfo, setNewDeliveryInfo] = useState(null);
    const [totalRoutes, setTotalRoutes] = useState(0);
    const [currentRouteNumber, setCurrentRouteNumber] = useState(1);
    const [modalState, setModalState] = useState({ isOpen: false, message: '', action: null, confirmType: 'danger' });
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [showArchive, setShowArchive] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [clientNameFilter, setClientNameFilter] = useState('');
    const [statusFilters, setStatusFilters] = useState({
        'Pendente': true,
        'Em Rota': true,
        'Finalizada': true,
        'Cancelada': true,
    });

    // Funções de manipulação de dados - futuras chamadas à API
    // Por enquanto, elas ainda operam no estado local (para manter a funcionalidade)
    // MAS, no futuro, você substituirá a lógica interna por chamadas ao `deliveryService`

    const handleStartNewDelivery = (deliveryData) => {
        setNewDeliveryInfo({ ...deliveryData, batchId: generateUniqueId() });
        setTotalRoutes(deliveryData.routeCount);
        setCurrentRouteNumber(1);
        setView('addClient');
    };

    const handleSaveClientRoute = (clientData) => {
        const finalDeliveryData = {
            id: generateUniqueId(),
            ...newDeliveryInfo,
            ...clientData,
            createdAt: new Date().toISOString(),
            status: newDeliveryInfo.status,
            startTime: newDeliveryInfo.status === 'Em Rota' ? new Date().toISOString() : null,
            endTime: null,
            totalTime: null,
        };
        // TODO: Chamar deliveryService.createDelivery(finalDeliveryData) AQUI
        // e, em seguida, atualizar os estados `deliveries` e `archive` com o retorno da API.
        setDeliveries(prev => [...prev, finalDeliveryData]);
        setArchive(prev => [...prev, finalDeliveryData]);

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

        // TODO: Chamar deliveryService.updateDeliveryStatus(id, newStatus) AQUI
        // e, em seguida, atualizar os estados `deliveries` e `archive` com o retorno da API.
        setDeliveries(newDeliveries);

        if (updatedDelivery) {
            const newArchive = archive.map(d => d.id === id ? updatedDelivery : d);
            setArchive(newArchive);
        }
    };

    const handleDelete = (id) => {
        // TODO: Chamar deliveryService.deleteDelivery(id) AQUI
        // e, em seguida, atualizar os estados `deliveries` com o retorno da API.
        setDeliveries(prev => prev.filter(d => d.id !== id));
    };

    const goBack = () => {
        setView('list');
        setShowArchive(false);
        setNewDeliveryInfo(null);
        setTotalRoutes(0);
        setCurrentRouteNumber(1);
    };

    const handleShowArchive = () => {
        setPasswordModalOpen(true);
    };
    
    const handlePasswordSubmit = () => {
        if (passwordInput === PASSWORD) { // Usando a constante importada
            setPasswordModalOpen(false);
            setPasswordInput('');
            setShowArchive(true);
            setView('archive');
        } else {
            alert("Senha incorreta!");
            setPasswordInput('');
        }
    };

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
        if (showArchive) {
            return <SecretArchive archive={archive} onBack={goBack} filterDate={filterDate} setFilterDate={setFilterDate} statusFilters={statusFilters} setStatusFilters={setStatusFilters} clientNameFilter={clientNameFilter} setClientNameFilter={setClientNameFilter} />;
        }
        switch (view) {
            case 'addDelivery':
                return <AddDeliveryForm onSave={handleStartNewDelivery} onBack={goBack} />;
            case 'addClient':
                return <AddClientForm onSave={handleSaveClientRoute} onBack={goBack} routeNumber={currentRouteNumber} totalRoutes={totalRoutes} />;
            default:
                return <DeliveryList deliveries={deliveries} onAdd={() => setView('addDelivery')} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} requestConfirmation={requestConfirmation} onShowArchive={handleShowArchive} filterDate={filterDate} setFilterDate={setFilterDate} statusFilters={statusFilters} setStatusFilters={setStatusFilters} clientNameFilter={clientNameFilter} setClientNameFilter={setClientNameFilter} />;
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
            </main>
        </>
    );
}