import { call, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/Cyberbugs.js/Cyberbugs";


// eslint-disable-next-line require-yield
function* getAllProjectCategorySaga (action) {
    console.log('actionSaga',action);
    //Goi api lay du lieu ve
    try {
    const {data,status} = yield call(()=> cyberbugsService.getAllProjectCategory())

    //Goi api thanh cong thi dispatch len reducer thong qua put
    if(status === STATUS_CODE.SUCCESS) {
        yield put({
            type: GET_ALL_PROJECT_CATEGORY,
            data: data.content  //lay content dua theo api
        });
    }
    console.log('data',data)

    }catch(err) {
        console.log(err.response.data)
    }
}





export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA,getAllProjectCategorySaga)
}