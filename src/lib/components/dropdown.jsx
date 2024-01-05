import React, { useState, useEffect, useRef } from 'react';
import '../components/dropdown.css';

/**
 * Composant de liste déroulante personnalisée.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.options - La liste des options de la liste déroulante.
 * @param {function} props.onChange - La fonction de rappel appelée lorsqu'une option est sélectionnée.
 * @param {string} props.placeholder - Le texte à afficher lorsque rien n'est sélectionné.
 */
function CustomDropdown({ options, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null); 

  useEffect(() => {
    /**
     * Gère les clics en dehors du menu déroulant pour le fermer.
     * @param {Event} event - L'événement de clic.
     */
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Bascule l'état d'ouverture du menu déroulant.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Gère le clic sur une option de la liste déroulante.
   * @param {Object} option - L'option sélectionnée.
   */
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm('');
    if (onChange) {
      onChange(option);
    }
  };

  /**
   * Filtrage des options en fonction du terme de recherche.
   * @returns {Array} - Les options filtrées.
   */
  const filterOptions = () => {
    if (!searchTerm) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  };

  // Affichage des options filtrées
  const filteredOptions = filterOptions();

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="dropdown-options">
            {filteredOptions.map((option, index) => (
              <li
                key={option.value || index}
                onClick={() => handleOptionClick(option)}
                className="dropdown-option"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
