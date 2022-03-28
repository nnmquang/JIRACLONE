import {applyMiddleware,combineReducers,createStore} from 'redux'
import ToDoListReducer from './ToDoListReducer';
import LoadingReducer from './LoadingReducer';
import { ModalReducer } from './ModalReducer';

import reduxThunk from 'redux-thunk'


//middleware saga
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from '../sagas/rootSaga';
import { HistoryReducer } from './HistoryReducer';
import { UserLoginCyberBugsReducer } from './UserCyberBugsReducer';
import { ProjectCategoryReducer } from './ProjectCategoryReducer';
import { ProjectCyberBugsReducer } from './ProjectCyberBugsReducer';
import { drawerReducer } from './DrawerReducer';
import { ProjectReducer } from './ProjectReducer';
import { TaskTypeReducer } from './TaskTypeReducer';
import { PriorityReducer } from './PriorityReducer';
import { StatusReducer } from './StatusReducer';
import { TaskReducer } from './TaskReducer';

const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    //reducer khai bao tai day
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    drawerReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
})



const store = createStore(rootReducer,applyMiddleware(reduxThunk,middleWareSaga))

//Goi Saga
middleWareSaga.run(rootSaga);



export default store;