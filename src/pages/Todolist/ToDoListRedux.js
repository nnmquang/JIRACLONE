import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { addTaskApi, checkTaskApi, deleteTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListAction';
import { GET_TASK_API } from '../../redux/constants/ToDoListConst';

export default function ToDoListRedux(props) {

    const {taskList} = useSelector(state => state.ToDoListReducer); //xoa .state tai 2 ham renderTaskToDO & renderTaskToDoDone
    const dispatch = useDispatch();   //goi dispatch thay cho state dong 83
    let [state, setState] = useState({
        // taskList: [],  //ko lay tasklist tu componen nua (lay tu state) => se lay qua hook useSelector-useDispatch
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    })

    console.log(state)
    const handleChange = (e) => {
        let { value, name } = e.target;  // lay gia tri valua name ra
        console.log(value, name);
        let newValues = { ...state.values };  //cap nhat vo state 

        newValues = { ...newValues, [name]: value }

        let newErrors = { ...state.errors };

        let regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === '' || e.which === 13) {
            newErrors[name] = name + ' invalid !';
            let boxElement = document.querySelector('#addItem')
            boxElement.style.display = 'none';
            alert('Khong duoc nhap so')
        } else {
            newErrors[name] = '';
            let boxElement = document.querySelector('#addItem')
            boxElement.style.display = 'block';

        }

        // newErrors = {...newErrors,[name]:value.trim() === ""}

        setState({
            ...state,  //nhung gi state giu lai mang takslist  cua state do, chi cap nhat lai cai loi va du lieu nguoi dung nhap vao
            values: newValues,
            errors: newErrors
        })
    }

    const addTask = (e) => {
        e.preventDefault(); //Dừng sự kiện submit form
        console.log(state.values.taskName)
        //Xu ly nhan du lieu tu nguoi dung nhap => goi action addTaskApi()
        dispatch(addTaskApi(state.values.taskName))

        // let promise = Axios({
        //     url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
        //     method: 'POST',
        //     data: { taskName: state.values.taskName }
        // })

        // //Xử lý thành công 
        // promise.then(result => {
        //     console.log(result.data);
        //     getTaskList();  //goi lai ham nay GET API da xay dung de update lai tren giao dien ko can refest
        // })

        // //Xử lý thất bại
        // promise.catch(errors => {
        //     // console.log(errors.response.data)
        //     alert(errors.response.data)
        // })
        
        
    }

    const getTaskList = () => {
        dispatch(getTaskListApi())
        // let promise = Axios({
        //     url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        //     method: 'GET'
        // });
        // promise.then((result) => {
        //     console.log(result.data)
        //     //Nếu gọi api lấy kết quả thành công => set lai state của compomemt
        //     // setState({
        //     //     ...state,
        //     //     taskList: result.data
        //     // })
        //     dispatch({
        //         type:GET_TASK_API,
        //         taskList:result.data
        //     })
        //     console.log('thanh cong')
        // });
        // promise.catch((err) => {
        //     console.log(err.response.data)
        //     console.log('that bai')
        // });
    }

    //Xử lý reject task
    const rejectTask = (taskName) => {
        dispatch(rejectTaskApi(state.values.taskName))
        // let promise = Axios ({
        //     url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        //     method: 'PUT'
        // });

        // promise.then(res => {
        //     alert(res.data);
        //     getTaskList()
        // })

        // promise.catch(err=>{
        //     alert(err.response.data)
        // })
    }

    //Xử lý done task
    const checkTask = (taskName) => {
        dispatch(checkTaskApi(state.values.taskName))
        // let promise = Axios ({
        //     url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        //     method: 'PUT'
        // });

        // promise.then(res => {
        //     alert(res.data);
        //     getTaskList()
        // })

        // promise.catch(err=>{
        //     alert(err.response.data)
        // })
    }


    //Hàm xử lý xoá task
    const delTask = (taskName) => {

        dispatch(deleteTaskApi(state.values.taskName))
        // let promise = Axios({
        //     url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        //     method: 'DELETE'
        // });

        // promise.then(result => {
        //     alert(result.data);
        //     getTaskList()
        // });

        // promise.catch(errors => {
        //     alert(errors.response.data)
        // })
        
    }

    //Hàm sẽ tự động thực thi sau khi nội dung component được render
    useEffect(() => {
        getTaskList();

        return () => {

        }
    }, [])

    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={()=>{
                        checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    const renderTaskToDoDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={()=>{
                        rejectTask(item.taskName)
                    }}>
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }

    return (
        <div className="card">
            <div className="card__header">
                <img src={require("./X2oObC4.png")} alt="" />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" name="taskName" type="text" placeholder="Enter an activity..." onChange={handleChange} />
                        <button id="addItem" type="submit" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                            {/* <li>
                                <span>Đi ngủ</span>
                                <div className="buttons">
                                    <button className="remove">
                                        <i className="fa fa-trash-alt" />
                                    </button>
                                    <button className="complete">
                                        <i className="far fa-check-circle" />
                                        <i className="fas fa-check-circle" />
                                    </button>
                                </div>
                            </li> */}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskToDoDone()}
                            {/* <li>
                                <span>Ăn sáng</span>
                                <div className="buttons">
                                    <button className="remove">
                                        <i className="fa fa-trash-alt" />
                                    </button>
                                    <button className="complete">
                                        <i className="far fa-check-circle" />
                                        <i className="fas fa-check-circle" />
                                    </button>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </form>
        </div>

    )
}
