import { infoWindowGlobal } from "../../../../components/business/services/infoWindowService";
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
});


test("InfoWindowShouldBeUndefinedAndGetTest", () => {
    expect(infoWindowGlobal.getInfoWindow()).toBe(undefined);
})


test("SetInfoWindowAndCheckIfItsSet", () => {
    const infoWindowTest = new google.maps.InfoWindow();
    infoWindowGlobal.setInfowWindow(infoWindowTest);
    expect(infoWindowGlobal.getInfoWindow()).toEqual(infoWindowTest);
})


test("SetNewInfoWindowIfItsAlreadySet", () => {
    const infoWindowTestV2 = new google.maps.InfoWindow();
    infoWindowGlobal.setInfowWindow(infoWindowTestV2);
    expect(infoWindowGlobal.getInfoWindow()).toEqual(infoWindowTestV2);
})
