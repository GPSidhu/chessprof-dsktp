import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.nav`
    top: 0;
    left: 0;
    background: #5c5c5c; 
    width: 200px;
    height: 100vH;
    display: grid;
    grid-template-rows: 80px auto;
    grid-gap: 24px;
    justify-content: center;
    z-index: 5;
`
const Logo = styled(Link)`
    color: #fff;
    justify-self: flex-start;
    font-size: 2rem;
    font-style: italic;
    display: flex;
    align-items: center;
    font-weight : bold;
    text-decoration: none;
    @media screen and (max-width: 768px) {
        font-size: 2rem;
    }
`

const HeaderMenu = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: flex-start;
    list-style: none;
    text-align: center;
    margin: 0 !important;
    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const MenuItem = styled.li`
    width: 100%;
    margin-top: 12px;
    margin-left: -20px;
    font-size: 1.2rem;
    &:hover {
        background: darkgrey;
    }
`

export const LinkItem = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
`

const menuItems = [
    { id: 'about', label: 'About', type: 'link' },
    { id: 'home', label: 'Home', type: 'link' },
    { id: 'openings', label: 'Openings', type: 'link' },
    { id: 'contact', label: 'Contact', type: 'link' }
]
function Navbar() {
    return (
        <HeaderContainer>
            <Logo to="/">ChessProf</Logo>
            <HeaderMenu>
                {
                    menuItems.map((item, index) => <MenuItem key={`menu_item_${index}`}>
                        <LinkItem to={item.id}>{item.label}</LinkItem>
                    </MenuItem>)
                }
            </HeaderMenu>
        </HeaderContainer>
    )
}

export default Navbar
