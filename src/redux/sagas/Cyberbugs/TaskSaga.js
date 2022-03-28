import { call, put, select, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../../util/constants/LoadingConst";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA } from "../../constants/Cyberbugs.js/TaskContant";


function * createTaskSaga (action) {

    yield put ({
        type: DISPLAY_LOADING
    })

    try {
        const {data,status} = yield call(()=>taskService.createTask(action.taskObject));

        if(status === STATUS_CODE.SUCCESS) {
            console.log(data)
    
        }
        yield put({
            type:'CLOSE_DRAWER'
        })
        notifiFunction('success', 'Create task successfully !')
    }

    
    catch(err) {
        console.log(err)
    }

    yield put ({
        type: HIDE_LOADING
    })
}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest('CREATE_TASK_SAGA',createTaskSaga)
}

//Nghiep vu 13/02/2022 -video 34
function * getTaskDetailSaga(action) {

    const {taskId} = action;

    try {
        const {data,status} = yield call(()=>taskService.getTaskDetail(taskId))
    
        yield put({
            type:GET_TASK_DETAIL,
            taskDetailModal:data.content
        })
    }
    catch(err) {
        console.log(err);
        console.log(err.response?.data);
    }
}

export function* theoDoigetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA,getTaskDetailSaga)
}

//Nghiep vu updatestatusTask 14/02/2022-video35
// eslint-disable-next-line require-yield
function * updateTaskStatusSaga(action) {

    const {taskUpdateStatus} = action;

    try{

        //Cập nhật api status cho task hiện tại (Task đang mở modal)
        const {data,status} = yield call(()=> taskService.updateStatusTask(taskUpdateStatus))
        
        //Sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task
        // console.log(data)
        if(status==STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_PROJECT_DETAIL',
                projectId:taskUpdateStatus.projectId
            })

            yield put({
                type:GET_TASK_DETAIL_SAGA,
                taskId:taskUpdateStatus.taskId
            })
        }
    }
    catch(err){
        console.log(err);
        console.log(err.response?.data);
    }
}

export function *theoDoiupdateTaskStatusSaga(){
    yield takeLatest(UPDATE_STATUS_TASK_SAGA,updateTaskStatusSaga)
}

//Nghiep vu updateTask 18/02/2022-video39
function *updateTaskSaga(action) {

}


export function*theoDoiUpdateTask(){
    yield takeLatest(UPDATE_TASK_SAGA,updateTaskSaga)
}



function* handelChangePostApi(action) {
    //Goi action lam thay doi taskDetail modal
    // eslint-disable-next-line default-case
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const {value,name} = action;
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            })
        };break;
        // eslint-disable-next-line no-fallthrough
        case CHANGE_ASSIGNESS: {
            const {userSelected} = action;
            yield put({
                type:CHANGE_ASSIGNESS,
                userSelected 
            })
        };break;
        // eslint-disable-next-line no-fallthrough
        case REMOVE_USER_ASSIGN: {
            const {userId} = action;
            yield put({
                type:REMOVE_USER_ASSIGN,
                userId
            })
        };break;
    }

    //Save qua api updateTaskSaga
    //Lấy dữ liệu từ state.taskDetailModal
    let {taskDetailModal} = yield select(state=>state.TaskReducer)
    console.log('taskDetailModal sau khi thay đổi', taskDetailModal)
    //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
    
    const listUserAsign = taskDetailModal.assigness?.map((user,index) => {
        return user.id
    });

    const taskUpdateApi = {...taskDetailModal,listUserAsign}
    // const objectApi = {
    //     "listUserAsign": [
    //       0
    //     ],
    //     "taskId": "string",
    //     "taskName": "string",
    //     "description": "string",
    //     "statusId": "string",
    //     "originalEstimate": 0,
    //     "timeTrackingSpent": 0,
    //     "timeTrackingRemaining": 0,
    //     "projectId": 0,
    //     "typeId": 0,
    //     "priorityId": 0
    //   }
    try {
        const {data,status} = yield call(()=> taskService.updateTask(taskUpdateApi))
    if(status==STATUS_CODE.SUCCESS) {
        yield put({
            type:'GET_PROJECT_DETAIL',
            projectId:taskUpdateApi.projectId
        })

        yield put({
            type:GET_TASK_DETAIL_SAGA,
            taskId:taskUpdateApi.taskId
        })
    }
    }catch(err){
        console.log(err.response?.data)
    }
}

export function* theoDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA,handelChangePostApi)
}