import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from "../constants/Cyberbugs.js/TaskContant"

const initialState = {
    taskDetailModal:{
      "taskName": "task10",
      "priorityTask":{
        "priorityId":1,
        "priority":"High"
      },
      "statusId":"3",
      "assigness":[
        {
        "Id":1212,
        "avatar":"https://ui-avatars.com/api/?name=trungnguyen",
        "name": "trung",
        "alias": "trung"
        }
      ],
      "lstComment": [
        {
          "avatar":"https://ui-avatars.com/api/?name=trungnguyen",
          "commentContent":"<p>hihihihihi</p>",
          "idUser":6,
          "name": "trung",
        }
      ],
      "originalEstimate":10,
      "timeTrackingSpent":10,
      "timeTrackingRemaining":10,
      "description":"<p>task1</p>",
      "typeId":1,
      "priorityId":1,
      "projectId":109,
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_TASK_DETAIL:
    return { ...state,taskDetailModal:action.taskDetailModal}

  case CHANGE_TASK_MODAL:
    const {name,value} = action;
    return {...state,taskDetailModal:{...state.taskDetailModal,[name]:value}} 
    
  case CHANGE_ASSIGNESS:
    state.taskDetailModal.assigness = [...state.taskDetailModal.assigness,action.userSelected];
    return {...state} 
    
  case REMOVE_USER_ASSIGN:
    state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
    return {...state} 
  default:
    return state
  }
}
