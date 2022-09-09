import {firestoreOrderService} from "../../../../components/business/services/firestoreOrderService";
import {Order} from "../../../../components/ordermanagement/functions/order";

test("firestoreOrderService Observerablelist should be empty" ,() => {
    expect(firestoreOrderService.orderListObservable).toEqual({"listeners": [], "value": []})
})

test("firestoreOrderServer Observerablelist should be filled with the order and be deleted after", () => {
    const order = new Order('1', 'eins', 'uno', [], 'heut', false, [])
    firestoreOrderService.addNewOrder(order)
    expect(firestoreOrderService.orderListObservable.get().pop()).toEqual(order)
    expect(firestoreOrderService.orderListObservable.get()).toEqual([])
})

test('clear all of the appended orders', () => {
     const order = new Order('1', 'eins', 'uno', [], 'heut', false, [])
    firestoreOrderService.addNewOrder(order)
    const order2 = new Order('2', 'eins', 'uno', [], 'heut', false, [])
    firestoreOrderService.addNewOrder(order2)
    firestoreOrderService.clearOrders()
    expect(firestoreOrderService.orderListObservable.get()).toEqual([])
})



