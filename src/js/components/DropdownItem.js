import React, { Component, useState, useEffect } from "react";

const DropdownItem = (props) => {
    return <li className={props.className} onClick={props.clickHandler} data-value={props.value}>{props.text}</li>;
};

export default DropdownItem;