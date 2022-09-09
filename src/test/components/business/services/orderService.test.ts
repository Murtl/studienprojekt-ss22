import {orderServiceGlobal} from "../../../../components/business/services/orderService";
import {Order} from "../../../../components/ordermanagement/functions/order";


test("orderSetEqualsGetShouldBeUndefinedAtStart", () => {
    expect(orderServiceGlobal.getOrder()).toBe(undefined)
})

test("orderSetEqualsGet", () => {
    const anOrder: Order = new Order ("id", "name", "desc", [], "today", false, null)
   orderServiceGlobal.setOrder(anOrder)
    expect(orderServiceGlobal.getOrder()).toEqual(anOrder)
})

test("orderSetNotEqualsGetByID", () => {
        const anOrder: Order = new Order ("id", "name", "desc", [], "today", false, null )
const testOrder: Order = new Order("diffid", "name", "desc", [], "today", false, null )
    orderServiceGlobal.setOrder(anOrder)
    expect(orderServiceGlobal.getOrder()).not.toEqual(testOrder)
})

test("orderSetNotEqualsGetByName", () => {
        const anOrder: Order = new Order ("id", "name", "desc", [], "today", false, null )
const testOrder: Order = new Order("id", "diffname", "desc", [], "today", false, null )
    orderServiceGlobal.setOrder(anOrder)
    expect(orderServiceGlobal.getOrder()).not.toEqual(testOrder)
})

test("orderSetNotEqualsGetByDesc", () => {
        const anOrder: Order = new Order ("id", "name", "desc", [], "today", false, null)
const testOrder: Order = new Order("id", "name", "diffdesc", [], "today", false, null)
    orderServiceGlobal.setOrder(anOrder)
    expect(orderServiceGlobal.getOrder()).not.toEqual(testOrder)
})

test("orderSetNotEqualsGetByFieldArray", () => {
        const anOrder: Order = new Order ("id", "name", "desc", [], "today", false, null )

    const testOrder: Order = new Order("id", "name", "desc", ["test"], "today", false, null)
    orderServiceGlobal.setOrder(anOrder)
    expect(orderServiceGlobal.getOrder()).not.toEqual(testOrder)
})

test("orderSetNotEqualsGetByDeadline", () => {
        const anOrder: Order = new Order ("id", "name", "desc", [], "today", false, null)
const testOrder: Order = new Order("id", "name", "desc", [], "difftoday", false, null)
    orderServiceGlobal.setOrder(anOrder)
    expect(orderServiceGlobal.getOrder()).not.toEqual(testOrder)
})

