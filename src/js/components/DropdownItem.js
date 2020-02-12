import React, { Component, useState, useEffect } from "react";
import styled from 'styled-components';

const DropdownListItem = styled.li`
text-decoration: none;
color: #111;
padding-left: 16px;
cursor: pointer;

${props => props.active && css`
    color: #00A6F0;
    background: url(../img/go.svg) no-repeat left 50%;
`}
`;

const DropdownItem = (props) => {
    

    return <DropdownListItem onClick={props.clickHandler} data-value={props.value}>{props.text}</DropdownListItem>;
};

export default DropdownItem;