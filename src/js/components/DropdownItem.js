import React, { Component, useState, useEffect } from 'react'
import { DropdownListItem } from './../styles/styles.js'
//import des nouveaux composants à faire manuellement
import UluleItem from './../components/UluleItem.js'

const DropdownItem = props => {
  return (
    <DropdownListItem onClick={props.clickHandler} active={props.active} data-value={props.value}>
      {props.richDataRenderer ? <UluleItem active={props.active} value={props.value} data={props.data} /> : props.text}
    </DropdownListItem>
  )
}

export default DropdownItem
