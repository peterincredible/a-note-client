import {useEffect} from "react";
import myaxios from "../components/myaxios";
import useSwr from "swr";

/*if(!myaxios.isauth()){
    if(LocalStorage.token){
      myaxios.addauth(localStorage.token);
    }
}*/
let useUser =()=>{
if(typeof window !== "undefined"){
    if(!myaxios.isauth()){
        if(localStorage.token){
          myaxios.addauth(localStorage.token);
        }
    }
}

let  myfetcher = async function(url){
  try{
    let data =  await myaxios.get(url);
    console.log(data);
    return data.data.message;
  }catch(e){
    console.log("error cather hippi");
        console.dir(e.response.status);
      let error = new Error("yep error");
      error.status = e.response.status;
      throw error;
  }
}
let {data,error,mutate} = useSwr(`/api/userdetails`,myfetcher );
let user = data;
//console.dir(error);
let isLoggedOut = error && error.status == 401
let isLoggedIn = user && !error;
let isError = error
return {user,isLoggedOut,isLoggedIn,isError,mutate}
}

export default useUser;