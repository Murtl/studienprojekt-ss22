import {Order} from "../../../../components/ordermanagement/functions/order";

test("order_constructor_ShouldReturnObjectWithProvidedParameters", () => {
    const fields = ["1","2"]
    const testingOrder = new Order("Z343", "test", "testen", fields, "morgen", false, null)
    expect(testingOrder.id === "Z343"
    && testingOrder.name === "test"
    && testingOrder.orderDesc === "testen"
    && testingOrder.fields === fields
    && testingOrder.deadline === "morgen"
    && !testingOrder.isTrackingActive).toBe(true)
})

test("order_formatOrderToFirestoreStandard_ShouldReturnFormattedObjectWithObject Parameters", () => {
    const fields = ["1","2"]
    const testingOrder = new Order("Z343", "test", "testen", fields, "morgen", false, null)
    const testFormat = {
        name: "test",
        orderDesc: "testen",
        fields: fields,
        deadline: "morgen",
        isTrackingActive: false,
        stats :  [
            {
                "field" : null,
                "id": null,
                "distance" : 0,
                "time" : 0
            }
        ]
    }
    expect(testingOrder.formatOrderToFirestoreStandard()).toEqual(testFormat)
})


test("FormatStatsToDisplayShouldBeRight", () => {
    const fields = ["1","2"];
    const stats = [{ field: null, id: null, distance: 60000, time: 60000 }];
    const testOrder = new Order("Z555", "test", "testen", fields,"morgen", false, stats);
    const statsFormated = testOrder.getFormatedStats();
    expect(statsFormated[0].distance).toEqual(60000000);
    expect(statsFormated[0].time).toEqual(1);
})


test("UpdateStatsShouldUpdateStats", () => {
    const fields = ["1","2"];
    const stats = [{ field: null, id: null, distance: 60000, time: 60000 }];
    const testOrder = new Order("Z555", "test", "testen", fields,"morgen", false, stats);
    testOrder.updateStats(50,50,500,null,100,100,1000,null);
    expect(testOrder.stats[0].distance).toEqual(65748.70377539218);
    expect(testOrder.stats[0].time).toEqual(60500);
})
