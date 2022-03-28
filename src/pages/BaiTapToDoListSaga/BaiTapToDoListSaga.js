import React, { useEffect, useState } from 'react'
import './Todolist.css'
import Axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, REJECT_TASK_API } from '../../redux/constants/ToDoListConst';

export default function BaiTapToDoListSaga(props) {
    
    const dispatch = useDispatch();

    const {taskList} = useSelector(state => state.ToDoListReducer)


    let [state, setState] = useState({
        taskList: [],
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
        e.preventDefault();
        dispatch({
            type:ADD_TASK_API,
            taskName:state.values.taskName
        })
    }

    const getTaskList = () => {
        dispatch({
            type:GET_TASKLIST_API,
        })
    }

    //Xử lý reject task
    const rejectTask = (taskName) => {
        dispatch({
            type:REJECT_TASK_API,
            taskName:taskName
        })
    }

    //Xử lý done task
    const checkTask = (taskName) => {
        dispatch({
            type:CHECK_TASK_API,
            taskName:taskName
        })
    }


    //Hàm xử lý xoá task
    const delTask = (taskName) => {
        dispatch({
            type:DELETE_TASK_API,
            taskName:taskName
        })
    }

    //Hàm sẽ tự động thực thi sau khi nội dung component được render
    useEffect(() => {
        getTaskList()
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
            <button className='btn btn-success'onClick={()=>{
                dispatch({
                    type:'getTaskApiAction'
                })
            }}>Dispatch action saga getTaskApi</button>
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
