import Axios from 'axios';
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";


export const cyberbugsService = {
    signinCyberBugs:(userLogin) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/users/signin`,
            method: 'POST',
            data: userLogin
        })
    },
    getAllProjectCategory: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
            method: 'GET',
        })
    },
    createProject: (newProject) => {
        return Axios({
            url:`${DOMAIN_CYBERBUG}/Project/createProject`,
            method: 'POST',
            data:newProject
        })
    },
    createProjectAuthorization : (newProject) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
            method: 'POST',
            data:newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    getListProject: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
            //token yeu cau tu backend chung minh user da dang nhap roi
        })
    },
    updateProject: (projectUpdate) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'PUT',
            data:projectUpdate,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}