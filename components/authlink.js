import Link from "next/link";
import {Col} from "antd";
import useUser from "../components/useUser";
import myaxios from "../components/myaxios";
import {useRouter} from "next/router";

let Authlink = ()=>{
    let router = useRouter();
    const{user,mutate,isLoggedOut,isLoggedIn} = useUser();
    if(typeof windows != "undefined"){
        if(localStorage.user){
            mutate(JSON.parse(localStorage.user));
        }
    }
    let style={
        header_link:{
            fontSize:"16px",
            color: "#000",
            fontWeight: 600,
            paddingLeft:"5px"
        }
    }
    let logout = async ()=>{
        try{
             let data = await myaxios.get('/api/logout');
             delete localStorage.token;
             delete localStorage.user;
             mutate(null);
             myaxios.removeauth();
             //router.push("/signin");

        }catch(e){
            console.log(e)
        }
    }
    return !user?
    (
        <Col>
        <Link href="/signin">
            <a className="" style={style.header_link}>SIGN IN</a>
        </Link>
        <Link href="/signup">
             <a className="" style={style.header_link}>SIGN UP</a>
        </Link>
      </Col>
    ):
    (
        <Col>
        <Link href="/signin">
            <a style={style.header_link} onClick={logout}>Log Out</a>
        </Link>
      </Col>
    )
}

export default Authlink;