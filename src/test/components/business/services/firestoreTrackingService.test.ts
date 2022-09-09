import {firestoreTrackingService} from "../../../../components/business/services/firestoreTrackingService";
import {Order} from "../../../../components/ordermanagement/functions/order";

test("clear Trackings", () => {
    firestoreTrackingService.clearTrackings()
    const trackings = firestoreTrackingService.getTrackings()
    expect(trackings.length).toBe(0)
})

test("save tracking to firebase", () => {
    const order = jest.createMockFromModule<Order>("../../../../components/ordermanagement/functions/order")
    order.isTrackingActive = true
    firestoreTrackingService.stopAndaddTrackingAndSaveToFirebase(order)

})