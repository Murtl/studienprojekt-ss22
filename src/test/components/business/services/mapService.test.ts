import {mapServiceGlobal} from "../../../../components/business/services/mapService";

test("mapSetEqualsGetShouldBeUndefined", () => {
    expect(mapServiceGlobal.getMap()).toBe(undefined)
})

test("mapSetEqualsGet", () => {
    mapServiceGlobal.setMap("test")
    expect(mapServiceGlobal.getMap()).toEqual("test")
})

test("mapSetNotEqualsGet", () => {
    mapServiceGlobal.setMap("test")
    expect(mapServiceGlobal.getMap()).not.toEqual("notTest")
})

test("OrdermapSetEqualsGetShouldBeUndefined", () => {
    expect(mapServiceGlobal.getOrderMap()).toBe(undefined)
})

test("OrdermapSetEqualsGet", () => {
    mapServiceGlobal.setOrderMap("testOrder")
    expect(mapServiceGlobal.getOrderMap()).toEqual("testOrder")
})

test("OrdermapSetNotEqualsGet", () => {
    mapServiceGlobal.setOrderMap("testOrder")
    expect(mapServiceGlobal.getOrderMap()).not.toEqual("nottestOrder")
})