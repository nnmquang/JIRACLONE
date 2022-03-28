import { GET_ALL_TASK_TYPE } from "../constants/Cyberbugs.js/TaskTypeConstants";

const initialState = {
    arrTaskType: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export const TaskTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK_TYPE:
      return { ...state, arrTaskType:action.arrTaskType };

    default:
      return state;
  }
};
