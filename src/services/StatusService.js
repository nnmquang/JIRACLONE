import { baseService } from "./baseService";



export class StatusService extends baseService {    //video 31 status
 
    constructor(){
        super()
    }

    getAllStatus = () => {
        return this.get(`Status/getAll`)
    }

   
}


export const statusService = new StatusService();