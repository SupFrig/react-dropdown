import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Dropdown = (props)=> {
    const [defaultValue, setDefaultValue] = useState(props.options.filter(option => option.selected === true).shift());

    const [active,setActive] = useState(false);
    const buttonClickHandler = () => setActive(!active);
    const itemClickHandler = (e) => {
        let updatedDefaultValue = props.options.filter(option => option.value == e.target.getAttribute('data-value')).shift();
        setDefaultValue(updatedDefaultValue);
        //setActive(false);
    };

    useEffect(() => {
        console.log('useEffect');
        document.addEventListener('click', (e) => {
            if(Boolean(e.target.getAttribute('class'))){
                if(targetClass.includes('Dropdown')){
                    return;
                }
            }
            setActive(false);
            
        });
    }, []);

    return (
        <div className="Dropdown">
            <a className="Dropdown-button" onClick={buttonClickHandler} href="#">{defaultValue.text}</a>
            <ul className={active ? "Dropdown-list Dropdown-list--active" : "Dropdown-list"}>
            {props.options.map((option,i) => {
                return <li key={i}><a href="#" className={defaultValue.value == option.value ? "Dropdown-list-item Dropdown-list-item--selected" : "Dropdown-list-item"} data-value={option.value} onClick={itemClickHandler}>{option.text}</a></li>
            })}
            </ul>
            <select defaultValue={[defaultValue.value]} multiple>
            {props.options.map((option,i) => {
                return <option key={i} value={option.value}>{option.text}</option>
            })}
            </select>
        </div>
    );
}

export default Dropdown;