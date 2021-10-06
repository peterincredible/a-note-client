import {useEffect,useState} from "react";
import Head from 'next/head'
import useUser from "../components/useUser";
import useNote from "../components/useNote";
import myaxios from "../components/myaxios";
import {useRouter} from "next/router";
import {Layout,Row,Col} from "antd";
import Header from "../components/header";
import NoteInput from "../components/noteInput";
import MySkeleton from "../components/MySkeleton";
import Mynote from "../components/mynote";
import Ripples from "react-ripples"



export default function Home() {
   let router = useRouter();
   let {Content} = Layout;
  let {user,isLoggedOut,isLoggedIn} = useUser();
  let {notes,noteloading,mutate} = useNote(user);
  console.log(notes);
  let [loading,setLoading] = useState(false);


  useEffect(function(){
        if(isLoggedOut){
           router.push('/signin');
        }
  },[isLoggedOut,router]);
  return (
      <>
         <Head><title>Home</title></Head>
             <Layout className='fullheight'>
               <Header/>
                  <Layout> 
                      <Content>
                        <Row className="fullheight" justify="center">
                          <Col xs={{span:22}} sm={{span:16}} md={{span:14}} xl={{span:10}} xxl={{span:8}}>
                                <NoteInput mutate={mutate} setLoading={setLoading}/>
                                {notes?.map((note,i)=>{
                                      return(
                                            <Ripples className="mk_ripple" key={i}>
                                                <Mynote key={i} note={note} mutate={mutate}/>
                                                </Ripples>
                                                )
                                                }
                                                )
                                                }
                                {loading&&<Ripples className="mk_ripple"><MySkeleton/></Ripples>}
                                
                          </Col>
                        </Row>
                      </Content>
                  </Layout>
             </Layout>
      </>
  )

}

