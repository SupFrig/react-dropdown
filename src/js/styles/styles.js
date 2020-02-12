import styled, { css } from 'styled-components';

export const DropdownContainer = styled.div`
color: #111;	
font-family: Roboto;
font-size: 13px;
font-weight: 600;
line-height: 20px;
display: inline-block;
position: relative;`;

export const DropdownButton = styled.a`
text-decoration: none;
color: #111;
padding-right: 15px;
background: url(../img/caret-down.svg) no-repeat right 50%;
cursor: pointer;

&:hover {
    background-image: url(../img/caret-down-hover.svg);
    color: #00A6F0;
}`;

export const DropdownTitle = styled.span`
display: block;
text-transform: uppercase;
font-size: 10px;	
font-weight: 500;	
line-height: 16px;
color: #999;`;

export const DropdownSearchInput = styled.input`
width: 100%;
height: 50px;
color: #999;
font-size: 15px;
border: 1px solid #E2E2E2;
font-weight: 500;
outline: none;
padding-left: 45px;
background: url(../img/search.svg) no-repeat 12px 50%;
margin-bottom: 12px;`;

export const DropdownFilter = styled.li`
color: #999;
font-size: 13px;
font-weight: 600;
line-height: 26px;
text-decoration: none;
padding-left: 16px;
cursor: pointer;`;

export const DropdownDelimiter = styled.li`
height: 2px;
margin: 10px 0; 
background: #E0E0E0;`;
export const DropdownInput = styled.select`
opacity: 0;
position: absolute;
z-index: -1;`;

export const DropdownMore = styled.li`
background: url(../img/load-more.svg) no-repeat 50%;
height: 17px;
cursor: pointer;`;

export const DropdownListContainer = styled.div`
position: relative`;

export const DropdownList = styled.ul`
opacity: 0;
display: none;
position: absolute;
left: -26px;
top: -33px;
min-width: 250px;
background: #fff;
line-height: 25px;
padding: 10px;
z-index: 1;
box-shadow: 3px 3px 5px 2px rgba(229,229,229,1);
${props => props.active && css`
    display: block;
    opacity: 1;
`}`;

export const DropdownListItem = styled.li`
text-decoration: none;
color: #111;
padding-left: 16px;
cursor: pointer;

&:hover {
    color: #00A6F0;
}

${props => props.active && css`
    color: #00A6F0;
    background: url(../img/go.svg) no-repeat left 50%;
`}`;