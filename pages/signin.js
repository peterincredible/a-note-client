import {useEffect} from "react";
import Header from "../components/header";
import Head from "next/head";
import {Layout,Row,Col,Button} from "antd"
import {LockOutlined,MailOutlined} from "@ant-design/icons";
import { Form, Input,SubmitButton} from 'formik-antd'
import Link from "next/link";
import {Formik} from "formik";
import * as yup from "yup";
import Ripples from 'react-ripples'
import myaxios from "../components/myaxios";
import {useRouter} from "next/router";
import useUser from "../components/useUser";


let style={
    form_banner:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    icon_holder:{
        backgroundColor:"#00bfa5",
        width:"40px",
        height:"40px",
        borderRadius:"50%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
}
let Signin =()=>{
    let {mutate,user} = useUser();
    let {Content} = Layout
    let initialValues={email:"",password:""}
    let validationSchema = yup.object().shape({
        email:yup.string().email("must be a valid email").required("email is required"),
        password:yup.string().required("password field is required").min(3,"password must be abov 3 character")
    });
    let router = useRouter();
    async function onSubmit(values){
        try{
            await myaxios.get('/sanctum/csrf-cookie');
            let data =  await myaxios.post('/api/login',values);
            data = data.data;
            let user =data.user
            myaxios.addauth(data.token);
            localStorage.token=data.token;
            localStorage.user=JSON.stringify(user);
            console.log(user);
            mutate(user);
         

        }catch(e){
            console.log(e)
        }  
    }
    useEffect(()=>{
        if(user) router.push("/");
    },[user,router])
   return (
        <>
           <Head><title>signin</title></Head>
            <Layout className='fullheight'>
                <Header/>
                <Content>
                    <Row className="fullheight" justify="center">
                        <Col xs={{span:22}} sm={{span:15}} md={{span:9}} className="form_col">
                            <div style={style.form_banner} >
                                <span style={style.icon_holder}>
                                     <LockOutlined  style={{fontSize:"20px",color:"white"}}/>
                                </span>
                                <h2>Sign In</h2> 
                            </div>
                            <div className="">
                               <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                    <Form>
                                        <Form.Item name="email" style={{fontSize:"30px"}}>
                                            <Input suffix={<MailOutlined className="site-form-item-icon"/>} 
                                                    name="email" placeholder="input Email"
                                                     onChange={Formik.onChange}
                                                     style={{height:"50px",fontSize:"25px"}}
                                            />
                                        </Form.Item>
                                        <Form.Item name="password">
                                            <Input.Password placeholder="input your password" 
                                                            name="password"
                                                            onChange={Formik.onChange}
                                                            style={{height:"50px",fontSize:"25px"}}
                                            />
                                        </Form.Item>
                                      
                                           <Ripples style={{width:"100%"}}><SubmitButton className="w-100 form-btn">submit</SubmitButton></Ripples>
                                        
                                       
                                        <Link href="/signup">
                                            <a style={{color:"#e91e63",marginTop:"5px",display:"inline-block"}}>Dont have an account?Sign Up</a>
                                        </Link>
                                    </Form>
                               </Formik>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    )
}

export default Signin;