import { Field } from "../../../../components/map/functions/field";
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
});


test('field constructor', async () => {

    const field = new Field("name", new google.maps.Polygon(), "id", 5, "blue", "apple", "test")
    expect(field.name === "notname"
        && field.form === undefined
        && field.id === "id"
        && field.hectars === 5
        && field.color === "red"
        && field.typeOfUse === "apple").toBeFalsy()
})

test('formatToFirestorestandard creates expected format', () => {
    const field = new Field("feld", new google.maps.Polygon(),  "id", 5, "blue", "apple", "test")
    expect(field.formatFieldToFirestoreStandard())
        .toEqual({ name: "feld", cornerpoints: undefined, hectars: 5, color: "blue", typeOfUse: "apple" })
})
