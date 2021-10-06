import {useState,useEffect} from 'react';
import {Typography,Avatar,Upload,Button,message}from "antd";
import {UserOutlined,CameraOutlined} from "@ant-design/icons";
import useUser from "../components/useUser";
import MySpin from '../components/myspin';

let Myavatar = ()=>{
    let token = "";
    let {user,mutate} =useUser();
    let [loading,setloading] = useState(false);
   let {Title} = Typography;
   if(typeof window !== "undefined"){
       token  = localStorage.token;
   }
   console.log(token)
   const uploadprops = {
    name: 'avatar',
    action: 'http://localhost:8000/api/updateimage',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange(info) {
        setloading(true);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(info.file.response);
        let image = info.file.response.image;
        mutate(async user=>({...user,image}));
        message.success(`${info.file.name} file uploaded successfully`);
        setloading(false);
        
      } else if (info.file.status === 'error') {
        setloading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
useEffect(()=>{

},[user])
    return ( 
            <div style={{display:"flex",alignItems:"center",flexDirection:"column",position:"relative"}}>
                <Title level={4}>Profile</Title>
                <div style={{position:"relative"}}>
                    {user?.image ? <Avatar src={user.image}size={75}/> : <Avatar icon={<UserOutlined/>} size={75}/>}
                    <Upload  className="my_badge" showUploadList={false} {...uploadprops}>
                        <Avatar icon={<CameraOutlined style={{fontSize:"20px"}}/>} size={30} style={{backgroundColor:"#e91e63"}}/>
                    </Upload>
                </div>
                <div style={{width:"100%",marginTop:"20px"}}>
                    <Upload className="upload_btn" showUploadList={false} {...uploadprops}>
                        <Button style={{backgroundColor:"#e91e63"}}>Click to Upload</Button>
                    </Upload>
                </div> 
                {loading&&<MySpin/>}
            </div>
        )
}

export default Myavatar;