import React from 'react'
import logo from '../../images/logoblue.png'
import {NavContainer, NavLeft, NavRight, ImageLogo, UL, LI, A, } from './navelement.js'

const Navbar = () => {
    return (
    <>
        <NavContainer>
            <NavLeft>
                <ImageLogo src={logo}/>
            </NavLeft>
            <NavRight>
                <UL>
                    <LI>
                        <A>ĐĂNG NHẬP</A>
                    </LI>
                </UL>
            </NavRight>
        </NavContainer>
    </>
    )
}

export default Navbar