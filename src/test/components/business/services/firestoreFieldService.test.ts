import {firestoreFieldService} from "../../../../components/business/services/firestoreFieldsService";
import {Field} from "../../../../components/map/functions/field";
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
});


test("firestoreFieldService_backupFieldList_ShouldBeEmpty" ,() => {
    expect(firestoreFieldService.backupFieldList.length)
        .toBe(0)

})

test("firestoreFieldService_backupFieldList_ShouldHaveOneFields" ,() => {
    const field = new Field("otherName", new google.maps.Polygon(), "id", 5, "blue", "apple", "test");
    firestoreFieldService.backupFieldList.push(field)
    expect(firestoreFieldService.backupFieldList.length)
        .toBe(1)

})

test("firestoreFieldService_fieldListObservable_ShouldBeEmpty" ,() => {
    expect(firestoreFieldService.fieldListObservable.get())
        .toEqual([])
})

test("Add Field" ,() => {
    const field = new Field("otherName", new google.maps.Polygon(), "id", 5, "blue", "apple", "test");
    firestoreFieldService.addNewField(field)
    expect(firestoreFieldService.backupFieldList.length)
        .toBe(2)

})

test("Delete Field" ,() => {
    firestoreFieldService.deleteField(1)
    expect(firestoreFieldService.backupFieldList.length)
        .toBe(2)

})

test("firestoreFieldService_clear_ShouldClearFieldlist", () => {
    firestoreFieldService.clearFields();
    expect(firestoreFieldService.fieldListObservable.get())
        .toEqual([]);

})

test("firestoreFieldService_getFieldsFromFirebase_shouldDoAbsolutelyNothingBecauseTheTestDoesNotHaveAUser", () => {
    firestoreFieldService.getFieldsFromFirebase();
    expect(firestoreFieldService.fieldListObservable.get())
        .toEqual([]);
})

test("firestoreFieldService_addNewField_shouldDoAbsolutelyNothingBecauseTheTestDoesNotHaveAUser", () => {
    expect(firestoreFieldService.fieldListObservable.get())
        .toEqual([]);
})
