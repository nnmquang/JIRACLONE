import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../../util/constants/LoadingConst";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/Cyberbugs.js/Cyberbugs";
import {history} from '../../../util/libs/history';
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from "../../constants/Cyberbugs.js/ProjectCyberbugsConstants";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs.js/UserConstants";

// eslint-disable-next-line require-yield
function* createProjectSaga(action) {
    console.log('actionSaga',action);

    //Hien thi Loading
    yield put ({
        type: DISPLAY_LOADING
    })
    yield delay (500);


    try {
            //Goi api lay du lieu ve
    // const {data,status} = yield call(()=> cyberbugsService.createProject(action.newProject))
        //Su dung api authorization
    const {data,status} = yield call(()=> cyberbugsService.createProjectAuthorization(action.newProject))

    //Goi api thanh cong thi dispatch len reducer thong qua put
    if(status === STATUS_CODE.SUCCESS) {
        console.log(data)

        // let history = yield select(state => state.HistoryReducer.history)
        history.push('/projectmanagement');
    }
    console.log('data',data)

    }catch(err) {
        console.log(err.response.data)
    }

    yield put ({
        type: HIDE_LOADING
    })
}





export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA',createProjectSaga)
}


// Saga dung de get all project tu api
// Quang-Code 26/1/2022

function*getListProjectSaga(action) {

    try {
        const {data,status} = yield call(()=> cyberbugsService.getListProject());

        //Sau khi lay du lieu tu api ve thanh cong
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_LIST_PROJECT',
                projectList:data.content
            })
        }
    }catch(err){
        console.log(err)
    }
}




export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA',getListProjectSaga)
}

//UpdateProject

function* updateProjectSaga(action) {
    // console.log('action123',action);
    
    //Hien thi Loading
    yield put ({
        type: DISPLAY_LOADING
    })
    yield delay (500);


    try {
            //Goi api lay du lieu ve
    // const {data,status} = yield call(()=> cyberbugsService.createProject(action.newProject))
        //Su dung api authorization
    const {data,status} = yield call(()=> cyberbugsService.updateProject(action.projectUpdate))

    //Goi api thanh cong thi dispatch len reducer thong qua put
    if(status === STATUS_CODE.SUCCESS) {
        console.log(data)

        // let history = yield select(state => state.HistoryReducer.history)
        // history.push('/projectmanagement');
    }
    //sau khi submit update lai danh sach ko can F5, dong thoi tat drawer thong qua thuoc tinh CLOSE_DRAWER
    //co the dung yield call(getListProjectSaga)
    yield put({
        type: 'GET_LIST_PROJECT_SAGA'
    })
    yield put({
        type:'CLOSE_DRAWER'
    })

    }catch(err) {
        console.log(err.response.data)
    }

    yield put ({
        type: HIDE_LOADING
    })
}

export function* theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA',updateProjectSaga)
}


//DeleteProject

function* deleteProjectSaga(action) {
    // console.log('action123',action);
    
    //Hien thi Loading
    yield put ({
        type: DISPLAY_LOADING
    })
    yield delay (500);


    try {
            //Goi api lay du lieu ve
    // const {data,status} = yield call(()=> cyberbugsService.createProject(action.newProject))
        //Su dung api authorization
    const {data,status} = yield call(()=> projectService.deleteProject(action.idProject))

    //Goi api thanh cong thi dispatch len reducer thong qua put
    if(status === STATUS_CODE.SUCCESS) {
        console.log(data)

        notifiFunction('success','Delete project is success!')

        // let history = yield select(state => state.HistoryReducer.history)
        // history.push('/projectmanagement');
    }else {
        notifiFunction('error','Delete project is fail!')

    }
    //sau khi submit update lai danh sach ko can F5, dong thoi tat drawer thong qua thuoc tinh CLOSE_DRAWER
    //co the dung yield call(getListProjectSaga)
    yield put({
        type: 'GET_LIST_PROJECT_SAGA'
    })
    yield put({
        type:'CLOSE_DRAWER'
    })

    }catch(err) {
        notifiFunction('error','Delete project is fail!')
        console.log(err.response.data)
    }

    yield put ({
        type: HIDE_LOADING
    })
}

export function* theoDoiDeleteProjectSaga() {
    yield takeLatest('DELETE_PROJECT_SAGA',deleteProjectSaga)
}



//GetProject_Detail- Quang viet 5/2/2022 - Video24

function* getDetailProjectSaga(action) {
    // console.log('action123',action);
    
    //Hien thi Loading
    yield put ({
        type: DISPLAY_LOADING
    })
    yield delay (500);


    try {

    const {data,status} = yield call(()=> projectService.getProjectDetail(action.projectId))

    //Lấy dữ liẹu thành công thì đưa dữ liệu lên redux
    yield put({
        type:'PUT_PROJECT_DETAIL',
        projectDetail:data.content
    })

    }catch(err) {
        console.log('404 not found !')
        history.push('/projectmanagement');

    }

    yield put ({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest('GET_PROJECT_DETAIL',getDetailProjectSaga)
}

//Nghiep vu getAllProject 08-02-2022 video28

function* getProjectAllSaga(action) {
    // console.log('action123',action);
    
    //Hien thi Loading
    yield put ({
        type: DISPLAY_LOADING
    })
    yield delay (500);


    try {

    const {data,status} = yield call(()=> projectService.getAllProject())

    //Lấy dữ liẹu thành công thì đưa dữ liệu lên redux
    yield put({
        type: GET_ALL_PROJECT,
        arrProject:data.content
    })

    yield put({
        type:GET_USER_BY_PROJECT_ID_SAGA, //nghiep vu lay use assign lan dau tien video 31 11/02/2022
        idProject:data.content[0]?.id
    })

    }catch(err) {
        console.log('404 not found !')
        history.push('/projectmanagement');

    }

    yield put ({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA,getProjectAllSaga)
}
