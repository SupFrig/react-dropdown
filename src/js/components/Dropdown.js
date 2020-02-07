import React, { Component, useState, useEffect, useRef } from "react";
import DropdownItem from "./dropdownItem.js";

const Dropdown = (props) => {
    const [options,setOptions] = useState(props.options);
    const [selectedValues, setSelectedValues] = useState(options.filter(option => option.selected === true).map(({value}) => value));
    const [buttonText, setButtonText] = useState("Sélectionnez une valeur");
    const [active,setActive] = useState(false);
    const dropdownRef = useRef(null);

    const buttonClickHandler = () => setActive(!active);
    const documentClickHandler = () => document.addEventListener('click', (e) => dropdownRef.current.contains(e.target) ? false : setActive(false));

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
            setButtonText(props.options.filter(option => option.value == itemValue)[0].text);
            //si la sélection n'est pas multiple, on ferme le select au clic comme sur un select html classique
            setActive(false);
        }
        
        setSelectedValues(updatedSelectedValues);
    };

    //on filtre la recherche sur le texte, en lowercase
    const filterValues = (e) => setOptions(props.options.filter(option => option.text.toLowerCase().includes(e.target.value)));

    useEffect(() => {
        documentClickHandler();
    }, []);
    
    return (
        <div className="Dropdown" ref={dropdownRef}>
            {props.title !== undefined ? <span className="Dropdown-title">{props.title}</span> : false}
            <a className="Dropdown-button" onClick={buttonClickHandler} href="#">{buttonText}</a>
            <div className="Dropdown-list-container">
                <ul className={active ? "Dropdown-list Dropdown-list--active" : "Dropdown-list"}>
                    {props.search === true ? <li><input className="Dropdown-search" onChange={filterValues} type="text" placeholder="Search"/></li> : false}
                    {options.map((option,i) => {
                        return <DropdownItem 
                            key={i} 
                            className={selectedValues.includes(option.value) ? "Dropdown-list-item Dropdown-list-item--selected" : "Dropdown-list-item"}
                            value={option.value} 
                            clickHandler={itemClickHandler}
                            text={option.text}
                        />
                    })}
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