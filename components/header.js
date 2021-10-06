import Head from "next/head";
import {Layout,Row,Col} from "antd";
import Link from "next/link";
import Authlink  from "./authlink";
let style={
    backgroundColor:"#e91e63",
    paddingLeft:"15px",
    paddingRight:"15px"
}

function Header (){
    const {Header} = Layout;
    return (
             <Header style={style}>
                  <Row justify="space-between">
                      <Col>
                        <Link href="/">
                            <a className="header_link brand"> A-Note</a>
                        </Link>
                      </Col>
                      <Authlink/>
                  </Row>
             </Header>
    )
}


export default Header;