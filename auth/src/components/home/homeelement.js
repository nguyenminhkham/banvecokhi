import styled from "styled-components";

export const HeroSection = styled.div`
    width: 100%;
    height: 440px;
    background: #fafafa;
`

export const Inner = styled.div`
    width: 100%;
    height: auto;
    display: flex;

    .left {
        float: right;
        margin-right: 30px;
        background: #ff851b;
        color: #fafafa;
    }

    .right {
        margin-left: 30px;
        background: #00518b;
        color: #fafafa;
    }

    .center {
        margin-left: auto;
        margin-right: auto;
        background: #ff851b;
        color: #fafafa;
        width: 50%;
    }

    .bigtext {
        margin-top: 36px;
        font-size: 36px;
    }
`

export const Image = styled.img`
    width: auto;
    height: 125px;
    margin: 30px auto 30px auto;

`

export const HeroText = styled.text`
    font-size: 26px;
    color: #26383d;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    text-align: center;
`

export const InnerLeft = styled.div`
    float: left;
    width: 50%;
`

export const InnerRight = styled.div`
    float: right;
    width: 50%;
`

export const Button = styled.div`
    width: 60%;
    height: 46px;
    border-radius: 5px;
    border: none;
    margin-top: 70px;
    text-align: center;
    line-height: 46px;
    font-weight: bold;
`

export const BottomSection = styled.div`
    width: 100%;
    height: 440px;
    background: #26383d;
`

export const BottomText = styled.text`
    color: #fafafa;
    margin-left: auto;
    margin-right: auto;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    margin: 32px;
    text-align: left;
    width: 33.33%;
    box-sizing: border-box;
    color: #fafafa;
`

export const ContentText = styled.text`

`