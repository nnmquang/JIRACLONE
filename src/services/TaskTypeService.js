import { baseService } from "./baseService";



export class TaskTypeService extends baseService {
 
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super()
    }

    getAllTaskType = () => {
        return this.get(`TaskType/getAll`);
    }
  
   
}


export const taskTypeService = new TaskTypeService();