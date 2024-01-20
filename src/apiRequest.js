const apiRequest = async (url="", optionObj=null,errMsg=null)=>{
  try {
    const response = await fetch (url,optionObj);
    if(!response.ok)throw Error("please Reload the page")
  } catch (error) {
    errMsg = error.Message;
  }finally{
    return errMsg
  }
}

export default apiRequest