import React, { Component, useState, useEffect, useRef } from "react";
import DropdownItem from "./dropdownItem.js";

const Dropdown = (props) => {
    const [selectedValues, setSelectedValues] = useState(props.options.filter(option => option.selected === true).map(({value}) => value));
    const [buttonText, setButtonText] = useState(props.options[0].text);
    const [active,setActive] = useState(false);
    const dropdownRef = useRef(null);

    const buttonClickHandler = () => setActive(!active);
    const documentClickHandler = () => document.addEventListener('click', (e) => dropdownRef.current.contains(e.target) ? false : setActive(false));

    const itemClickHandler = (e) => {
        let itemValue = e.target.getAttribute('data-value');
        let updatedSelectedValues;
        if(selectedValues.includes(itemValue)){
            updatedSelectedValues = selectedValues.filter(item => item != itemValue);
        }else{
            let unsortedValues = [...selectedValues,itemValue];
            
            //on repars de props.options pour conserver l'ordre d'affichage original des éléments
            updatedSelectedValues = props.options.filter(item => unsortedValues.includes(item.value)).map(({value}) => value);
        }
        setSelectedValues(updatedSelectedValues);
    };
    
    useEffect(() => {
        documentClickHandler();
    }, []);
    
    return (
        <div className="Dropdown" ref={dropdownRef}>
            {(() => {
                if (props.title !== undefined) {
                    return <span className="Dropdown-title">{props.title}</span>
                }
            })()}
            <a className="Dropdown-button" onClick={buttonClickHandler} href="#">{buttonText}</a>
            <div className="Dropdown-list-container">
                <ul className={active ? "Dropdown-list Dropdown-list--active" : "Dropdown-list"}>
                {props.options.map((option,i) => {
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
            <select defaultValue={selectedValues} multiple={props.multiple ? true : false}>
            {props.options.map((option,i) => {
                return <option key={i} value={option.value}>{option.text}</option>
            })}
            </select>
        </div>
    );
}

export default Dropdown;