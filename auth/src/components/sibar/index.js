import React from 'react'
import {SibarContainer, SiHeader, SiContent, SiNav, SiInner, 
    AuthImg, AuthName, LevelDiv, } from './sibarelement'
import auimg from '../../images/authimgwhite.png'

const Sibar = () => {
    return (
    <>
        <SibarContainer>
                <SiHeader>
                    <SiInner>
                        <AuthImg src={auimg} alt='auth image'/>
                    </SiInner>
                    <SiInner>
                        <AuthName>nguyenminhkham</AuthName>
                    </SiInner>
                    <SiInner>
                        <LevelDiv>Clear</LevelDiv>
                    </SiInner>
                </SiHeader>
                <SiContent>

                </SiContent>
                <SiNav>

                </SiNav>
        </SibarContainer>
    </>
    )
}

export default Sibar