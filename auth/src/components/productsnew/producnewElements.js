import styled, { keyframes } from 'styled-components'
import {GrClose} from 'react-icons/gr'

export const Container = styled.div`
    /* overflow: hidden; */
`
export const CloseIconItem = styled(GrClose)`
    color: black;
    border-radius: 10px;
    float: right;
    cursor: pointer;
    `

export const Background = styled.div`
    width: 100%;
    height: auto;
    min-width: 1000px;
    min-height: 100vh;
    background: #F7F7F7;
    position: fixed;
    z-index: -10;
`
export const TopSection = styled.div`
    width: 100%px;
    height: 87px;
    border-bottom: 1px solid #d5d5d5;
`

export const TopLeft = styled.div`
    width: 50%;
    height: 100%;
    float: left;
`

export const Newproduct = styled.div`
    font-size: 21px;
    color: gray;
    margin-left: 20px;
    line-height: 87px;
`

export const TopRight = styled.div`
    width: 50%;
    height: 100%;
    float: right;

    .publish-btn {
        margin-right: 22px;
        background: #FF8135;
        color: white;
        border: 1px solid #FF8135;
    }

    .preview-btn {
        margin-right: 10px;
        background: #e8e8e8;
        color: #808080;
        border: 1px solid #808080;
    }
`

export const BodySection = styled.div`
    width: 100%;
    height: calc(100vh - 87px);
    display: flex;
`

export const BodyLeft = styled.div`
    width: 60%;
    float: left;
    height: 500px;
`

export const BodyLeftTop = styled.div`
    width: 100%;
    height: 61px;
    border-bottom: .5px solid #d5d5d5;
`

const changecolor = keyframes`
    from {
        border-bottom: 0 solid #FF8135;
    }

    to {    
        border-bottom: 3px solid #FF8135;
    }
`

const displaykf = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

export const Ul = styled.ul`
    position: relative;
    width: 100%;
    text-align: center;
    padding-top: 18px;

    .active {
        color: #FF8135;
        animation-name: ${changecolor};
        animation-duration: .1s;
        animation-fill-mode: forwards;
        cursor: context-menu;
    }
`

export const Li = styled.li`
    position: relative;
    display: inline-block;
    padding-left: 8px;
    padding-right: 8px;
    height: 43px;

    .active {
        border-bottom: none !important;
    }
`

export const ATop = styled.a`
    text-decoration: none;
    color: #808080;
    font-size: 13px;
`

export const Divcenter = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
`

export const DivInputone = styled.section`
    
`

export const DivInput = styled.section`
    width: auto;
    margin-left: 5px;
    :hover {
        text-decoration: underline;
        color: #6EC6EC;
    }
`

export const ABody = styled.input`
    /* text-decoration: none; */
    color: #6EC6EC;
    font-size: 13px;
    /* width: 0.1px;
	height: 0.1px; */
	opacity: 0;
	overflow: hidden;
	position: absolute;
	/* z-index: -1; */
    background: red;
    width: 80px;
    /* margin-left: 0px; */
`

export const Label = styled.label`
    color: #6EC6EC;
    font-size: 13px;
    z-index: -1;

    /* ::after {
    background-color: #E5E5E5;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 34%;
    margin-left: 8px;
    } */

    /* :hover {
        text-decoration: underline;
    } */
`

export const BodyLeftContent = styled.div`
    width: 100%;
    height: auto;

    .active {
        animation-name: ${displaykf};
        animation-duration: 1s;
        animation-fill-mode: forwards;
        display: block;
    }
`

export const BodyContentSection = styled.div`
    width: 100%;
    margin: 10px auto 10px auto;
    display: none;
    /* background: green; */
    min-height: 600px;

    .flex {
        display: flex;
    }

    .widthfull {
        width: 100%;
    }
`

export const InnerSection = styled.div`
    width: 70%;
    margin: 26px auto 0 auto;
`

export const GridContainer = styled.div`
    columns: 200px 5;
    margin: 20px 0 0 30px;
    flex-wrap: wrap;
    display: flex;
`

export const TextContent = styled.text`
    font-size: 13px;
    color: #808080;

    /* ::before {
    background-color: #E5E5E5;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 34%;
    margin-right: 8px;
    } */
`

export const BodyRight = styled.div`
    width: 40%;
    float: right;
    height: auto;
    overflow-y: scroll;
    border-left: .5px solid #D5D5D5;

    .flex {
        display: flex;
    }

    .padding50 {
        padding: 50px 50px 32px 50px;
    }

    .paddingtop0  {
    padding: 0 50px 0 50px;
    }
`

export const InnerBR = styled.div`
    width: 100%;
    height: auto;
    display: block;
    padding: 20px 50px 0 50px;
`

export const AreaDescr = styled.textarea`
    width: 100%;
    height: auto;
    min-height: 200px;
    resize: vertical;
`

export const Button = styled.button`
    width: 104px;
    height: 32px;
    float: right;
    margin-top: 26px;
`

export const ImageUp = styled.img`
    
`

export const CloudSpan = styled.span`
    font-size: 60px;
    color: #C1C1C1;
    margin-left: auto;
    margin-right: auto;
`

export const InnerLeft = styled.div`
    width: 50%;
`

export const InnerRight = styled.div`
    width: 50%;

    .flex {
        display: flex;
    }
`

export const TextTitle = styled.text`
    font-size: 13px;
    font-weight: bold;
    color: #808080;
`

export const InputText = styled.input`
    border: 1px solid #C1C1C1; 
    border-radius: 3px 0 0 3px;
    height: 30px;
    width: 300px;
    margin-top: 12px;
    background: #F6F6F6;
    color: #808080;
    padding-left: 10px;

    ::placeholder {
        color: #C1C1C1;
    }

    :focus {
        outline: none;
    }
}
}
`

export const Inner = styled.div`
    .price {
        border-right: none;
        width: 260px;
    }
`

export const Price = styled.div`
    font-size: 12px;
    background: #E8E8E8;
    line-height: 28px;
    border: 1px solid #C1C1C1;
    width: 40px;
    text-align: center;
    margin-top: 12px;
    color: #808080;
`

export const Hr = styled.hr`
    border: none;
    background: #E5E5E5;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    height: .5px;
`
export const EditorContainer = styled.div`
    /* border: 1px solid #C1C1C1; */

.wrapper-class {
    /* padding: 1rem;
    border: 1px solid #ccc; */
}
.editor-class {
    background-color: white;
    padding: 1rem;
    border: 1px solid #ccc;
    min-height: 200px;
    max-height: 500px;
}
.toolbar-class {
    border: 1px solid #ccc;
}
`