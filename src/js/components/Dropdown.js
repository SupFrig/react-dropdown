import React, { Component, useState, useEffect, useRef } from "react";
import DropdownItem from "./dropdownItem.js";

const Dropdown = (props) => {
    const dropdownRef = useRef(null);
    const defaultText = props.defaultText === undefined ? "Sélectionnez une valeur" : props.defaultText;
    const [options,setOptions] = useState(props.options);
    const [offset,setOffset] = useState(props.offset === undefined ? false : props.offset);
    const [selectedValues, setSelectedValues] = useState(options.filter(option => option.selected === true).map(({value}) => value));
    const [buttonText, setButtonText] = useState(defaultText);
    const [active,setActive] = useState(false);
    

    const buttonClickHandler = (e) => {
        setActive(!active);
        e.preventDefault();
    };
    const documentClickHandler = () => document.addEventListener('click', (e) => {
        console.log(typeof (dropdownRef));
        dropdownRef.current.contains(e.target) ? false : setActive(false);
    });

    const defineText = () => {
        if(selectedValues.length > 1){
            //plusieurs options sélectionnées
            setButtonText(`${selectedValues.length} valeurs sélectionnées`);
        }else if(selectedValues.length == 1){
            //une seule option sélectionnée
            setButtonText(props.options.filter(option => option.value == selectedValues[0])[0].text);
        }else{
            //pas de sélection
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

    //on filtre la recherche sur le texte, en lowercase
    const filterValues = (e) => setOptions(props.options.filter(option => option.text.toLowerCase().includes(e.target.value)));

    const loadMore = () => {
        let optionsToLoad = props.options.filter(propsOption => !options.includes(propsOption)).slice(0,offset);
        setOptions([...options,...optionsToLoad]);
        setActive(true);
    };

    //Mise à jour du texte quand la valeur est modifiée
    useEffect(() => {
        defineText();
    }, [selectedValues]);

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
                    {props.search ? <li><input className="Dropdown-search" onChange={filterValues} type="text" placeholder="Search"/></li> : false}
                    {props.selectAllButton ? <li className="Dropdown-filter" onClick={() => setSelectedValues(options.map(({value}) => value))}>Select All</li> : false}
                    {props.clearButton ? <li className="Dropdown-filter" onClick={() => setSelectedValues([])}>Clear All</li> : false}
                    {props.selectAllButton || props.clearButton ? <li className="Dropdown-delimiter"></li> : false}
                    {options.map((option,i) => {
                        return <DropdownItem 
                            key={i} 
                            className={selectedValues.includes(option.value) ? "Dropdown-list-item Dropdown-list-item--selected" : "Dropdown-list-item"} 
                            value={option.value} 
                            clickHandler={itemClickHandler} 
                            text={option.text}
                        />
                    })}
                    {(offset && options.length < props.options.length) ? <li className="Dropdown-more" onClick={loadMore}></li> : false}
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