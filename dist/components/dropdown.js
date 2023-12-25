"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.string.starts-with.js");
var _react = _interopRequireWildcard(require("react"));
require("../components/dropdown.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function CustomDropdown(_ref) {
  let {
    options,
    onChange,
    placeholder
  } = _ref;
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const [selectedOption, setSelectedOption] = (0, _react.useState)(null);
  const [searchTerm, setSearchTerm] = (0, _react.useState)('');
  const dropdownRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm('');
    if (onChange) {
      onChange(option);
    }
  };
  const filterOptions = () => {
    if (!searchTerm) {
      return options;
    }
    return options.filter(option => option.label.toLowerCase().startsWith(searchTerm.toLowerCase()));
  };
  const filteredOptions = filterOptions();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "custom-dropdown",
    ref: dropdownRef
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-header",
    onClick: toggleDropdown
  }, selectedOption ? selectedOption.label : placeholder), isOpen && /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-content"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Search...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("ul", {
    className: "dropdown-options"
  }, filteredOptions.map(option => /*#__PURE__*/_react.default.createElement("li", {
    key: option.value,
    onClick: () => handleOptionClick(option),
    className: "dropdown-option"
  }, option.label)))));
}
var _default = exports.default = CustomDropdown;