import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './App.css';

// --- Ícones (copiados do App.js para consistência) ---
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

// --- Dropdown de Filtro (Copiado do App.js para autossuficiência do componente) ---
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
    const allOptionsCount = Object.keys(options).length;
    
    let buttonText;
    if (selectedCount === 0) {
        buttonText = `Nenhum ${title}`;
    } else if (selectedCount === allOptionsCount) {
        buttonText = `Todos os ${title}s`;
    } else {
        buttonText = `${selectedCount} ${title}(s) selecionado(s)`;
    }

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
                                checked={!!selectedOptions[option]}
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

// Registrando os componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// --- Componente Principal de Relatórios ---
export default function Reports({ archive, onBack }) {

    // --- Estados para os novos filtros ---
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');

    const allDrivers = useMemo(() => {
        const driverSet = new Set(archive.map(d => d.driver));
        return Array.from(driverSet).sort();
    }, [archive]);
    
    const [selectedDrivers, setSelectedDrivers] = useState(() => {
        return allDrivers.reduce((acc, driver) => ({ ...acc, [driver]: true }), {});
    });
    
    // Atualiza o estado se a lista de motoristas mudar
    useEffect(() => {
        setSelectedDrivers(allDrivers.reduce((acc, driver) => ({ ...acc, [driver]: true }), {}));
    }, [allDrivers]);
    
    
    // --- Lógica de Filtragem ---
    const filteredArchive = useMemo(() => {
        const activeDriverFilters = Object.keys(selectedDrivers).filter(driver => selectedDrivers[driver]);

        return archive.filter(delivery => {
            // Filtro de Data
            const deliveryDate = new Date(delivery.createdAt);
            if (filterStartDate && deliveryDate < new Date(filterStartDate)) {
                return false;
            }
            if (filterEndDate) {
                const endDate = new Date(filterEndDate);
                endDate.setHours(23, 59, 59, 999); // Inclui o dia todo
                if (deliveryDate > endDate) {
                    return false;
                }
            }

            // Filtro de Entregador
            if (activeDriverFilters.length > 0 && !activeDriverFilters.includes(delivery.driver)) {
                return false;
            }

            return true;
        });
    }, [archive, filterStartDate, filterEndDate, selectedDrivers]);

    // 1. Gráfico de Pizza: Percentual de Peças e Baterias
    const itemTypeData = useMemo(() => {
        const counts = { 'Peças': 0, 'Baterias': 0, 'Ambos': 0 };

        filteredArchive.forEach(delivery => {
            const hasPecas = delivery.itemType.toLowerCase().includes('pecas');
            const hasBaterias = delivery.itemType.toLowerCase().includes('baterias');

            if (hasPecas && hasBaterias) {
                counts['Ambos']++;
            } else if (hasPecas) {
                counts['Peças']++;
            } else if (hasBaterias) {
                counts['Baterias']++;
            }
        });

        return {
            labels: ['Somente Peças', 'Somente Baterias', 'Peças e Baterias'],
            datasets: [{
                data: [counts['Peças'], counts['Baterias'], counts['Ambos']],
                backgroundColor: ['#f2a900', '#007bff', '#343a40'],
            }],
        };
    }, [filteredArchive]);

    // 2. Gráfico de Barras: Total por Entregador e Tipo
    const deliveriesByDriverData = useMemo(() => {
        const drivers = {};
        filteredArchive.forEach(d => {
            if (!drivers[d.driver]) {
                drivers[d.driver] = { 'pecas': 0, 'baterias': 0 };
            }
            if (d.itemType.toLowerCase().includes('pecas')) {
                drivers[d.driver].pecas++;
            }
            if (d.itemType.toLowerCase().includes('baterias')) {
                drivers[d.driver].baterias++;
            }
        });

        const labels = Object.keys(drivers).sort();
        return {
            labels,
            datasets: [
                {
                    label: 'Peças',
                    data: labels.map(label => drivers[label].pecas),
                    backgroundColor: '#f2a900',
                },
                {
                    label: 'Baterias',
                    data: labels.map(label => drivers[label].baterias),
                    backgroundColor: '#007bff',
                }
            ],
        };
    }, [filteredArchive]);

    // 3. Gráfico de Barras: Tempo Médio de Entrega por Entregador
    const avgTimeByDriverData = useMemo(() => {
        const driverTimes = {};

        filteredArchive.forEach(d => {
            if (d.status === 'Finalizada' && d.totalTime && d.totalTime !== 'N/A') {
                const timeInMinutes = parseInt(d.totalTime.split(' ')[0], 10);
                if (!isNaN(timeInMinutes)) {
                    if (!driverTimes[d.driver]) {
                        driverTimes[d.driver] = { totalMinutes: 0, count: 0 };
                    }
                    driverTimes[d.driver].totalMinutes += timeInMinutes;
                    driverTimes[d.driver].count++;
                }
            }
        });

        const labels = Object.keys(driverTimes).sort();
        const averages = labels.map(driver => {
            const { totalMinutes, count } = driverTimes[driver];
            return count > 0 ? (totalMinutes / count).toFixed(2) : 0;
        });

        return {
            labels,
            datasets: [{
                label: 'Tempo Médio (minutos)',
                data: averages,
                backgroundColor: '#28a745',
            }],
        };
    }, [filteredArchive]);


    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div>
            <header className="list-header">
                <button onClick={onBack} className="back-button"><ArrowLeftIcon /></button>
                <h1><ChartBarIcon /> Relatórios Gráficos</h1>
            </header>

            <div className="filters-container">
                <div className="filter-group">
                    <label>Data Inicial</label>
                    <input type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} className="date-filter"/>
                </div>
                <div className="filter-group">
                    <label>Data Final</label>
                    <input type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} className="date-filter"/>
                </div>
                 <div className="filter-group">
                    <label>Filtrar por Entregador</label>
                    <FilterDropdown title="Entregador" options={allDrivers.reduce((acc, driver) => ({...acc, [driver]: true}), {})} selectedOptions={selectedDrivers} onSelectionChange={setSelectedDrivers} />
                </div>
            </div>

            <div className="reports-grid">
                <div className="report-card">
                    <h3>Total de Entregas por Tipo</h3>
                    {filteredArchive.length > 0 ? <Pie data={itemTypeData} options={chartOptions} /> : <p>Não há dados para exibir com os filtros selecionados.</p>}
                </div>

                <div className="report-card">
                    <h3>Entregas por Entregador e Tipo</h3>
                    {filteredArchive.length > 0 ? <Bar data={deliveriesByDriverData} options={{...chartOptions, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }}} /> : <p>Não há dados para exibir com os filtros selecionados.</p>}
                </div>

                <div className="report-card">
                    <h3>Tempo Médio de Rota por Entregador</h3>
                     {filteredArchive.length > 0 ? <Bar data={avgTimeByDriverData} options={{...chartOptions, scales: {y: {beginAtZero: true}}}} /> : <p>Não há dados para exibir com os filtros selecionados.</p>}
                </div>
            </div>
            <style>{`
                .reports-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }
                .report-card {
                    background-color: var(--color-surface);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
                    min-height: 400px;
                    display: flex;
                    flex-direction: column;
                }
                .report-card h3 {
                    margin-top: 0;
                    text-align: center;
                    margin-bottom: 1.5rem;
                }
                .report-card p {
                    text-align: center;
                    margin: auto;
                    color: #6c757d;
                }
                 .list-header h1 {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .list-header svg {
                    width: 28px;
                    height: 28px;
                }
            `}</style>
        </div>
    );
}