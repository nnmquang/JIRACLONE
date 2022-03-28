import React, {useState,useEffect} from "react";
import { Route } from "react-router-dom";
import { Button,Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;








export const UserLoginTemplate = (props) => {

    // const [size,setSize] = useState({width:window.innerWidth,height:window.innerHeight}); //set lai kich thuoc man hinh
    const [{width,height},setSize] = useState({width:window.innerWidth,height:window.innerHeight});
    useEffect(()=>{
        window.onresize = () => { 
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    },[])

    let {Component,...restRoute} = props;   // tách componet và tách những thằng còn lại exact và path trang App.js
   
    return <Route {...restRoute} render={(propsRoute)=>{
        return <>
            {/* <Component {...propsRoute}/> */}
            <Layout>
                {/* <Sider width={Math.round(size.width/2)} style={{height:size.height,
                backgroundImage:'url(https://picsum.photos/2000)', backgroundSize:'100%'}}>
                </Sider> */}
                <Sider width={width/2} style={{height:height,backgroundImage:`url(https://picsum.photos/${Math.round(width/2)}/${height})`, backgroundSize:'100%'}}>
                </Sider>

                <Content>
                <Component {...propsRoute}/> {/*  Phải truyền {...propsRoute} thì mới có thuôc tính history, match... */}
                </Content>
            </Layout>
        </>
    }} />
}