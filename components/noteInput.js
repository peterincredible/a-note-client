import {useState} from "react";
import { Form, Input,SubmitButton} from 'formik-antd';
import {LockOutlined,MailOutlined,SendOutlined} from "@ant-design/icons";
import {Formik} from "formik";
import myaxios from "./myaxios";

let NoteInput = ({setLoading,mutate})=>{
    //initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
    let [toggle,setToggle] = useState(false);
    function onfocus(e){
        // let myinput = e.target;
        // let parent = myinput.parentElement;
        // let label = parent.parentElement.getElementsByTagName('label')[0]
        // label.classList.add("label_focus_color");
        // console.log(label.classList);

        // //console.log(parent.style);
        // parent.classList.add('focus_background');
        // // console.log(parent.classList);
        // // console.log(myinput.parentElement);
        setToggle(true);
    }
    function onblur(){
        setToggle(false);
    }
    async function myclick(){
        try{
            setLoading(true);
            let noteinput = document.getElementById("note");
            let data = {note:noteinput.value};
            data = await myaxios.post("/api/additem",data);
            console.log(data);
            mutate(async (note)=>([...note,data.data]));
            setLoading(false);
        }catch(e){
            console.log(e);
        }
      
    }
    return (
        <>
            <div className="note_main">
                <div className={toggle?"note_input_container focus_background":"note_input_container"}>
                     <LockOutlined style={{fontSize:"25px"}}/>
                     <input type="text" name="note" id="note" placeholder="Enter a new note" onFocus={onfocus} onBlur={onblur}/>
                     <span onClick={myclick} style={{cursor:"pointer"}}><SendOutlined style={{fontSize:"25px",color:"#e91e63"}}/></span>
                </div>
                <label className={toggle?"label_focus_color":""}>Description</label>
            </div>
        </>
    )
}

export default NoteInput;