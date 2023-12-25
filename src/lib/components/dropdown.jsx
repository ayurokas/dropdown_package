import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../components/dropdown.css';

function CustomDropdown({ options, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const handleOptionClick = useCallback((option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm('');
    if (onChange) {
      onChange(option);
    }
  }, [onChange]);

  const filterOptions = useCallback(() => {
    if (!searchTerm) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

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
            {filteredOptions.map((option) => (
              <li
                key={option.value}
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
