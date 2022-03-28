import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Cyberbugs.js/Cyberbugs";
import { GET_USER_BY_PROJECT_ID } from "../constants/Cyberbugs.js/UserConstants";

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin : usLogin,
    userSearch: [],
    arrUser:[] //Array cho the select create task- video29
}

export const UserLoginCyberBugsReducer = (state = stateDefault,action) => {
    switch(action.type) {
        case USLOGIN : {
            state.userLogin = action.userLogin;
            return {...state}
        }

        case 'GET_USER_SEARCH' : {
            state.userSearch = action.listUserSearch;
            console.log('stateUser',state)
            return {...state}
        }

        case GET_USER_BY_PROJECT_ID : {
            //state.arrUser = action.arrUser;
            return {...state,arrUser:action.arrUser}
        }


        default : return {...state};
    }
}