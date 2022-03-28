import React, { Component } from 'react'
import Axios from 'axios'
import './Todolist.css'


export default class TodolistRCC extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: 'GET'
        });
        promise.then((result) => {
            console.log(result.data)
            //Nếu gọi api lấy kết quả thành công => set lai state của compomemt
            this.setState({
                taskList: result.data
            })
            console.log('thanh cong')
        });
        promise.catch((err) => {
            console.log(err.response.data)
            console.log('that bai')
        });
    }

    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={()=>{
                        this.checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={()=>{
                        this.rejectTask(item.taskName)
                    }}>
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }

    //Xử lý reject task
    rejectTask = (taskName) => {
        let promise = Axios ({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            alert(res.data);
            this.getTaskList()
        })

        promise.catch(err=>{
            alert(err.response.data)
        })
    }

    //Xử lý done task
    checkTask = (taskName) => {
        let promise = Axios ({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            alert(res.data);
            this.getTaskList()
        })

        promise.catch(err=>{
            alert(err.response.data)
        })
    }


    //Hàm xử lý xoá task
    delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(result => {
            alert(result.data);
            this.getTaskList()
        });

        promise.catch(errors => {
            alert(errors.response.data)
        })
    }

    //Hàm sẽ tự động thực thi sau khi nội dung component được render
    componentDidMount() {
        this.getTaskList();
    }

    handleChange = (e) => {
        let { value, name } = e.target;  // lay gia tri valua name ra
        console.log(value, name);
        let newValues = { ...this.state.values };  //cap nhat vo state 

        newValues = { ...newValues, [name]: value }

        let newErrors = { ...this.state.errors };

        let regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
            let boxElement= document.querySelector('#addItem')
            boxElement.style.display = 'none';
        } else {
            newErrors[name] = '';
            let boxElement= document.querySelector('#addItem')
            boxElement.style.display = 'block';

        }

        // newErrors = {...newErrors,[name]:value.trim() === ""}

        this.setState({
            ...this.state,  //nhung gi state giu lai mang takslist  cua state do, chi cap nhat lai cai loi va du lieu nguoi dung nhap vao
            values: newValues,
            errors: newErrors
        })

    }

    addTask = (e) => {
        e.preventDefault(); //Dừng sự kiện submit form
        console.log(this.state.values.taskName)

        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: this.state.values.taskName }
        })

        //Xử lý thành công 
        promise.then(result => {
            console.log(result.data);
            this.getTaskList();  //goi lai ham nay GET API da xay dung de update lai tren giao dien ko can refest
        })

        //Xử lý thất bại
        promise.catch(errors => {
            // console.log(errors.response.data)
            alert(errors.response.data)
        })
    }

    render() {
        return (
            <form onSubmit={this.addTask}>
                {/* <button onClick={()=>{
                    this.getTaskList()
                }}>Get task list</button> */}
                <div className="card">
                    <div className="card__header">
                        <img src={require("./X2oObC4.png")} alt="" />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className='form-group'>
                                <div className="card__title">
                                    <h2>My Tasks</h2>
                                    <p>September 9,2020</p>
                                </div>
                                <div className="card__add">
                                    <input name="taskName" onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
                                    <button id="addItem" onClick={this.addTask}>
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                                <div>
                                    <li style={{ listStyleType: 'none' }} className='text text-danger'>{this.state.errors.taskName}</li>
                                </div>
                                {/* <p className='text text-danger'>{this.state.errors.taskName}</p> */}
                            </div>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
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
                                    {this.renderTaskToDoDone()}
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
                    </div>
                </div>
            </form>
        )
    }
}
