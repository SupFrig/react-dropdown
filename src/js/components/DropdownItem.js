import React, { Component, useState, useEffect } from "react";
import { DropdownListItem } from "./../styles/styles.js";
//import des nouveaux composants à faire manuellement
import UluleItem from "./../components/UluleItem.js";

const DropdownItem = (props) => {
    return (
        <DropdownListItem onClick={props.clickHandler} active={props.active} data-value={props.richDataRenderer ? props.value.slug : props.value}>
            {props.richDataRenderer ? <UluleItem active={props.active} onClick={props.clickHandler} value={props.value} /> : props.text}
        </DropdownListItem>
    );
};

export default DropdownItem;