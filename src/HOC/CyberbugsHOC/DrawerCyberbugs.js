import React, { useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import {useSelector,useDispatch} from 'react-redux'

export default function DrawerCyberbugs(props) {

    const { visible,ComponentContentDrawer,callBackSubmit,title } = useSelector(state=> state.drawerReducer);

    const dispatch = useDispatch();

    console.log('visible',visible)

    const showDrawer = () => {
        // setState({
        //     visible: true,
        // });
        dispatch({type:'OPEN_DRAWER'})  // co the viet dispatch({type:'OPEN_DRAWER', visible:true})
    };

    const onClose = () => {
        // setState({
        //     visible: false,
        // });
        dispatch({type:'CLOSE_DRAWER'})  //co the viet dispatch({type:'CLOSE_DRAWER', visible:false})
    };


    return (
        <>
            {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New account
            </Button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}

                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentContentDrawer}
                {/* <ComponentContentDrawer/> */}
            </Drawer>
        </>
    )
}
