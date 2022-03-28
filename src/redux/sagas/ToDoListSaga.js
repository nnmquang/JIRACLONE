import { call, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../constants/ToDoListConst';
import {  toDoListService } from '../../services/ToDoListService';
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../util/constants/LoadingConst';
/*redux co 2 loai action:
Loai 1: action => Object (action thuong)
Loai 2: action => function (thuong dung de xu ly api hoac goi cac action khac)
*/


// function * getTaskApi() {

//     yield take('getTaskApiAction') //theo dõi action -> xem action nào dispatch mới làm các công việc bên dưới
//     console.log('getTaskApi');
//     //call api dispatch lên reducer
// }

// // eslint-disable-next-line require-yield
// export function * rootSaga(){

//     yield fork(getTaskApi); // non blocking chạy không cần chờ,là hàm bất đồng bộ


//     // console.log('rootSaga')
// }

/* 
19/01/2022 Quang viet chuc nang getTask
Action saga lay danh sach task tu API
*/
function* getTaskApiAction(action) {

    //put giống dispatch action
    yield put({
        type: DISPLAY_LOADING
    })

    
    try {
        let { data, status } = yield call(toDoListService.getTaskApi)
        yield delay(1000);  //delay tang trai nghiem nguoi dung
        if(status === STATUS_CODE.SUCCESS) {
             //Sau khi lay gia tri thanh cong dung put (giong dispatch ben thunk)
            yield put({
                type: GET_TASK_API,
                taskList: data
            });
        }else
        {
            console.log('erro')
        }
    }
    catch (err) {
        console.log('err')
    }

    yield put({
        type: HIDE_LOADING
    })

    // let {data,status} = yield call(()=>{
    //     return Axios({
    //         url:'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
    //         method: 'GET'
    //     })
    // })
    // console.log('result',result);
}

export function* theDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiAction)
}

/* 
19/01/2022 Quang viet chuc nang addTask
Action saga nghiep vu them task
*/

// eslint-disable-next-line require-yield
function * addTaskApiAction (action) {
    // console.log(action);
    const {taskName} = action;
    //Goi api
    try {
    const {data,status} = yield call(()=>{
        return toDoListService.addTaskApi(taskName)})
    if (status === STATUS_CODE.SUCCESS) {
        yield put({
            type:GET_TASKLIST_API
        })
    }

    }catch(err){
        console.log(err);
    }
    //Hien thi loading
    //thanh cong thi load lai task = cach goi lai action saga load tasklist
}       

export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API,addTaskApiAction)
}

/* 
19/01/2022 Quang viet chuc nang deleteTask
Action saga nghiep vu xoa task
*/

// eslint-disable-next-line require-yield
function* deleteTaskApi (action) {
    const {taskName} = action;

    try {
        //Goi api deletetask
        const {data,status} = yield call(()=>{
            return toDoListService.deleteTaskApi(taskName)
        });
        if(status === STATUS_CODE.SUCCESS) {
            //Neu thanh cong thi goi lai action GET_TASKLIST_API (action saga thuc thi)
            yield put({
                type: GET_TASKLIST_API
           })
        }
    }catch(err) {
        console.log(err);
    }
}


export function* theoDoiActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API,deleteTaskApi)
}

/* 
19/01/2022 Quang viet chuc nang doneTask
Action saga thuc hien nghiep vu done task
*/

// eslint-disable-next-line require-yield
function * checkDoneTaskApi (action) {
    const {taskName} = action;

    try {
        const {data,status} = yield call(()=>{
            return toDoListService.checkDoneTask(taskName)
        });
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_TASKLIST_API
            })
        }

    }catch(error) {
        console.log(error)
    }
}



export function* theoDoiActionDoneTaskApi() {
    yield takeLatest(CHECK_TASK_API,checkDoneTaskApi)
}

/* 
19/01/2022 Quang viet chuc nang rejectTask
Action saga thuc hien nghiep vu reject task
*/
// eslint-disable-next-line require-yield
function* rejectTaskApi(action) {
    const{taskName} = action
    try{
        const {data,status} = yield call(()=>{
            return toDoListService.rejectTask(taskName)
        });
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_TASKLIST_API
            })
        }

    }catch (error){
        console.log(error)
    }
}


export function* theoDoiActionRejectTaskApi() {
    yield takeLatest(REJECT_TASK_API,rejectTaskApi)
}