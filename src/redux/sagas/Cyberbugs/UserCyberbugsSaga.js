import Axios from 'axios';
import { call, delay, fork, put, take, takeLatest, select } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../../util/constants/LoadingConst';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { USER_SIGNIN_API, USLOGIN } from '../../constants/Cyberbugs.js/Cyberbugs';
import {history} from '../../../util/libs/history'
import { userService } from '../../../services/UserService';
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from '../../constants/Cyberbugs.js/UserConstants';


// Quản lý action
// eslint-disable-next-line require-yield
function * signinSaga(action) {
    console.log(action);
    
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(2000);
    //Goi API
    try {
        const {data,status} = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin));
        console.log(data)

        //Lưu vào localStorage khi đăng nhập thành công
        localStorage.setItem(TOKEN,data.content.accessToken) // ham luu du lieu token vao localstorage
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content)); //luu vao localstorage ko the luu vao object se bien doi stringify

        yield put ({
            type:USLOGIN,
            userLogin: data.content
        })


        // let history = yield select(state => state.HistoryReducer.history)
        history.push('/home')

    }catch(err){
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiSignin(){
    yield takeLatest(USER_SIGNIN_API,signinSaga)
}

// Quản lý action
// eslint-disable-next-line require-yield
function * getUserSaga(action) {
    
    //action.keyWord
    console.log('keyword',action.keyWord);
    //Goi API
    try {
        const {data,status} = yield call(() => userService.getUser(action.keyWord));
        console.log('data', data)

        yield put({
            type: 'GET_USER_SEARCH',
            listUserSearch:data.content
        })
        

    }catch(err){
        console.log(err.response.data)
    }
}

export function * theoDoiGetUser(){
    yield takeLatest("GET_USER_API",getUserSaga)
}

// Quản lý action
// eslint-disable-next-line require-yield
function * addUserProjectSaga(action) {
    
    //action.keyWord
    
    //Goi API
    try {
        const {data,status} = yield call(() => userService.assignUserProject(action.userProject));
        // console.log('data', data)

       yield put ({
           type: 'GET_LIST_PROJECT_SAGA'
       })
        

    }catch(err){
        console.log(err.response.data)
    }
}

export function * theoDoiAddUserProject(){
    yield takeLatest("ADD_USER_PROJECT_API",addUserProjectSaga)
}


// Quản lý action
// eslint-disable-next-line require-yield
function * removeUserProjectSaga(action) {
    
    //action.keyWord
    
    //Goi API
    try {
        const {data,status} = yield call(() => userService.deleteUserFromProject(action.userProject));
        // console.log('data', data)

       yield put ({
           type: 'GET_LIST_PROJECT_SAGA'
       })
        

    }catch(err){
        console.log(err.response.data)
    }
}

export function * theoDoiRemoveUserProject(){
    yield takeLatest("REMOVE_USER_PROJECT_API",removeUserProjectSaga)
}

//Nghiep vu getUserByProjectIdSaga 11/02/2020 video 31
// eslint-disable-next-line require-yield 
function * getUserByProjectIdSaga(action) {
    const {idProject} = action;

    try {
        const {data,status} = yield call(() =>userService.getUserByProjectId(idProject));
        
        if(status === STATUS_CODE.SUCCESS){
            console.log('checkdata',data)
            yield put({
                type:GET_USER_BY_PROJECT_ID,
                arrUser:data.content
            })
        }
    
    }
    catch(err){
        console.log(err);
        console.log(err.response?.data);
        if(err.response?.data.statuscode === STATUS_CODE.NOT_FOUND){
            yield put({
                type:GET_USER_BY_PROJECT_ID,
                arrUser:[],
            })
        }
    }
}


export function * theoDoigetUserByProjectIdSaga(){
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA,getUserByProjectIdSaga)
}