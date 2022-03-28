import React, { useState } from 'react'
import Profile from '../Profile/Profile';
import {Prompt} from 'react-router-dom'

export default function Login(props) {

    const [userLogin,setUserLogin] = useState ({username:'',password:'',status:false})

    console.log(userLogin)
    const handleChange = (event) =>{
        const {name,value} = event.target;
        // setUserLogin({
        //     ...userLogin,
        //     [name]:value
        // });
        const newUserLogin = {
            ...userLogin,
             [name]:value
        };

        for(let key in newUserLogin) {
            if(key !== 'status') {
                if(newUserLogin[key].trim()===''){
                    newUserLogin.status = true;
                }
            }
        }
        setUserLogin(newUserLogin);


    }

    const handleLogin = (event) => {
        event.preventDefault();
        if(userLogin.username === 'cyberlearn' && userLogin.password === 'cyberlearn') {
            //Thành công thì chuyển về trang trước đó
            // props.history.goBack();
            //Chuyển đến trang chỉ định sau khi xử lý
            // props.history.push('/home');

            //replace thay đổi nội dung path tương ứng
            // props.history.replace('/home');
            props.history.goBack();
            localStorage.setItem('userLogin',JSON.stringify(userLogin))

        }else {
            alert('Login Fail')
            return;
        }
    }

    return (
        <div>
            <form className='container' onSubmit={handleLogin}>
                <h3 className='display-4'>Login</h3>
                <div className='form-group'>
                    <p>User Name</p>
                    <input name="username" className='form-control' onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <p>Password</p>
                    <input name="password" className='form-control' onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <button className='btn btn-success'>Login</button>
                </div>
            </form>
            <Prompt when={userLogin.true} message={(location)=>{

                return 'Ban co muon roi khoi trang nay !'
            }} />
        </div>
    )
}
