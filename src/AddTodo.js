import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {addTodo} from './TodoReducer';
import './App.css';

function AddTodo() {
    const[text,setText]=useState('');
    const todos=useSelector((state)=>state.todos);
    const dispatch=useDispatch();
    const SubmitHandler=(e)=>{
        e.preventDefault();
        const newTodo = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            text,
          };
          dispatch(addTodo(newTodo));
          setText('');
    }

  return (
    <>
    <div className='header'>
        <h1>MyTodos</h1>
    </div>
    <form onSubmit={SubmitHandler}>
    <div className="input-group mb-3">
        
        <input type="text"
        className="form-control rounded-start" 
        value={text}
        style={{height:'40px',width:'100px',boxSizing: 'border-box'}}
       
         onChange={(e)=>setText(e.target.value)}/>
         
         
         <button className="btn btn-primary rounded-end" type="submit">Save</button>
        
         </div>
    </form>
    </>
  )
}

export default AddTodo