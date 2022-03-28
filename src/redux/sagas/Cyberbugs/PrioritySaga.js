import { call, put, takeLatest } from "redux-saga/effects";
import { priorityService } from "../../../services/PriorityService";
import { taskTypeService } from "../../../services/TaskTypeService";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../constants/Cyberbugs.js/PriorityConstants";

function * getAllPrioritySaga(action) {

    try {
        const {data,status} = yield call(()=>priorityService.getAllPriority())
    
        yield put({
            type:GET_ALL_PRIORITY,
            arrPriority:data.content
        })
    
    
    
    }catch(err) {
        console.log(err)
    }

}

export function * theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA,getAllPrioritySaga)
}