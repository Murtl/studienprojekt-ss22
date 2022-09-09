import {Tracking} from "../../../../components/ordermanagement/functions/tracking";

test("tracking_constructor_ShouldReturnObjectWithProvidedParameters", () => {
    const coords: {
        latitude: number | undefined,
        longitude: number | undefined,
        timestamp: number | undefined
        fieldId: string | null
        speed: number | null
    } = { latitude: 100, longitude: 100, timestamp: 1400, fieldId: null, speed: 0}
    const testingTracking = new Tracking("Z343", "test", [coords])
    expect(testingTracking.id === "Z343"
        && testingTracking.orderid === "test"
    && testingTracking.coords[0] === coords).toBe(true)
})

test("tracking_formatOrderToFirestoreStandard_ShouldReturnFormattedObjectWithObject Parameters", () => {
    const coords: {
        latitude: number | undefined,
        longitude: number | undefined,
        timestamp: number | undefined
        fieldId: string | null
        speed: number | null
    } = { latitude: 100, longitude: 100, timestamp: 1400, fieldId: null, speed: 0}
    const testingTracking = new Tracking("Z343", "test", [coords])
    const testFormat = {
        orderid: "test",
        coords: [{latitude: 100, longitude: 100, timestamp: 1400, fieldId: null, speed: 0}]
    }
    expect(testingTracking.formatTrackingToFirestoreStandard()).toEqual(testFormat)
})