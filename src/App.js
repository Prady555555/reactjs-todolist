import { Header } from './Header';
import './App.css';
import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import apiRequest from "./apiRequest"

function App() {
 const URL_link = ' http://localhost:3500/items';
const [items,setItems] = useState([])
const [Input , setInput]  = useState('');
const [Search , setSearch]  = useState('');
const [fetchError ,setfetchError]  = useState(null);
const [isloading,setisloading]= useState(true);






useEffect(()=>{
  const fetchItems = async()=>{
    try {
      const response = await fetch(URL_link);
      if(!response.ok)throw Error("Data not received");
      const listItems = await response.json();
      setItems(listItems);
      setfetchError(null);
    } catch (error) {
      
      setfetchError(error.message)
    }finally{
      setisloading(false)
    }
  }
setTimeout(()=>{
  (async()=> await fetchItems())();
},2000)
 


},[])

const blueTick = async (id)=>{
   const itemss = items.map((element)=>(
    element.id===id ? { ...element,checked:!element.checked} : element
   ))
   setItems(itemss);
  //  localStorage.setItem("todo",JSON.stringify(itemss));
  const myitem = itemss.filter((item)=>item.id===id)
  const updateOption = {
    method:'PATCH',
    headers:{
      'content-Type':'application/json'
    },
    body: JSON.stringify({checked:myitem[0].checked})
  }
  const reqUrl = `${URL_link}/${id}`
  const result = await apiRequest(reqUrl,updateOption)
  if(result) setfetchError(result);
}

const deleteButton = async(id)=>{
 
  const idex = items.filter((element)=>(
    element.id !== id  
  ));
  setItems(idex);

  const deleteOptions ={method:'DELETE'}
  const reqUrl = `${URL_link}/${id}`
  const result = await apiRequest(reqUrl,deleteOptions)
  if(result)setfetchError(result);


  // localStorage.setItem("todo",JSON.stringify(idex));
}

const addnewList = async (item)=>{
  const id = items.length ? items[items.length-1].id + 1 : 1;

 const newList = {id,name:item,checked:false};
 const add = [...items,newList];
 setItems(add);
//  localStorage.setItem("todo",JSON.stringify(add));

const postOptions ={
  method:'POST',
  headers:{
    'content-Type':'application/json'
  },
  body: JSON.stringify(newList)

}
const result = await apiRequest(URL_link,postOptions);
if(result)setfetchError(result);
}

const input_Function = (e)=>{
   e.preventDefault();
   
   addnewList(Input);
   setInput("")
}  




  return(
    
   
    <div className="App"> 
     
    {!isloading&&!fetchError&&<Header 
    treat={"To do List"}
    items={items.filter(ite => (ite.name.toLowerCase()).includes(Search.toLowerCase()))}
    blueTick={blueTick}
    deleteButton={deleteButton}
    input_Function={input_Function}
    Input = {Input}
    setInput={setInput}
    Search={Search}
    setSearch={setSearch}
    
    
  
    />}
     {fetchError&&<p>{`Error:${fetchError}`}</p>}
     {isloading&&<p>{`Loading...`}</p>}
    
     {!isloading&&!fetchError&&<Footer len={items.length}/> }
    </div>
  )
    
   
}

export default App;
