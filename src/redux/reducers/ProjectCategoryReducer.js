import { GET_ALL_PROJECT_CATEGORY } from "../constants/Cyberbugs.js/Cyberbugs";



const stateDefault = {
    arrProjectCategory : []    //nhin vao API de to chuc du lieu la mang
}


export const ProjectCategoryReducer = (state = stateDefault,action) => {
    switch (action.type) {

        case GET_ALL_PROJECT_CATEGORY: {
            state.arrProjectCategory = action.data;
            return {...state}
        }

        default: return{...state}
    }
}