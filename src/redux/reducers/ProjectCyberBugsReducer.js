import { GET_ALL_PROJECT } from "../constants/Cyberbugs.js/ProjectCyberbugsConstants";





const stateDefault = {
    projectList: [
    {  
        "id": 3091,
        "projectName": "newproject999",
        "description": "<p>newproject999</p>",
        "categoryId": 2,
        "categoryName": "Dự án phần mềm",
        "alias": "newproject999",
        "deleted": false
    }
    ],
    arrProject: []  //Get allProject cho dropdown video28
}
console.log('projectlist',stateDefault)


export const ProjectCyberBugsReducer = (state = stateDefault,action) => {
    switch (action.type) {

        case 'GET_LIST_PROJECT': {
            state.projectList = action.projectList;
            return {...state};
        }

        case GET_ALL_PROJECT: {
            state.arrProject = action.arrProject;
            return {...state};
        }

        default: return {...state}
    }
}