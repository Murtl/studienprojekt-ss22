import {getColorFromSpeed} from "../../../../components/ordermanagement/functions/getColorFromSpeed";

test("getColorFromSpeed_ShouldReturnGreenForZeroSpeed", () => {
    expect(getColorFromSpeed(0))
        .toEqual("#00ff00")
})

test("getColorFromSpeed_ShouldReturnRedFor50", () => {
    expect(getColorFromSpeed(50))
        .toEqual("#ff0000")
})

test("getColorFromSpeed_ShouldReturnRedForOver50", () => {
    expect(getColorFromSpeed(65))
        .toEqual("#ff0000")
})

test("getColorFromSpeed_ShouldReturnRedForUnderMin", () => {
    expect(getColorFromSpeed(1, 2, 3))
        .toEqual("#00ff00")
})