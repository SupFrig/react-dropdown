import React, { Component, useState, useEffect, useRef } from "react";
import DropdownItem from "./dropdownItem.js";
import Axios from "axios";
import { DropdownInput } from "./../styles/styles.js";

const Dropdown = (props) => {
    const dropdownRef = useRef(null);
    const defaultText = props.defaultText === undefined ? "Sélectionnez une valeur" : props.defaultText;
    const [options,setOptions] = useState(props.options);
    const [selectedOptions, setSelectedOptions] = useState(options.filter(option => option.selected === true).map(({value}) => value));
    const [search,setSearch] = useState('');
    const [offset,setOffset] = useState(props.offset === undefined ? false : props.offset);
    
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
        if(selectedOptions.length > 1){
            setButtonText(`${selectedOptions.length} valeurs sélectionnées`);
        }else if(selectedOptions.length == 1){
            setButtonText(props.options.filter(option => option.value == selectedOptions[0])[0].text);
        }else{
            setButtonText(defaultText);
        }
    };

    const itemClickHandler = (e) => {
        let itemValue = e.target.getAttribute('data-value');
        let updatedSelectedOptions;
        if(props.multiple){
            if(selectedOptions.includes(itemValue)){
                updatedSelectedOptions = selectedOptions.filter(item => item != itemValue);
            }else{
                let unsortedValues = [...selectedOptions,itemValue];
                
                //on repars de options pour conserver l'ordre d'affichage original des éléments
                updatedSelectedOptions = options.filter(item => unsortedValues.includes(item.value)).map(({value}) => value);
            }
        }else{
            updatedSelectedOptions = [itemValue];

            //si la sélection n'est pas multiple, on ferme le select au clic comme sur un select html classique
            setActive(false);
        }
        
        setSelectedOptions(updatedSelectedOptions);
    };
    
    const filterOptions = () => {
        //filtre sur la recherche
        let updatedOptions = props.options.filter(option => option.text.toLowerCase().includes(search));

        //filtre sur la limite d'affichage
        if(offset) updatedOptions = updatedOptions.slice(0,offset);
 
        setOptions(updatedOptions);
        setSelectedOptions(selectedOptions.filter(option => updatedOptions.map(({value}) => value).includes(option)));
    };

    const loadMore = () => {
        setOffset(parseInt(offset) + parseInt(props.offset));
        setActive(true);
    };

    //Mise à jour du texte quand la valeur est modifiée
    useEffect(() => {
        defineText();
    }, [selectedOptions]);

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
                    {props.selectAllButton && options.length > 0 ? <li className="Dropdown-filter" onClick={() => setSelectedOptions(options.map(({value}) => value))}>Select All</li> : false}
                    {props.clearButton && options.length > 0 ? <li className="Dropdown-filter" onClick={() => setSelectedOptions([])}>Clear All</li> : false}
                    {(props.selectAllButton || props.clearButton) && options.length > 0  ? <li className="Dropdown-delimiter"></li> : false}
                    
                    {options.length > 0 ? options.map((option,i) => {
                        return <DropdownItem 
                            key={i} 
                            active={selectedOptions.includes(option.value)} 
                            value={option.value} 
                            clickHandler={itemClickHandler} 
                            text={option.text}
                        />
                    }) : <li>Aucuns résultat</li>}
                    {(offset && offset < props.options.length) ? <li className="Dropdown-more" onClick={loadMore}></li> : false}
                </ul>
            </div>
            <DropdownInput readOnly value={props.multiple ? selectedOptions : selectedOptions[0]} multiple={props.multiple ? true : false}>
            {options.map((option,i) => {
                return <option key={i} value={option.value}>{option.text}</option>
            })}
            </DropdownInput>
        </div>
    );
}

export default Dropdown;