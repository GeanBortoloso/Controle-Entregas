import React, { useState, useEffect, useRef } from 'react';

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

export default FilterDropdown;