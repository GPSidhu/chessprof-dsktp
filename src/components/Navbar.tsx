import React from 'react';
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// src
import { NAV_ICON_MAP } from '../constants'
import List from './List';

const HeaderContainer = styled.nav`
    top: 0;
    left: 0;
    background: #5c5c5c;
    width: 200px !important;
    height: 100%;
    display: grid;
    grid-template-rows: 80px auto;
    grid-gap: 24px;
    justify-content: space-between;
    z-index: 5;
    font-family: fantasy;
`
const Logo = styled(Link)`
    color: #fff;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight : bold;
    text-decoration: none;
    border-bottom: 3px solid #fff;
    @media screen and (max-width: 768px) {
        font-size: 2rem;
    }
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: flex-start;
    list-style: none;
    text-align: center;
    width: 200px !important;
    margin: 0 !important;
    height: auto;
`

export const MenuItem = styled.div`
    width: 100%;
    padding: 8px 0;
    font-size: 1.2rem;
    font-weight: bold;
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
    font-size: 16px;
    img {
        margin-right: 18px;
        margin-bottom: -6px;
    }
`

const headerMenuItems = [
    { id: 'openings', label: 'Openings', type: 'link', icon: 'opening' },
    { id: 'endgame', label: 'End Game', type: 'link', icon: 'endgame' },
    { id: 'practice', label: 'Practice', type: 'link', icon: 'practice' },
    { id: 'puzzles', label: 'Puzzles', type: 'link', icon: 'puzzle' },
    { id: 'play-offline', label: 'Play Offline', type: 'link', icon: 'offline' },
    { id: 'play-online', label: 'Play Online', type: 'link', icon: 'online' },
]

const footerMenuItems = [
    { id: 'credits', label: 'Credits', type: 'link', icon: 'info' },
]

function Navbar() {

    const renderMenuItem = (item: { id: string, label: string, type: string, icon: string }) => (
        <MenuItem>
            <LinkItem to={`/${item.id}`}>
                <span>
                    <img src={NAV_ICON_MAP[item.icon]} alt={item.icon} style={{ width: '24px' }}>
                    </img>{item.label}
                </span>
            </LinkItem>
        </MenuItem>)
    
    return (
        <HeaderContainer>
            <Logo to="/">ChessProf</Logo>
            <MenuContainer>
                <Menu>
                    {<List items={headerMenuItems}>{renderMenuItem}</List>}
                </Menu>
                <Menu>
                    {<List items={footerMenuItems}>{renderMenuItem}</List>}
                </Menu>
            </MenuContainer>
        </HeaderContainer>
    )
}

export default Navbar
