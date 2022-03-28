import { message, notification } from "antd";

export const notifiFunction = (type,message,description = '') => {  //tham so thu 3 ko co de trong mac dinh = ''
    notification[type]({  //action.typeNotification = success | warning | info | error,
        message: message,
        description: description,
      });
} 