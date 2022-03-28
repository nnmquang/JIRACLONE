// import {call, fork, put, take, takeLatest} from 'redux-saga/effects';
// import Axios from 'axios';
// import { GET_TASK_API } from '../constants/ToDoListConst';
// /*redux co 2 loai action:
// Loai 1: action => Object (action thuong)
// Loai 2: action => function (thuong dung de xu ly api hoac goi cac action khac)
// */

import { all, call } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga'
import * as Cyberbugs from './Cyberbugs/UserCyberbugsSaga'
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga'
import * as ProjectSaga from './Cyberbugs/ProjectSaga'
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga'
import * as PrioritySaga from './Cyberbugs/PrioritySaga'
import * as TaskSaga from './Cyberbugs/TaskSaga'
import * as StatusSaga from './Cyberbugs/StatusSaga'
// import { theDoiActionGetTaskApi } from "./ToDoListSaga";


// // function * getTaskApi() {

// //     yield take('getTaskApiAction') //theo dõi action -> xem action nào dispatch mới làm các công việc bên dưới
// //     console.log('getTaskApi');
// //     //call api dispatch lên reducer
// // }

// // // eslint-disable-next-line require-yield
// // export function * rootSaga(){

// //     yield fork(getTaskApi); // non blocking chạy không cần chờ,là hàm bất đồng bộ


// //     // console.log('rootSaga')
// // }

// function* getTaskApi(action) {
    
//     let {data,status} = yield call(()=>{
//         return Axios({
//             url:'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
//             method: 'GET'
//         })
//     })

//     //Sau khi lay gia tri thanh cong dung put (giong dispatch ben thunk)
//     yield put({
//         type: GET_TASK_API,
//         taskList:data
//     })

//     // console.log('result',result);
// }

// export function* rootSaga() {
//     yield takeLatest('getTaskApiAction', getTaskApi) //ket hop giua thang fork va thang take dung de theo doi 1 action saga
// }

export function* rootSaga() {

    yield all([
        //Nghiep vu theo doi action saga todolist
        ToDoListSaga.theDoiActionGetTaskApi(),
        ToDoListSaga.theoDoiActionAddTaskApi(),
        ToDoListSaga.theoDoiActionDeleteTaskApi(),
        ToDoListSaga.theoDoiActionDoneTaskApi(),
        ToDoListSaga.theoDoiActionRejectTaskApi(),

        //Nghiep vu Cyberbugs
        Cyberbugs.theoDoiSignin(),
        Cyberbugs.theoDoiGetUser(),
        Cyberbugs.theoDoiAddUserProject(),
        Cyberbugs.theoDoiRemoveUserProject(),
        Cyberbugs.theoDoigetUserByProjectIdSaga(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProjectSaga(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetAllProjectSaga(),
        //Nghiep vu createTask
        TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
        PrioritySaga.theoDoiGetAllTaskTypeSaga(),
        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoigetTaskDetailSaga(),
        TaskSaga.theoDoiupdateTaskStatusSaga(),
        TaskSaga.theoDoiHandleChangePostApi(),
        TaskSaga.theoDoiUpdateTask(),
        StatusSaga.theoDoiGetAllStatusSaga(),


        //Nghiep vu tiep theo.....

    ])
}