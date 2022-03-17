import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Container, Background, TopSection, TopLeft, TopRight, BodySection,
BodyLeft, BodyRight, InnerBR, Newproduct, Button, BodyLeftTop, Ul, Li, A,
BodyLeftContent, TextContent, BodyContentSection, ATop, ABody, ImageUp, CloudSpan,
InnerSection, InnerLeft, InnerRight, TextTitle, InputText, Inner, Price, Hr,
Label, DivInput, DivInputone, Divcenter, CloseIconItem, GridContainer, AreaDescr, EditorContainer} from './producnewElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {v4 as uuidv4} from 'uuid'
import {useDropzone} from 'react-dropzone'
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertToRaw, convertFromRaw,  } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'


const ProductNew = ({onSuccess}) => {
    const [one, setOne] = useState('active')
    const [two, setTwo] = useState()
    const [three, setThree] = useState()
    const [files, setFiles] = useState([])
    const [state, setState] = useState({profileImg: ''})
    const [images, setImages] = useState([])
    const [name, setName] = useState('New Product')
    const [docs, setDocs] = useState([])
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const {getRootProps:getRootfileProps, getInputProps:getInputfileProps} = useDropzone({
        noClick: true,
        accept: ['.zip', '.rar', '.png', '.jpg'],
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 1) {
                console.log('chi duoc chon 1 tep')
            } else {
                setFiles(
                    acceptedFiles.map((file) => Object.assign(file, {
                        // preview: URL.createObjectURL(file)
                    }))
                    )
                    setName(acceptedFiles[0].name.split('.').slice(0, -1).join('.'))
                }
            }
        })

    const {getRootProps:getRootimgProps, getInputProps:getInputimgProps} = useDropzone({
        noClick: true,
        accept: ['.png', '.jpg'],
        onDrop: (acceptedFiles) => {
            let Images = images
            acceptedFiles.map((file) => (
                file.preview = URL.createObjectURL(file)
            ))
            if (images.length > 0) {
                for (var i=0; i<acceptedFiles.length; i++) {
                    let check = true
                    for (var j = 0; j <images.length; j++) {
                        if (acceptedFiles[i].path === images[j].path) {
                            check = false
                            break
                        } else {
                            var temp = acceptedFiles[i]
                        }
                    }
                    if (check === true) {
                        Images.push(temp)
                    }
                }
            } else {
                acceptedFiles.map((x) => (
                    Images.push(x)
                ))
            }
            setImages(
                Images.map((x) => Object.assign(x))
            )
        }
    }) 

    const {getRootProps:getRootdocProps, getInputProps:getInputdocProps} = useDropzone({
        noClick: true,
        accept: ['.pdf'],
        onDrop: (acceptedFiles) => {
            let Docs = docs
            acceptedFiles.map((file) => (
                file.preview = URL.createObjectURL(file)
            ))
            if (docs.length > 0) {
                for (var i=0; i<acceptedFiles.length; i++) {
                    let check = true
                    for (var j = 0; j <docs.length; j++) {
                        if (acceptedFiles[i].path === docs[j].path) {
                            check = false
                            break
                        } else {
                            var temp = acceptedFiles[i]
                        }
                    }
                    if (check === true) {
                        Docs.push(temp)
                    }
                }
            } else {
                acceptedFiles.map((x) => (
                    Docs.push(x)
                ))
            }
            setDocs(
                Docs.map((x) => Object.assign(x))
            )
        }
    }) 

    const onefunc = () => {
        setOne('active')
        setTwo('')
        setThree('')
    }

    const twofunc = () => {
        setOne('')
        setTwo('active')
        setThree('')
    }

    const threefunc = () => {
        setOne('')
        setTwo('')
        setThree('active')
    }

    const onInputChange = (e) => {
        // const reader = new FileReader()
        // reader.onload = () => {
        //     if (reader.readyState === 2) {
        //     setState({profileImg: reader.result})
        //     }
        // }
        // reader.readAsDataURL(e.target.files[0])
        const file = e.target.files[0]
        const len = file.name.split('.').slice(0, -1).join('.').length
        const type = file.name.slice(len)
        let checkfile = false
        if (type === '.zip' || type === '.rar' || type === '.7z') checkfile = true
        if (e.target.files.length > 1) {
            console.log('chi duoc chon 1 file .rar hoac .zip')
        } else {
            if (checkfile === false) {
            console.log("phai duoc nen vao cac file sau \".zip, .rar, .7z\"")
            } else {
            file.preview = URL.createObjectURL(file)
            setFiles(e.target.files)
            setName(file.name.split('.').slice(0, -1).join('.'))
        }
    }
}

    const onInputChangeimg = (e) => {
        const file = e.target.files[0]
        const len = file.name.split('.').slice(0, -1).join('.').length
        const type = file.name.slice(len)
        let Images = images
        let checkfile = false
        if (type === '.png' || type === '.jpg' || type === '.jpeg') checkfile = true
        if (checkfile === false) {
            console.log("phai duoc nen vao cac file sau \".png, .jpg, .jpeg\"")
        } else {
            const acceptImages = []
            for (var i = 0; i < e.target.files.length; i++) {
                acceptImages.push(e.target.files[i])
            }
            acceptImages.map((file) => (
                file.preview = URL.createObjectURL(file)
            ))
            acceptImages.map(x => (
                x.path = x.name
            ))
            acceptImages.map(x => (
                delete x.name
            ))
            console.log(acceptImages)
            if (images.length > 0) {
                for (var k=0; k<acceptImages.length; k++) {
                    let check = true
                    for (var j = 0; j <images.length; j++) {
                        if (acceptImages[k].path === images[j].path) {
                            check = false
                            // console.log(acceptImages[k])
                            break
                        } else {
                            // console.log(acceptImages[k])
                            var temp = acceptImages[k]
                            console.log(check)
                        }
                    }
                    if (check === true) {
                        Images.push(temp)
                    }
                }
            } else {
                acceptImages.map((x) => (
                    Images.push(x)
                ))
            }
            setImages(
                Images.map((x) => Object.assign(x))
            )
        }
    }

    const onInputChangedoc = (e) => {
        const file = e.target.files[0]
        const len = file.name.split('.').slice(0, -1).join('.').length
        const type = file.name.slice(len)
        let Docs = docs
        let checkfile = false
        if (type === '.pdf' || type === '.txt' || type === '.doc' || type === '.docx' || type === '.xls' || type === '.xlsx') checkfile = true
        if (checkfile === false) {
            console.log("phai duoc nen vao cac file sau \".pdf, .txt, .doc, .xls\"")
        } else {
            const acceptDocs = []
            for (var i = 0; i < e.target.files.length; i++) {
                acceptDocs.push(e.target.files[i])
            }
            acceptDocs.map((file) => (
                file.preview = URL.createObjectURL(file)
            ))
            acceptDocs.map(x => (
                x.path = x.name
            ))
            acceptDocs.map(x => (
                delete x.name
            ))
            console.log(acceptDocs)
            if (docs.length > 0) {
                for (var k=0; k<acceptDocs.length; k++) {
                    let check = true
                    for (var j = 0; j <docs.length; j++) {
                        if (acceptDocs[k].path === docs[j].path) {
                            check = false
                            // console.log(acceptDocs[k])
                            break
                        } else {
                            // console.log(acceptDocs[k])
                            var temp = acceptDocs[k]
                            console.log(check)
                        }
                    }
                    if (check === true) {
                        Docs.push(temp)
                    }
                }
            } else {
                acceptDocs.map((x) => (
                    Docs.push(x)
                ))
            }
            setDocs(
                Docs.map((x) => Object.assign(x))
            )
        }
    }

    useEffect(() => {
        // console.log(images)
        // console.log(files)
        // console.log(docs)
        // console.log(onChange)
        console.log(editorState)
    })

    const u_id = 12345

    const onSubmit = (e) => {
    e.preventDefault();

    const uuid = uuidv4()

    for(let i = 0; i < files.length; i++) {
        const data = new FormData();
            data.append('uuid', uuid)
            data.append('u_id', u_id)
            data.append('file', files[i]);
        
            const res = axios.post('//localhost:8000/api/auth/product', data, u_id, uuid)
            try{
                console.log(`uuid: ${uuid}, u_id: ${u_id}`)
                onSuccess(res.data)
            } catch(err) {}
    }

    for(let i = 0; i < images.length; i++) {
        const data = new FormData();
        data.append('uuid', uuid)
        data.append('u_id', u_id)
            data.append('file', images[i]);
        
            const res = axios.post('//localhost:8000/api/auth/product', data, u_id, uuid)
            try{
                console.log(`uuid: ${uuid}, u_id: ${u_id}`)
                onSuccess(res.data)
            } catch(err) {}
    }

    for(let i = 0; i < docs.length; i++) {
        const data = new FormData();
            data.append('uuid', uuid)
            data.append('u_id', u_id)
            data.append('file', docs[i]);
            const res = axios.post('//localhost:8000/api/auth/product', data, u_id, uuid)
            try{
                console.log(`uuid: ${uuid}, u_id: ${u_id}`)
                onSuccess(res.data)
            } catch(err) {}
    }

    const x = editorState
    console.log(x)
    
    const res = axios.post('//localhost:8000/api/auth/description', x)
}

    const imagesx = images.map((file) => (
        <div key={file.name} style={{width: '200px', height:'150px', 'margin': '10px 0 0 10px',}}>
            <div>
                <img src={file.preview} style={{width: '100%', height: '150px', 'object-fit': 'cover' ,padding:'10px', border: '1px solid #c1c1c1', 'pointer-events': 'none'}} alt='preview' />
            </div>
        </div>
    ))

    // const filesx = files.map((file) => (
    //     <div key={file.path}>
    //         <div>
    //             {/* <img src={file.preview} style={{width: '200px'}} alt='preview' /> */}
    //             {file.path}
    //         </div>
    //     </div>
    // ))
    
    // const text = onChange.blocks.map(x => (
    //     <div>
    //         {x.text} <br/>
    //         {}
    //     </div>
    // ))

    const allowOnlyNumericsOrDigits = (e) => {		
		if(/\D/g.test(e.target.value)) {
			e.target.value = e.target.value.replace(/\D/g,'');
		}
	}

    return (
    <Container>
        <Background />
        <TopSection>
            <TopLeft>
                <Newproduct>{name}</Newproduct>
            </TopLeft>
            <TopRight>
                <Button className='publish-btn' onClick={onSubmit}>Publish</Button>
                {/* <Button className='preview-btn'>Preview</Button> */}
            </TopRight>
        </TopSection>
        <BodySection>
            <BodyLeft>
                <BodyLeftTop>
                    <Ul>
                        <Li className={one}><ATop href='#' onClick={onefunc} className={one}>3D MODEL FILES</ATop></Li>
                        <Li className={two}><ATop href='#' onClick={twofunc} className={two}>PREVIEW IMAGES</ATop></Li>
                        <Li className={three}><ATop href='#' onClick={threefunc} className={three}>TEXTURES & OTHER FILES</ATop></Li>
                    </Ul>
                </BodyLeftTop>
                <BodyLeftContent>
                    <BodyContentSection className={one} {...getRootfileProps()}>
                        <input {...getInputfileProps()}/>
                        {/* <div>{filesx}</div> */}
                        <InnerSection className='flex'>
                            <Divcenter>
                                <DivInputone>
                                    <TextContent>Drag files below or </TextContent>
                                </DivInputone>
                                <DivInput className='small'>
                                    <ABody type='file' onChange={onInputChange} multiple/>
                                    <Label>Browse</Label>
                                </DivInput>
                            </Divcenter>
                        </InnerSection>
                        {files.length > 0 ? (
                        <InnerSection>
                            <TextContent>{files[0].name}</TextContent>
                        </InnerSection>
                        ) : (
                            <>
                            <InnerSection className='flex'>
                                <CloudSpan>
                                    <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" />
                                </CloudSpan>
                            </InnerSection>
                            <ImageUp></ImageUp>
                            </>
                            )}
                    </BodyContentSection>
                    <BodyContentSection className={two} {...getRootimgProps()}>
                    <input {...getInputimgProps()}/>
                    <InnerSection className='flex'>
                            <Divcenter>
                                <DivInputone>
                                    <TextContent>Drag files below or </TextContent>
                                </DivInputone>
                                <DivInput className='small'>
                                    <ABody type='file' onChange={onInputChangeimg} multiple/>
                                    <Label>Browse</Label>
                                </DivInput>
                            </Divcenter>
                        </InnerSection>
                        {images.length > 0? (
                            <InnerSection className='widthfull'>
                            <GridContainer>
                                    {imagesx}
                            </GridContainer>
                            </InnerSection>
                        ) : (
                            <>
                                <InnerSection className='flex'>
                                    <CloudSpan>
                                        <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" />
                                    </CloudSpan>
                                </InnerSection>
                                <ImageUp></ImageUp>
                            </>
                        )}
                    </BodyContentSection>
                    <BodyContentSection className={three} {...getRootdocProps()}>
                    <input {...getInputdocProps()}/>
                    <InnerSection className='flex'>
                            <Divcenter>
                                <DivInputone>
                                    <TextContent>Drag files below or </TextContent>
                                </DivInputone>
                                <DivInput className='small'>
                                    <ABody type='file' onChange={onInputChangedoc} multiple/>
                                    <Label>Browse</Label>
                                </DivInput>
                            </Divcenter>
                        </InnerSection>
                        {docs.length > 0 ? (
                            <>  
                                {docs.map(x => (
                                    <InnerSection>
                                        <TextContent>{x.path}</TextContent>
                                    </InnerSection>
                                ))}
                            </>
                        ) : (
                            <InnerSection className='flex'>
                                <CloudSpan>
                                <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" />
                                </CloudSpan>
                            </InnerSection>
                        )}
                    </BodyContentSection>
                </BodyLeftContent>
            </BodyLeft>
            <BodyRight>
                <InnerBR className='flex border-bottom padding50'>
                    <InnerLeft>
                        <Inner>
                            <TextTitle>Title</TextTitle>
                        </Inner>
                        <Inner>
                            <InputText placeholder='  Product Title'></InputText>
                        </Inner>
                    </InnerLeft>
                    <InnerRight>
                        <Inner>
                            <TextTitle>Price</TextTitle>
                        </Inner>
                        <Inner className='flex'>
                            <InputText className='price' onChange={allowOnlyNumericsOrDigits}></InputText>
                            <Price>VND</Price>
                        </Inner>
                    </InnerRight>
                </InnerBR>
                <Hr/>
                <InnerBR>
                    <TextTitle>Description</TextTitle>
                </InnerBR>
                <InnerBR>
                    {/* <AreaDescr></AreaDescr> */}
                    <EditorContainer>

                    <Editor
                    
                    onChange={setEditorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    />
                    </EditorContainer>
                    
                    <EditorContainer>

                    {/* <Editor
                    defaultContentState={x}
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"/> */}
                    </EditorContainer>
                </InnerBR>
                <InnerBR>
                    <TextTitle>Video</TextTitle>
                </InnerBR>
                <InnerBR className='paddingtop0'>
                    <InputText placeholder='link your video...'/>
                </InnerBR>
            </BodyRight>
        </BodySection>
    </Container>
    )
}

export default ProductNew