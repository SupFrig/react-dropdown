import React, { useState, useEffect, useRef } from "react";
import DropdownItem from "./dropdownItem.js";
import useAxios from 'axios-hooks';

import { 
    Resetter,
    DropdownContainer,
    DropdownButton,
    DropdownFilter,
    DropdownTitle,
    DropdownInput,
    DropdownDelimiter,
    DropdownSearchInput,
    DropdownMore,
    DropdownList,
    DropdownEmptyResults,
    DropdownListContainer 
} from "./../styles/styles.js";

const Dropdown = (props) => {
    const dropdownRef = useRef(null);
    const defaultText = props.defaultText === undefined ? "Sélectionnez une valeur" : props.defaultText;
    const [originalOptions,setOriginalOptions] = useState(props.options === undefined ? [] : props.options);
    const [url,setUrl] = useState(props.url === undefined ? false : props.url);
    const [urlParams,setUrlParams] = useState(props.urlParams === undefined ? false : props.urlParams);
    const [richDataRenderer,setRichDataRenderer] = useState(props.renderComponent === undefined ? false : props.renderComponent);
    const [options,setOptions] = useState(props.options === undefined ? [] : props.options);
    const [selectedOptions, setSelectedOptions] = useState(options.filter(option => option.selected === true).map(({value}) => value));
    const [search,setSearch] = useState('');
    const [offset,setOffset] = useState(props.offset === undefined ? false : props.offset);
    const [buttonText, setButtonText] = useState(defaultText);
    const [active,setActive] = useState(false);
    const [{ data: response, loading, error }] = useAxios(url);

    const buttonClickHandler = (e) => {
        setActive(!active);
        e.preventDefault();
    };

    //fermeture du dropdown au clic externe
    const documentClickHandler = () => document.addEventListener('click', (e) => dropdownRef.current.contains(e.target) ? false : setActive(false));

    const defineText = () => {

        if(selectedOptions.length > 1){
            setButtonText(`${selectedOptions.length} valeurs sélectionnées`);
        }else if(selectedOptions.length == 1){
            setButtonText(originalOptions.filter(option => option.value == selectedOptions[0])[0].text);
        }else{
            setButtonText(defaultText);
        }
    };

    const itemClickHandler = (e) => {
<<<<<<< HEAD
=======
        e.stopPropagation();
>>>>>>> 62a673fe5f1911751f7a9f21f060050c68536e4a
        e.preventDefault();
        let itemValue = e.currentTarget.getAttribute('data-value');

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
        let updatedOptions = originalOptions.filter(option => option.text.toLowerCase().includes(search));

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

    //appel ajax et valeur par défaut des options
    useEffect(() => {
        if(!loading){
            let updatedOptions = response.projects.map((object) => {
                let item = {
                    text: object[`name_${object.lang}`],
                    value: object.slug,
                    data: object
                };
                return item;
            });
            
            setOriginalOptions(updatedOptions);
            setOptions(offset ? updatedOptions.slice(0,offset) : updatedOptions);
            setRichDataRenderer(true);
        }
    }, [response]);
    
    //exécution à la création du composant
    useEffect(() => {
        documentClickHandler();
        if(offset) setOptions(options.slice(0,offset));
    }, []);
    
    return (
        <DropdownContainer ref={dropdownRef}>
            <Resetter />
            {props.title !== undefined ? <DropdownTitle>{props.title}</DropdownTitle> : false}
            <DropdownButton onClick={buttonClickHandler}>{buttonText}</DropdownButton>
            <DropdownListContainer>
                <DropdownList active={active}>
                    {props.search ? <li><DropdownSearchInput onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search"/></li> : false}
                    {props.selectAllButton && options.length > 0 ? <DropdownFilter onClick={() => setSelectedOptions(options.map(({value}) => value))}>Select All</DropdownFilter> : false}
                    {props.clearButton && options.length > 0 ? <DropdownFilter onClick={() => setSelectedOptions([])}>Clear All</DropdownFilter> : false}
                    {(props.selectAllButton || props.clearButton) && options.length > 0  ? <DropdownDelimiter/> : false}
                    
                    {options.length > 0 ? options.map((option,i) => {
                        return <DropdownItem 
                            key={i} 
                            active={selectedOptions.includes(option.value)} 
                            value={option.value} 
                            data={option.data === undefined ? false : option.data }
                            clickHandler={itemClickHandler} 
                            richDataRenderer={richDataRenderer} 
                            text={option.text} 
                        />
<<<<<<< HEAD
                    }) : <DropdownEmptyResults>Aucuns résultat</DropdownEmptyResults>}
=======
                    }) : <li>Aucuns résultat</li>}
>>>>>>> 62a673fe5f1911751f7a9f21f060050c68536e4a
                    {offset && (options < originalOptions) ? <DropdownMore onClick={loadMore}></DropdownMore> : false}
                </DropdownList>
            </DropdownListContainer>
            <DropdownInput readOnly value={props.multiple ? selectedOptions : selectedOptions[0]} multiple={props.multiple ? true : false}>
            {options.map((option,i) => {
                return <option key={i} value={option.value}>{option.text}</option>
            })}
            </DropdownInput>
        </DropdownContainer>
    );
}

export default Dropdown;