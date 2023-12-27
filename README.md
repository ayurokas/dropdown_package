__CustomDropdown pour React__


Ce package fournit un composant CustomDropdown personnalisable pour les applications React. Il permet de sélectionner une option parmi les options fournies, avec la possibilité de rechercher une option spécifique.


__INSTALLATION__

Pour installer ce composant, exécutez la commande suivante dans votre projet React :

npm install @ayurokas/dropdown_package

__UTILISATION__

Pour utiliser CustomDropdown dans votre projet, importez d'abord le composant :



```jsx
import CustomDropdown from "@ayurokas/dropdown_package"
```
Voici un exemple d'utilisation du composant CustomDropdown :

```jsx
import React, { useState } from 'react';
import CustomDropdown from "@ayurokas/dropdown_package"

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 }
  ];

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <CustomDropdown
      options={options}
      onChange={handleChange}
      placeholder="Select an option"
    />
  );
};

export default App;
```

__PROPS__

Le composant CustomDropdown accepte les props suivantes :


options : Array d'objets représentant les options. Chaque option est un objet avec label et value.

onChange : Fonction appelée lorsque l'option est sélectionnée.

placeholder : Texte à afficher lorsque aucune option n'est sélectionnée.


__PERSONALISATION__

```JSX
import '../components/dropdown.css';
```