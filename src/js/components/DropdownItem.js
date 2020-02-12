import React, { Component, useState, useEffect } from "react";
import { DropdownListItem } from "./../styles/styles.js";

const DropdownItem = (props) => {
    
    return <DropdownListItem onClick={props.clickHandler} active={props.active} data-value={props.value}>{props.text}</DropdownListItem>;
};

export default DropdownItem;