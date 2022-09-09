import {checkUniqueName} from "../../../../components/map/functions/uniqueName";
import {Field} from "../../../../components/map/functions/field";
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
});


test("uniqueName_checkUniqueName_ReturnsTrueForEmptyFieldArray", () => {
    expect(checkUniqueName("test", [])).toBe(true)
})

test("uniqueName_checkUniqueName_ReturnsTrueForNotEmptyFieldArray", () => {
    expect(checkUniqueName("test", [new Field("otherName", new google.maps.Polygon(), "id", 5, "blue", "apple", "test")])).toBe(true)
})

test("uniqueName_checkUniqueName_ReturnsFalseForArrayWithFieldWithSameName", () => {
    expect(checkUniqueName("test", [new Field("test", new google.maps.Polygon(), "id", 5, "blue", "apple", "test")])).toBe(false)
})
