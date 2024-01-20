import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
export const Header = (props) => {



  return (
    <div className="App">
    <div className='headerbox'>
     <h1 className='TodoList-heading'>{props.treat}</h1>
     <div className="input-div">
      <form onSubmit={props.input_Function}>
      
        <input type="text" placeholder='Type your activity' value={props.Input} required
        onChange={(e)=>{props.setInput(e.target.value)}}
         />
        <button>ADD</button>
      </form>
     </div>

     <div className="Search-div">
      <form onSubmit={(e)=>{ e.preventDefault()}}>
      
        <input type="text" placeholder='Search your activity' value={props.Search} required
        onChange={(e)=>{props.setSearch(e.target.value)}}
         />
        <button>Search</button>
      </form>
     </div>


    </div>
      <header className="App-header">
      
      {props.items.length ? (
      <ul>
      {props.items.map((element)=>(
        <li key={element.id}>
          <input type="checkbox" checked = {element.checked}
            onChange={()=>props.blueTick(element.id)}
           
          />
          <label 
           style={(element.checked===true)? {textDecoration:"line-through"} : null}  >{element.name}
           </label>
          <FaRegTrashAlt onClick={()=>props.deleteButton(element.id)} 
            
          />
         
        </li>
        
       
        ))}
      </ul>
    ) : (
     <p>your list is empty</p>
    )

    }
     
     
      </header>
    </div>
  );
}
