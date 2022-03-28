import Axios from 'axios';
import { GET_TASK_API } from '../constants/ToDoListConst';



export const getTaskListApi = () => {


    return dispatch => {
        let promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: 'GET'
        });
        promise.then((result) => {
            console.log(result.data)
            //Nếu gọi api lấy kết quả thành công => set lai state của compomemt
            // setState({
            //     ...state,
            //     taskList: result.data
            // })
            dispatch({
                type:GET_TASK_API,
                taskList:result.data
            })
            console.log('thanh cong')
        });
        promise.catch((err) => {
            console.log(err.response.data)
            console.log('that bai')
        });
    }
}

export const addTaskApi = (taskName) => {
    return dispatch => {
        //Xu ly truoc khi dispatch
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: taskName }
        })

        //Xử lý thành công 
        promise.then(result => {
            console.log(result.data);
            dispatch(getTaskListApi())
            // getTaskList();  //goi lai ham nay GET API da xay dung de update lai tren giao dien ko can refest
        })

        //Xử lý thất bại
        promise.catch(errors => {
            // console.log(errors.response.data)
            alert(errors.response.data)
        })
    }
}

export const deleteTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(result => {
            alert(result.data);
            //sau khi thuc hien api goi phuong thuc dispatchAction get TaskListApo de load lai task
            dispatch(getTaskListApi())
        });

        promise.catch(errors => {
            alert(errors.response.data)
        })
    }
}

export const checkTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios ({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
    
        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi())
        })
    
        promise.catch(err=>{
            alert(err.response.data)
        })
    }
}

export const rejectTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios ({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
    
        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi())
        })
    
        promise.catch(err=>{
            alert(err.response.data)
        })
    }
}