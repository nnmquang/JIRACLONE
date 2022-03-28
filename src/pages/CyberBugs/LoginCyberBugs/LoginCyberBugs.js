import React from 'react';
import { Button, Input } from 'antd';
import { UserOutlined,LockOutlined,FacebookOutlined,TwitterOutlined } from '@ant-design/icons';
import {withFormik} from 'formik';
import * as Yup from 'yup';   //import thang nay de bat validate
import {connect} from 'react-redux';
import { USER_SIGNIN_API } from '../../../redux/constants/Cyberbugs.js/Cyberbugs';
import { signinCyberbugAction } from '../../../redux/actions/CyberBugsAction';

 function LoginCyberBugs(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

  return (
      <form onSubmit={handleSubmit} className='container' style={{height:window.innerHeight}}> 
          <div className='d-flex flex-column justify-content-center align-items-center'
          style={{height:window.innerHeight}}>
            <h3 className='text-center' style={{fontWeight:300,fontSize:35}}>Login CyberBugs</h3>
            <div className='d-flex mt-3'>
            <Input onChange={handleChange} style={{width:'100%',minWidth:300}} name='email' size="large" placeholder="email" prefix={<UserOutlined />} />
            </div>
            <div className='text-danger'>{errors.email}</div>
            <div className='d-flex mt-3'>
            <Input onChange={handleChange} style={{width:'100%',minWidth:300}} type="password" name='password' size="large" placeholder="password" prefix={<LockOutlined />} />
            </div>
            <div className='text-danger'>{errors.password}</div>
            <Button htmlType="submit" size='large' style={{minWidth:300,backgroundColor:'rgb(102,117,223)',color:'#fff'}} className='mt-5'>Login</Button>
          
          <div className='social mt-3 d-flex'>
            <Button style={{backgroundColor:'rgb(59,89,152)',color:'#fff'}}  shape='circle' icon={<FacebookOutlined />} size={"large"}>
            
            </Button>
            <Button type="primary ml-3" shape='circle' icon={<TwitterOutlined />} size={"large"}>
            
            </Button>
          </div>
          </div>

      </form>
  )
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({ 
        email: '',
        password: ''
    }),
  
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        password: Yup.string().min(6,'password must have min 6 characters').max(32, 'password have max 32 characters')

    }),

    handleChange: (values, { setSubmitting }) => {    //ham nay bi huy bo trong prop nen goi ko duoc, bat buoc phai co ham handlechange moi lay duoc gia tri value        console.log(values);
      },
  
    handleSubmit: ({email,password}, {props, setSubmitting }) => {

        // let action = {
        //     type:USER_SIGNIN_API,
        //     userLogin: {
        //         email:values.email,
        //         password:values.password
        //     }
        // }

        // props.history.push('/home')  //su dung thang nay khi login sai hay dung deu quay lai trang chu
        // setSubmitting(true);

        props.dispatch(signinCyberbugAction(email,password));

    // console.log(props)
    // console.log(values);
    },
  
    displayName: 'Login CyberBugs',
  })(LoginCyberBugs);



export default connect () (LoginCyberBugsWithFormik)