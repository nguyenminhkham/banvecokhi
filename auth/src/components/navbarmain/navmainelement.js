import styled from "styled-components";
import {Link as LinkR} from 'react-router-dom'
import {Link as LinkS} from 'react-scroll'

export const HidentClick = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1;
    display: ${({ click }) => (click === true ? 'fixed' : 'none')};
`

export const Container = styled.div`
    width: 100%;
    height: 50px;
    background: #26383d;
    display: flex;
    border-bottom: 3px solid #131b1d;
`

export const NavLeft = styled.div`
    float: left;
    width: 50%;
`

export const NavRight = styled.div`
    float: right;
    width: 50%;
`

export const LogoImage = styled.img`
    margin-top: 5px;
    margin-left: 10px;
    height: 44px;
    width: auto;
`

export const Dropdown = styled.div`
    display: inline-block;
    position: relative;
    width: auto;
    height: 100%;
    float: right;
    margin-right: 16px;
    z-index: 10;
`

export const NavLinks = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-size: 14px;
    background: ${({ click }) => (click === true ? '#090d0e' : 'none')};
    font-weight: bold;

    &:hover {
        background: #090d0e;
    }
`

export const DropdownContent = styled.ul`
    position: absolute;
    display: ${({ click }) => (click === true ? 'block' : 'none')};
    right: 0;
    width: 180px;
    padding: 10px 0;
    z-index: 1;
    margin: 0;
    margin-top: 3px;
    background: #FCFCFC;
    border: 1px solid #e7e7e7;
`

export const DropLinks = styled(LinkR)`
    color: #4e727b;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    /* height: 100%; */
    line-height: 26px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background: #26383d;
        color: #eee;
    }
`