import {Skeleton,Divider,Space} from "antd";
import {DeleteOutlined} from "@ant-design/icons";


function MySkeleton (){

    return(
        <>
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",padding:"10px 0",width:"100%"}}>
               <span className="sk_span"></span> 
               {/*<Skeleton.Input active  size={"large"} /> */} 
               <div style={{width:"80%",height:"40px"}}>
                        <Skeleton.Input active  size={"small"} />
                        <Skeleton.Input active  size={"small"} /> 
               </div>
               <DeleteOutlined style={{fontSize:"25px",color:"rgba(0, 0, 0, 0.38)"}}/>
            </div>
            <Divider/>
        </>
    )
}

export default MySkeleton;