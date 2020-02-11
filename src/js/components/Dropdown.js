import React, { Component, useState, useEffect, useRef } from "react";
import DropdownItem from "./dropdownItem.js";
import Axios from "axios";

const Dropdown = (props) => {
    const dropdownRef = useRef(null);
    const defaultText = props.defaultText === undefined ? "Sélectionnez une valeur" : props.defaultText;
    const [options,setOptions] = useState(props.options);
    const [search,setSearch] = useState('');
    const [offset,setOffset] = useState(props.offset === undefined ? false : props.offset);
    const [selectedValues, setSelectedValues] = useState(options.filter(option => option.selected === true).map(({value}) => value));
    const [buttonText, setButtonText] = useState(defaultText);
    const [active,setActive] = useState(false);

    
    const buttonClickHandler = (e) => {
        setActive(!active);
        e.preventDefault();
    };

    //fermeture du dropdown au clic externe
    const documentClickHandler = () => document.addEventListener('click', (e) => {
        if(e.target.getAttribute('class') === 'Dropdown-more') return;
        dropdownRef.current.contains(e.target) ? false : setActive(false);
    });

    const defineText = () => {
        if(selectedValues.length > 1){
            setButtonText(`${selectedValues.length} valeurs sélectionnées`);
        }else if(selectedValues.length == 1){
            setButtonText(props.options.filter(option => option.value == selectedValues[0])[0].text);
        }else{
            setButtonText(defaultText);
        }
    };

    const itemClickHandler = (e) => {
        let itemValue = e.target.getAttribute('data-value');
        let updatedSelectedValues;
        if(props.multiple){
            if(selectedValues.includes(itemValue)){
                updatedSelectedValues = selectedValues.filter(item => item != itemValue);
            }else{
                let unsortedValues = [...selectedValues,itemValue];
                
                //on repars de options pour conserver l'ordre d'affichage original des éléments
                updatedSelectedValues = options.filter(item => unsortedValues.includes(item.value)).map(({value}) => value);
            }
        }else{
            updatedSelectedValues = [itemValue];

            //si la sélection n'est pas multiple, on ferme le select au clic comme sur un select html classique
            setActive(false);
        }
        
        setSelectedValues(updatedSelectedValues);
    };
    
    const filterOptions = () => {
        //filtre sur la recherche
        let updatedOptions = props.options.filter(option => option.text.toLowerCase().includes(search));

        //filtre sur la limite d'affichage
        if(offset) updatedOptions = updatedOptions.slice(0,offset);
 
        setOptions(updatedOptions);
        setSelectedValues(selectedValues.filter(option => updatedOptions.map(({value}) => value).includes(option)));
    };

    const loadMore = () => {
        setOffset(parseInt(offset) + parseInt(props.offset));
        setActive(true);
    };

    //Mise à jour du texte quand la valeur est modifiée
    useEffect(() => {
        defineText();
    }, [selectedValues]);

    //Filtrage de la liste à la modification de la recherche
    useEffect(() => {
        filterOptions();
    }, [search,offset]);

    //exécution à la création du composant
    useEffect(() => {
        documentClickHandler();
        if(offset) setOptions(options.slice(0,offset));
    }, []);

    return (
        <div className="Dropdown" ref={dropdownRef}>
            {props.title !== undefined ? <span className="Dropdown-title">{props.title}</span> : false}
            <a className="Dropdown-button" onClick={buttonClickHandler} href="#">{buttonText}</a>
            <div className="Dropdown-list-container">
                <ul className={active ? "Dropdown-list Dropdown-list--active" : "Dropdown-list"}>
                    {props.search ? <li><input className="Dropdown-search" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search"/></li> : false}
                    {props.selectAllButton && options.length > 0 ? <li className="Dropdown-filter" onClick={() => setSelectedValues(options.map(({value}) => value))}>Select All</li> : false}
                    {props.clearButton && options.length > 0 ? <li className="Dropdown-filter" onClick={() => setSelectedValues([])}>Clear All</li> : false}
                    {(props.selectAllButton || props.clearButton) && options.length > 0  ? <li className="Dropdown-delimiter"></li> : false}
                    
                    {options.length > 0 ? options.map((option,i) => {
                        return <DropdownItem 
                            key={i} 
                            className={selectedValues.includes(option.value) ? "Dropdown-list-item Dropdown-list-item--selected" : "Dropdown-list-item"} 
                            value={option.value} 
                            clickHandler={itemClickHandler} 
                            text={option.text}
                        />
                    }) : <li>Aucuns résultat</li>}
                    {(offset && offset < props.options.length) ? <li className="Dropdown-more" onClick={loadMore}></li> : false}
                </ul>
            </div>
            <select readOnly value={props.multiple ? selectedValues : selectedValues[0]} multiple={props.multiple ? true : false}>
            {options.map((option,i) => {
                return <option key={i} value={option.value}>{option.text}</option>
            })}
            </select>
        </div>
    );
}

export default Dropdown;