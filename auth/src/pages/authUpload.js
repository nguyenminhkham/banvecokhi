import axios from 'axios';
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid' 
import ProductNew from '../components/productsnew';

const AuthUpload = ({onSuccess}) => {
  const [files, setFiles] = useState([])
  const [state, setState] = useState({profileImg: ''})

  const onInputChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setState({profileImg: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
    setFiles(e.target.files)
    console.log(state)
  }

const u_id = 12345

const onSubmit = (e) => {
  e.preventDefault();

  const uuid = uuidv4()
  
  for(let i = 0; i < files.length; i++) {
    const data = new FormData();
      data.append('file', files[i]);
      
      const res = axios.post('//localhost:8000/api/auth/product', data, u_id, uuid)
        try{
          console.log(`uuid: ${uuid}, u_id: ${u_id}`)
          onSuccess(res.data)
        } catch(err) {}
  }

  
};
  
  return (
    <>
        {/* <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file"
                  onChange={onInputChange}
                  className="form-control"
                  multiple/>
            </div>
            <button>Submit</button> <br/>
        </form> */}
      <ProductNew />
    </>
  )
}

export default AuthUpload