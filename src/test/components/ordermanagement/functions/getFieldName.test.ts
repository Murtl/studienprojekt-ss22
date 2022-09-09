import {getFieldName} from "../../../../components/ordermanagement/functions/getFieldName";
import {Field} from "../../../../components/map/functions/field";
import {firestoreFieldService} from "../../../../components/business/services/firestoreFieldsService";
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
});

test("getFieldName_ShouldNotBeNull", () => {
    const field = new Field("test", new google.maps.Polygon(), "id", 5, "blue", "apple", "test")
    field.id = "Z3t"
    firestoreFieldService.backupFieldList.push(field)
    expect(getFieldName("xZfsd"))
        .not.toBeNull()
})

test("getFieldName_ShouldBeEqualToTest", () => {
    const field = new Field("test", new google.maps.Polygon(), "id", 5, "blue", "apple", "test")
    field.id = "Z3t"
    firestoreFieldService.backupFieldList.push(field)
    expect(getFieldName("Z3t"))
        .toEqual("test")
})

test("getFieldName_ShouldBeEmptyString", () => {
    const field = new Field("test", new google.maps.Polygon(), "id", 5, "blue", "apple", "test")
    field.id = "Z3t"
    firestoreFieldService.backupFieldList.push(field)
    expect(getFieldName("xZfsd"))
        .toEqual("")
})



