import React, { useEffect, useState } from 'react'
import {Container, NavLeft, NavRight, LogoImage, Dropdown, NavLinks, DropdownContent, DropLinks, 
HidentClick, } from './navmainelement.js'
import logo from '../../images/logoblue.png'
import {HiChevronDoubleDown} from 'react-icons/hi'

const Navbarmain = () => {
    const [clickeven, setClickeven] = useState(false)
    const [accountclick, setAccountclick] = useState(false)
    const [productclick, setProductclick] = useState(false)

    const hidentclick = () => {
        setAccountclick(false)
        setProductclick(false)
    }

    const accout = () => {
        if (accountclick === false) {
            setAccountclick(true)
            setClickeven(true)
            setProductclick(false)
        } else {
            setAccountclick(false)
        }
    }

    const product = () => {
        if (productclick === false) {
            setClickeven(true)
            setProductclick(true)
            setAccountclick(false)
        } else {
            setProductclick(false)
        }
    }

    const toSellerI = () => {
        window.location.href = 'http://localhost:3000/Seller/Index'
    }

    return (
    <>  <HidentClick onClick={hidentclick} click={clickeven}/>
        <Container>
            <NavLeft>
                <LogoImage src={logo} />
            </NavLeft>
            <NavRight>
                <Dropdown>
                    <NavLinks onClick={accout} click={accountclick}>TÀI KHOẢN
                    <HiChevronDoubleDown style={{'margin-left':'5px', 'font-size':'14px', 'font-weight':'bold'}}/>
                    </NavLinks>
                    <DropdownContent click={accountclick}>
                        <DropLinks to='/dashboard' offset={-50}>TRANG CHỦ</DropLinks>
                        <DropLinks onClick={toSellerI} to='' offset={-50}>CÀI ĐẶT</DropLinks>
                        <DropLinks to='/dashboard' offset={-50}>THÔNG TIN CHI TRẢ</DropLinks>
                        <DropLinks to='/dashboard' offset={-50}>BÁO CÁO</DropLinks>
                        <DropLinks to='/dashboard' style={{'margin-top': '6px', 'padding-top': '6px', 'border-top':'1px solid #e7e7e7'}} offset={-50}>ĐĂNG XUẤT</DropLinks>
                    </DropdownContent>
                </Dropdown>
                <Dropdown style={{'margin-right':'0'}}>
                    <NavLinks onClick={product} click={productclick}>SẢN PHẨM
                    <HiChevronDoubleDown style={{'margin-left':'5px', 'font-size':'14px', 'font-weight':'bold'}}/>
                    </NavLinks>
                    <DropdownContent click={productclick}>
                        <DropLinks to='/products' offset={-50}>MY PRODUCTS</DropLinks>
                        <DropLinks to='/Accessmanager' offset={-50}>WORKSPACE</DropLinks>
                    </DropdownContent>
                </Dropdown>
            </NavRight>
        </Container>
    </>
    )
}

export default Navbarmain