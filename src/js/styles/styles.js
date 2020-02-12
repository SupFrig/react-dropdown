import styled from 'styled-components';

export const DropdownInput = styled.a`
opacity: 0;
position: absolute;
z-index: -1;`;

export const DropdownListItem = styled.a`
text-decoration: none;
color: #111;
padding-left: 16px;
cursor: pointer;
display: block;

&:hover {
    color: #00A6F0;
}`;