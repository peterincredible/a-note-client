import {useState} from 'react';
import {formatDistanceToNow,formatDistanceToNowStrict} from 'date-fns';
import {Divider,Checkbox} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import myaxios from '../components/myaxios';
function Mynote({note,mutate}){
    let date = formatDistanceToNow(new Date(note.created_at),Date.now());
    let desc = note.note;
    let [checked,setchecked] = useState(note.checked);
    async function handleChange(){
        setchecked(!note.checked)//optimistic hope it is either checked or unchecked at the database;
        let data = await myaxios.get(`/api/checkedtrigger/${note.id}`);
        data = data.data;
        mutate(async notes=>notes.map(note=>note.id == data.id? data:note));
        setchecked(data.checked);
    }
    async function handleDelete(){
        try{
            mutate(async notes=>notes.filter(data=>data.id !== note.id));
            await myaxios.delete(`/api/deleteitem/${note.id}`);
            console.log("delete triigered");
        }catch(e){
            console.log('error in the handledelete handler');
            console.log(e);
        }
       
    }
   return (
       <>
        <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",padding:"10px 0"}}>
            <Checkbox className="mycheckbox" checked={checked} onChange={handleChange}/>
            {/*<Skeleton.Input active  size={"small"} />
                    <Skeleton.Input active  size={"small"} /> */} 
            <div style={{width:"80%",height:"50px"}}>
                    <span style={{fontSize:"12px",color:"rgba(0, 0, 0, 0.54)",fontWeight:400}}>{date}</span>
                    <p style={{fontSize:"16px"}}>{desc}</p>
            </div>
            <span onClick={handleDelete}><DeleteOutlined style={{fontSize:"25px",color:"rgba(0, 0, 0, 0.38)",cursor:"pointer"}}/></span>
        </div>
        <Divider/>
       </>
   )
}

export default Mynote;