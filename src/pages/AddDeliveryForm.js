import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '../assets/icons';
import { DRIVER_VEHICLE_MAPPING, ALL_VEHICLES } from '../utils/constants';

function AddDeliveryForm({ onSave, onBack }) {
    const [driver, setDriver] = useState(DRIVER_VEHICLE_MAPPING[0]?.driver || '');
    const [vehicle, setVehicle] = useState(DRIVER_VEHICLE_MAPPING[0]?.defaultVehicle || '');
    const [routeCount, setRouteCount] = useState(1);
    const [status, setStatus] = useState('Pendente');

    useEffect(() => {
        const selectedMapping = DRIVER_VEHICLE_MAPPING.find(item => item.driver === driver);
        if (selectedMapping) {
            setVehicle(selectedMapping.defaultVehicle);
        }
    }, [driver]);

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
                    <select id="driver" value={driver} onChange={e => setDriver(e.target.value)} required>
                        {DRIVER_VEHICLE_MAPPING.map(item => <option key={item.driver} value={item.driver}>{item.driver}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="vehicle">Veículo (Placa)</label>
                     <select id="vehicle" value={vehicle} onChange={e => setVehicle(e.target.value)} required>
                        {ALL_VEHICLES.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
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

export default AddDeliveryForm;