import { Order } from "../../ordermanagement/functions/order";

class orderService {

    static order: Order;

    setOrder(order: Order){
        orderService.order = order;
    }
   
    getOrder(){
        return orderService.order;
    }

}

export const orderServiceGlobal = new orderService()
