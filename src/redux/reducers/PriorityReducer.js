import { GET_ALL_PRIORITY } from "../constants/Cyberbugs.js/PriorityConstants";

const initialState = {
    arrPriority : []
};

// eslint-disable-next-line import/no-anonymous-default-export
export const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRIORITY:
      return { ...state,arrPriority:action.arrPriority };

    default:
      return state;
  }
};
