import {useEffect,useState} from "react";
import {Layout,Row,Col,Typography,Space,message} from "antd";
import {UserOutlined,MailOutlined} from "@ant-design/icons";
import {Formik} from "formik";
import { Form, Input,SubmitButton} from 'formik-antd'
import * as yup from "yup";
import Ripples from 'react-ripples'
import Header from "../components/header";
import myaxios from "../components/myaxios";
import Myavatar from "../components/avatar";
import router from "next/router";
import useUser from "../components/useUser";

let Profile = ()=>{
      let {Content} = Layout
      let {Title} = Typography
      let [data,setdata] = useState({username:"",email:""});
      let {mutate,isLoggedOut,user} = useUser();
      

    useEffect(function(){
              if(isLoggedOut){
                router.push("/signin");
              }
              if(user){
                  setdata({username:user.name,email:user.email});
                  console.log(data);
              }
    },[user,isLoggedOut,data])
    console.log(user);
    async function onSubmit(values){
        try{
            let data =  await myaxios.post('/api/edituserdata',values);
            data = data.data;
            let user =data.user
            message.success("datas successfully changed");
            mutate(user,false);
        }catch(e){
            message.error("data not updated and never changed")
        }  
    } 

    let validationSchema =  yup.object().shape({
        username:yup.string().required("username field is required").min(6,"min be a minimum of").max(20,"must not be above"),
        email:yup.string().email('must be an email').required("email field is required")
    });
    let passwordschema= yup.object().shape({
        password:yup.string().required("password field is required").min(3,"must be a minimum of 3 characters"),
        new_password:yup.string().required("password field is required").min(3,"must be a minimum of 3 characters")
    });
    async function passwordSubmit(values){
        try{
            console.clear();
            console.log(values)
            let data =  await myaxios.post('/api/editpassword',values);
            data = data.data;
            let user =data.user
            message.success("password successfully changed");
            mutate(user,false);
        }catch(e){
            message.error("current password not correct pls check your spelling")
        }
    }
    return(
        <>
          <Layout className="fullheight">
              <Header/>
              <Content>
                  <Row justify="center" className="fullheight">
                      <Col xs={{span:22}} sm={{span:15}} md={{span:9}} xl={{span:6}}>
                        <Space direction="vertical" style={{width:"100%"}} size="large">
                           <Myavatar/>
                           <Formik initialValues={data} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize={true}>
                                <Form>
                                    <Form.Item name="username" style={{fontSize:"30px"}}>
                                        <Input suffix={<UserOutlined className="site-form-item-icon" />} name="username" placeholder="input username"
                                                onChange={Formik.onChange}
                                                style={{height:"50px",fontSize:"25px"}}
                                                
                                        />
                                    </Form.Item>
                                    <Form.Item name="email" style={{fontSize:"30px"}}>
                                        <Input suffix={<MailOutlined className="site-form-item-icon"/>} 
                                                name="email" placeholder="input Email"
                                                onChange={Formik.onChange}
                                                style={{height:"50px",fontSize:"25px"}}
                                                
                                        />
                                    </Form.Item>
                                    <Ripples style={{width:"100%"}}><SubmitButton className="w-100 form-btn">UPDATE INFORMATION</SubmitButton></Ripples>
                                </Form>
                            </Formik>
                            <Formik  onSubmit={passwordSubmit} validationSchema={passwordschema} initialValues={{password:"",new_password:""}}>
                                <Form>
                                    <Form.Item name="password">
                                        <Input.Password placeholder="CURRENT PASSWORD" 
                                                        name="password"
                                                        onChange={Formik.onChange}
                                                        style={{height:"50px",fontSize:"25px"}}
                                        />
                                    </Form.Item>
                                    <Form.Item name="new_password">
                                        <Input.Password placeholder="NEW PASSWORD" 
                                                        name="new_password"
                                                        onChange={Formik.onChange}
                                                        style={{height:"50px",fontSize:"25px"}}
                                                       
                                        />
                                    </Form.Item>
                                    <Ripples style={{width:"100%"}}><SubmitButton className="w-100 form-btn">CHANGE PASSWORD</SubmitButton></Ripples>
                                </Form>
                            </Formik>
                        </Space>      
                              
                             
                           <div>

                           </div>
                      </Col>
                  </Row>
              </Content>
          </Layout>
        </>
    )
}

export default Profile;