import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import{ useNavigate }from 'react-router-dom'
import { changeName } from '../store/slices/name.slice';
import '../styles/inputPage.css'
import background from "../assets/background.jpeg";
import profesorOak from "../assets/Profesor_Oakk.png";
import { Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputForEnter = () => {

   const [inputValue,setInputValue] = useState('')
   const navigate = useNavigate()
   const dispatch = useDispatch()

   function enter(){
      dispatch(changeName(inputValue))
      navigate('/pokemons')
   }

   return (
        <div className='input-page'>

         <img className='background' src={background} alt="" />


         <div className='input-trainer-name'>
            <h1>Hi Trainer! What is your name?</h1>

         <div>
            <InputGroup className="mb-3">
        <Form.Control value={inputValue} onChange={e => setInputValue(e.target.value) } 
          placeholder="Your Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text onClick={enter} id="basic-addon2">Enter</InputGroup.Text>
      </InputGroup>

         </div>
            
            {/* <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value) }/>
            <button onClick={enter}>Enter</button> */}
      </div>

      <img className='oak-img' src={profesorOak}/>
      
      </div>
   );
};

export default InputForEnter;