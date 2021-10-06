import axios from "axios";
let myaxios= axios.create({
    baseURL: 'http://localhost:8000'
  });

  myaxios.addauth=function(token){
    this.defaults.headers.common['Authorization'] =`Bearer ${token}`;
  }
  myaxios.isauth= function (){
      return this.defaults.headers.common['Authorization']?true:false;
  }
  myaxios.removeauth=function(){
      delete this.defaults.headers.common['Authorization'];
  }
  export default myaxios;
  